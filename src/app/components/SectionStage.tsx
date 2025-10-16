"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Tone = "blue" | "violet" | "green" | "orange";
const glow: Record<Tone, string> = {
  blue:   "bg-[radial-gradient(60%_60%_at_50%_30%,rgba(37,99,235,.28),transparent_60%)]",
  violet: "bg-[radial-gradient(60%_60%_at_50%_30%,rgba(139,92,246,.28),transparent_60%)]",
  green:  "bg-[radial-gradient(60%_60%_at_50%_30%,rgba(16,185,129,.28),transparent_60%)]",
  orange: "bg-[radial-gradient(60%_60%_at_50%_30%,rgba(245,158,11,.28),transparent_60%)]",
};

export default function SectionStage({
  id, title, tone = "blue", children,
}: { id: string; title?: string; tone?: Tone; children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const clip = useTransform(scrollYProgress, [0, .35, 1], ["circle(0% at 50% 40%)", "circle(120% at 50% 40%)", "circle(140% at 50% 40%)"]);
  const scale = useTransform(scrollYProgress, [0, .5, 1], [.98, 1, .985]);
  const y     = useTransform(scrollYProgress, [0, 1], [24, -16]);
  const glowOpacity = useTransform(scrollYProgress, [0, .25, .9, 1], [0, .85, .35, .2]);

  return (
    <section id={id} className="relative">
      <div ref={ref} className="h-[160vh]">
        <div className="sticky top-14 z-0 h-[calc(100svh-56px)] overflow-hidden bg-white dark:bg-neutral-950">
          {/* soft spotlight */}
          <motion.div style={{ opacity: glowOpacity }} className={`pointer-events-none absolute inset-0 ${glow[tone]}`} />
          <motion.div style={{ clipPath: clip, scale, y }} className="relative z-10 h-full">
            <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 py-16">
              {title ? <h2 className="text-2xl sm:text-3xl font-bold mb-8">{title}</h2> : null}
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
