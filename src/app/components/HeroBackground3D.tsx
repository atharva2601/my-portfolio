"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState, PropsWithChildren } from "react";

/* ------------------------------ utilities --------------------------------- */
function makeSphere(count: number, radius: number, jitter = 0.3) {
  // golden-angle sphere distribution + tiny jitter for volume
  const arr = new Float32Array(count * 3);
  const phi = (i: number) => Math.acos(1 - 2 * (i / count));
  const theta = (i: number) => (Math.PI * (1 + Math.sqrt(5))) * i;
  for (let i = 0; i < count; i++) {
    const p = phi(i);
    const t = theta(i);
    const r = radius * (1 - 0.12 * Math.random());
    let x = Math.sin(p) * Math.cos(t) * r;
    let y = Math.sin(p) * Math.sin(t) * r;
    let z = Math.cos(p) * r;
    x += (Math.random() - 0.5) * jitter;
    y += (Math.random() - 0.5) * jitter;
    z += (Math.random() - 0.5) * jitter;
    arr[i * 3 + 0] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  }
  return arr;
}

/* --------------------------- background starfield ------------------------- */
function StarField({ count = 1600, spread = 80 }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3 + 0] = (Math.random() - 0.5) * spread;
      a[i * 3 + 1] = (Math.random() - 0.5) * spread;
      a[i * 3 + 2] = -Math.random() * spread; // push back
    }
    return a;
  }, [count, spread]);
  useFrame((_s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.z += dt * 0.02;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.01} sizeAttenuation depthWrite={false} opacity={0.55} />
    </Points>
  );
}

/* ------------------------------ galaxy ball -------------------------------- */
function ParticleBall({
  radius,
  count,
  color,
  opacity,
  speed,
  position,
}: {
  radius: number;
  count: number;
  color: string;
  opacity: number;
  speed: number;
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => makeSphere(count, radius, 0.35), [count, radius]);

  useFrame((_s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * speed;
    ref.current.rotation.x += dt * speed * 0.25;
  });

  return (
    <group position={position}>
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial transparent color={color} size={0.015} sizeAttenuation depthWrite={false} opacity={opacity} />
      </Points>
    </group>
  );
}

/* ------------------------------ parallax rig -------------------------------- */
function ParallaxRig({ children }: PropsWithChildren) {
  const g = useRef<THREE.Group>(null!);
  useFrame(({ pointer }, dt) => {
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, pointer.x * 0.25, 0.08);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -pointer.y * 0.18, 0.08);
  });
  return <group ref={g}>{children}</group>;
}

/* ---------------------------------- root ----------------------------------- */
export default function HeroBackground3D() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [ready, setReady] = useState(false);

  // clearly separated balls (spread so they’re visible through the mask)
  const balls = isMobile
    ? ([
        { r: 2.6, n: 2600, col: "#ffffff", op: 0.95, sp: 0.12, pos: [0, 0, 0] },
        { r: 1.4, n: 1100, col: "#c7d2fe", op: 0.45, sp: 0.07, pos: [-3.8, 0.8, -7] },
        { r: 1.6, n: 1200, col: "#93c5fd", op: 0.35, sp: 0.06, pos: [3.6, -1.2, -9] },
      ] as const)
    : ([
        { r: 3.3, n: 4200, col: "#ffffff", op: 0.95, sp: 0.12, pos: [0, 0, 0] },         // center
        { r: 2.2, n: 1800, col: "#c7d2fe", op: 0.40, sp: 0.07, pos: [-6.5, 1.6, -10] },   // back-left
        { r: 2.4, n: 1900, col: "#93c5fd", op: 0.32, sp: 0.06, pos: [7.2, -1.8, -12] },   // back-right
        { r: 1.7, n: 1500, col: "#a7f3d0", op: 0.28, sp: 0.05, pos: [2.2, 3.6, -14] },    // high mid
        { r: 1.6, n: 1400, col: "#fde68a", op: 0.22, sp: 0.04, pos: [-2.8, -3.2, -16] },  // low back
      ] as const);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        // lighter defaults for instant paint
        flat
        linear
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 10], fov: 55 }}
        onCreated={() => setReady(true)}
      >
        <color attach="background" args={["#0b0b0b"]} />
        <fog attach="fog" args={["#0b0b0b", 12, 28]} />

        {/* Adaptive DPR drops resolution on weak GPUs to keep FPS */}
        <AdaptiveDpr pixelated />

        {/* background stars */}
        <StarField count={isMobile ? 1600 : 2800} spread={90} />

        {/* galaxy balls with mouse parallax */}
        <ParallaxRig>
          {balls.map((b, i) => (
            <ParticleBall
              key={i}
              radius={b.r}
              count={b.n}
              color={b.col}
              opacity={b.op}
              speed={b.sp}
              position={b.pos as [number, number, number]}
            />
          ))}
        </ParallaxRig>
      </Canvas>

      {/* wider mask so off-center balls remain visible */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: ready ? 1 : 0, // fade in when WebGL is ready
          WebkitMaskImage:
            "radial-gradient(85% 85% at 50% 45%, white 25%, transparent 95%)",
          maskImage:
            "radial-gradient(85% 85% at 50% 45%, white 25%, transparent 95%)",
        }}
      />
    </div>
  );
}
