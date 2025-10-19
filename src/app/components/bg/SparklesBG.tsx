"use client";

import { useEffect, useRef } from "react";

export default function SparklesBG() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0, t = 0, running = true;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const COUNT = prefersReduced ? 150 : 400;

    type Star = { x: number; y: number; z: number; tw: number };
    let stars: Star[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      stars = Array.from({ length: COUNT }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.3 + Math.random() * 0.7,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const step = () => {
      if (!running) return;
      t += 0.02;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const size = s.z * 1.8;
        const glow = 0.35 + Math.sin(t + s.tw) * 0.35;
        ctx.fillStyle = `hsla(${200 + s.z * 80}, 90%, ${70 + glow * 20}%, ${0.6 + glow * 0.4})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    resize();
    init();
    step();
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => { running = false; cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden />;
}
