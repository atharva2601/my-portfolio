// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { Html } from "@react-three/drei";
// import * as THREE from "three";
// import { memo, useMemo, useRef } from "react";

// type TechLogo = { name: string; src: string };

// export default function TechStack3D({ logos }: { logos: TechLogo[] }) {
//   return (
//     <Canvas
//       gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
//       camera={{ fov: 45, position: [0, 0, 17] }}
//       dpr={[1, 2]}
//       className="rounded-2xl"
//     >
//       {/* Clean lighting (no big gray blobs) */}
//       <ambientLight intensity={1.0} />
//       <pointLight position={[0, 5, 8]} intensity={1.1} color={"#aaf1ff"} />
//       <pointLight position={[0, -6, -9]} intensity={0.7} color={"#ffd7a8"} />

//       <Rig>
//         <BubbleCloud logos={logos} />
//       </Rig>
//     </Canvas>
//   );
// }

// function Rig({ children }: { children: React.ReactNode }) {
//   const g = useRef<THREE.Group>(null);
//   useFrame((_, dt) => {
//     if (!g.current) return;
//     g.current.rotation.y += dt * 0.15; // slow orbit
//   });
//   return <group ref={g}>{children}</group>;
// }

// const BubbleCloud = memo(function BubbleCloud({ logos }: { logos: TechLogo[] }) {
//   // lay out in 3 rings
//   const nodes = useMemo(() => {
//     const r = [6.4, 8.1, 9.6];
//     const y = [-1.0, 0.7, 2.0];
//     const out: { pos: [number, number, number]; i: number }[] = [];
//     const n = logos.length;
//     for (let i = 0; i < n; i++) {
//       const ring = i % 3;
//       const ang = (i / n) * Math.PI * 2 + ring * 0.5;
//       out.push({
//         pos: [Math.cos(ang) * r[ring], y[ring], Math.sin(ang) * (r[ring] * 0.45)],
//         i,
//       });
//     }
//     return out;
//   }, [logos.length]);

//   return (
//     <group>
//       {nodes.map(({ pos, i }) => (
//         <FloatingBubble key={i} position={pos} logo={logos[i]} phase={i * 0.37} />
//       ))}
//     </group>
//   );
// });

// function FloatingBubble({
//   position,
//   logo,
//   phase = 0,
// }: {
//   position: [number, number, number];
//   logo: TechLogo;
//   phase?: number;
// }) {
//   const ref = useRef<THREE.Group>(null);

//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     const t = clock.getElapsedTime() + phase;
//     ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.25;
//     ref.current.rotation.y = Math.sin(t * 0.2) * 0.15;
//   });

//   return (
//     <group ref={ref} position={position}>
//       {/* Html keeps logos as DOM <img> → no CORS texture issues */}
//       <Html transform distanceFactor={6}>
//         <div className="relative h-28 w-28 rounded-full bg-[radial-gradient(60%_60%_at_50%_35%,rgba(255,255,255,0.14),rgba(0,0,0,0.5)_70%)] ring-1 ring-white/15 shadow-[0_0_40px_rgba(94,234,212,0.12)] grid place-items-center backdrop-blur-md">
//           <img
//             src={logo.src}
//             alt={logo.name}
//             crossOrigin="anonymous"
//             loading="lazy"
//             onError={(e) => {
//               // graceful fallback: first letter badge
//               const el = e.currentTarget;
//               const parent = el.parentElement!;
//               el.style.display = "none";
//               const badge = document.createElement("div");
//               badge.textContent = logo.name?.[0] ?? "?";
//               Object.assign(badge.style, {
//                 width: "52px", height: "52px", borderRadius: "9999px",
//                 background: "linear-gradient(180deg,#0ea5e9,#0f766e)",
//                 display: "grid", placeItems: "center", color: "white",
//                 fontWeight: "700", letterSpacing: "1px",
//                 boxShadow: "0 8px 30px rgba(14,165,233,.35)",
//               } as CSSStyleDeclaration);
//               parent.appendChild(badge);
//             }}
//             className="h-12 w-12 object-contain select-none pointer-events-none"
//           />
//           <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent" />
//         </div>
//       </Html>
//     </group>
//   );
// }
