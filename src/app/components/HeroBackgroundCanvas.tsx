"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas hero:
 * - Starfield background
 * - 4 separate particle "galaxy balls" at different depths
 * - Mouse parallax
 * - DPR scaling + resize-safe
 * - Draws in <10ms on typical laptops
 */
export default function HeroBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    const center = { x: 0, y: 0 };

    // pointer/parallax
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    // Resize
    function resize() {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      center.x = w / 2;
      center.y = h / 2;
    }
    resize();
    window.addEventListener("resize", resize);

    // Stars
    const STAR_COUNT = 1800;
    const stars: { x: number; y: number; z: number; tw: number; s: number }[] =
      new Array(STAR_COUNT).fill(0).map(() => ({
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * 0.8 + 0.2, // depth 0.2–1.0
        tw: Math.random() * Math.PI * 2,
        s: Math.random() * 0.7 + 0.3, // size
      }));

    // Galaxy balls (clusters)
    type Cluster = {
      cx: number;
      cy: number;
      depth: number; // parallax strength
      radius: number;
      speed: number;
      color: string;
      alpha: number;
      pts: { r: number; a: number; s: number }[];
      rot: number;
    };

    const makeCluster = (
      cx: number,
      cy: number,
      depth: number,
      radius: number,
      count: number,
      color: string,
      alpha: number,
      speed: number
    ): Cluster => {
      const pts = new Array(count).fill(0).map(() => ({
        r: radius * (0.4 + Math.random() * 0.6),
        a: Math.random() * Math.PI * 2,
        s: Math.random() * 1.2 + 0.6,
      }));
      return { cx, cy, depth, radius, speed, color, alpha, pts, rot: 0 };
    };

    // spread them wide so you clearly see multiple balls
    let scale = Math.min(w, h);
    const clusters: Cluster[] = [
      makeCluster(0, 0,  1.0, 0.23 * scale, 1700, "#ffffff", 0.95, 0.12),      // center
      makeCluster(-0.34 * w,  0.18 * h, 0.6, 0.14 * scale, 900,  "#c7d2fe", 0.45, 0.07), // back-left
      makeCluster( 0.36 * w, -0.20 * h, 0.6, 0.16 * scale, 950,  "#93c5fd", 0.35, 0.06), // back-right
      makeCluster( 0.18 * w,  0.30 * h, 0.5, 0.12 * scale, 700,  "#a7f3d0", 0.30, 0.05), // high-mid
    ];

    function onMove(e: PointerEvent | MouseEvent | TouchEvent) {
      let x = 0, y = 0;
      if ("touches" in e && e.touches.length) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if ("clientX" in e) {
        x = e.clientX;
        y = e.clientY;
      }
      target.x = (x / w - 0.5) * 2; // -1..1
      target.y = (y / h - 0.5) * 2;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    let last = performance.now();

    function frame(now: number) {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      // ease pointer
      pointer.x += (target.x - pointer.x) * 0.08;
      pointer.y += (target.y - pointer.y) * 0.08;

      // clear
      ctx.fillStyle = "#0b0b0b";
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(center.x, center.y);

      // background stars
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < STAR_COUNT; i++) {
        const s = stars[i];
        const px = s.x + pointer.x * 40 * s.z;
        const py = s.y + pointer.y * 30 * s.z;
        const a = 0.3 + 0.3 * Math.sin(s.tw + now * 0.0015);
        ctx.globalAlpha = a;
        ctx.fillRect(px, py, s.s, s.s);
      }
      ctx.globalAlpha = 1;

      // clusters
      for (const c of clusters) {
        c.rot += dt * c.speed;
        ctx.fillStyle = c.color;
        ctx.globalAlpha = c.alpha;

        const ox = c.cx + pointer.x * 60 * c.depth;
        const oy = c.cy + pointer.y * 50 * c.depth;

        const cos = Math.cos(c.rot);
        const sin = Math.sin(c.rot);

        for (let i = 0; i < c.pts.length; i++) {
          const p = c.pts[i];
          const x = ox + p.r * Math.cos(p.a) * cos - p.r * Math.sin(p.a) * sin;
          const y = oy + p.r * Math.cos(p.a) * sin + p.r * Math.sin(p.a) * cos;
          ctx.fillRect(x, y, p.s, p.s);
        }
      }

      ctx.restore();

      // vignette to keep headline readable
      const g = ctx.createRadialGradient(
        center.x, center.y * 0.9, Math.min(w, h) * 0.15,
        center.x, center.y, Math.max(w, h) * 0.7
      );
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onMove as any);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
