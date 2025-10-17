"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleScale = useTransform(scrollYProgress, [0, 1], [1.0, 0.8]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.7, 0.2, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <section id="home" ref={ref} className="relative">
      <div className="h-[140vh]">
        <div className="sticky top-0 h-svh flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
          <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_30%,#000_10%,transparent_60%)] bg-[radial-gradient(closest-side,_rgba(59,130,246,0.25),transparent)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-8">
            <motion.h1 style={{ scale: titleScale, y: titleY }} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-center lg:text-left">
              You've arrived.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-black to-neutral-600 dark:from-white dark:to-neutral-400">Let me Show you Who I am</span>
            </motion.h1>
            <motion.div style={{ y: phoneY, opacity: phoneOpacity }} className="relative aspect-[9/16] w-64 md:w-80 lg:w-96 mx-auto lg:mx-0 rounded-[2.2rem] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden bg-white/90 dark:bg-neutral-900/80">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,102,241,0.15),transparent_35%),linear-gradient(45deg,rgba(16,185,129,0.15),transparent_40%)]" />
              <div className="absolute top-0 inset-x-0 h-10 bg-black/90 dark:bg-white/10" />
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">Replace with product image / video</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
