"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

// Load the lightweight canvas background (SSR off to avoid hydration warnings)
const HeroBackground = dynamic(() => import("./HeroBackgroundCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
  ),
});

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section id="home" className="relative">
      <div ref={ref} className="relative h-[120vh] md:h-[140vh]">
        <HeroBackground />

        {/* Sticky headline */}
        <div className="sticky top-0 h-svh flex items-center">
          <div className="relative mx-auto max-w-7xl px-6">
            <motion.h1
              style={{ scale, y, opacity }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
            >
              You&apos;ve arrived.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-300">
                Let me <span className="font-extrabold">Show you</span>
              </span>
              <span className="block">Who I am</span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
}
