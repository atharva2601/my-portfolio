"use client";

import { useEffect, useRef } from "react";

export default function BubblesBG() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let w = 0, h = 0, raf = 0, running = true;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const COUNT = prefersReduced ? 24 : 72;

    type Bubble = { x: number; y: number; r: number; vy: number; vx: number; hue: number };
    let bubbles: Bubble[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      bubbles = Array.from({ length: COUNT }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 16 + Math.random() * 40,
        vy: -0.15 - Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        hue: 180 + Math.random() * 160,
      }));
    };

    const drawBubble = (b: Bubble) => {
      const grad = ctx.createRadialGradient(b.x - b.r * 0.4, b.y - b.r * 0.4, b.r * 0.2, b.x, b.y, b.r);
      grad.addColorStop(0, `hsla(${b.hue}, 70%, 62%, 0.9)`);
      grad.addColorStop(1, `hsla(${b.hue}, 60%, 20%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const b of bubbles) {
        drawBubble(b);
        b.y += b.vy;
        b.x += b.vx + Math.sin((b.y + b.x) * 0.002) * 0.15;
        if (b.y + b.r < 0) { b.y = h + b.r; b.x = Math.random() * w; }
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(step);
    };

    resize();
    init();
    step();
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => { running = false; cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden
    />
  );
}
