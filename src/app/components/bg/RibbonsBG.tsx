"use client";

import { useEffect, useRef } from "react";

export default function RibbonsBG() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let w = 0, h = 0, t = 0, raf = 0, running = true;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const RIBBONS = prefersReduced ? 3 : 5;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const step = () => {
      if (!running) return;
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      for (let r = 0; r < RIBBONS; r++) {
        const phase = t + r * 0.8;
        const hue = (280 + r * 40) % 360;
        ctx.lineWidth = 2 + r * 0.8;
        ctx.strokeStyle = `hsla(${hue}, 85%, 65%, 0.75)`;
        ctx.beginPath();
        const points = 24;
        for (let i = 0; i <= points; i++) {
          const p = i / points;
          const x = p * w;
          // layered sin/cos for "string" motion
          const y =
            h * 0.5 +
            Math.sin(phase + p * 6.0) * 50 +
            Math.cos(phase * 0.8 + p * 10.0) * 30 +
            Math.sin(phase * 1.8 + p * 3.0) * 20;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    step();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => { running = false; cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden />;
}
