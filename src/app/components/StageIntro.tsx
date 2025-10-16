"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

type Tone = "blue" | "violet" | "green" | "orange";
const glow: Record<Tone, string> = {
  blue:   "bg-[radial-gradient(60%_60%_at_50%_30%,rgba(37,99,235,.28),transparent_60%)]",
  violet: "bg-[radial-gradient(60%_60%_at_50%_30%,rgba(139,92,246,.28),transparent_60%)]",
  green:  "bg-[radial-gradient(60%_60%_at_50%_30%,rgba(16,185,129,.28),transparent_60%)]",
  orange: "bg-[radial-gradient(60%_60%_at_50%_30%,rgba(245,158,11,.28),transparent_60%)]",
};

export default function StageIntro({
  id,
  title,
  subtitle,
  tone = "blue",
  videoSrc,
  poster,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  tone?: Tone;
  videoSrc?: string;
  poster?: string;
  children?: ReactNode; // optional bottom content (e.g., badges)
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const tint = useTransform(scrollYProgress, [0, 1], [0.55, 0.2]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const titleO = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section id={id} className="relative">
      <div ref={ref} className="h-[160vh]">
        <div className="sticky top-14 z-0 h-[calc(100svh-56px)] overflow-hidden bg-neutral-950">
          {/* Background video (or elegant fallback) */}
          <div className="absolute inset-0">
            {videoSrc ? (
              <motion.video
                style={{ scale }}
                className="h-full w-full object-cover"
                src={videoSrc}
                poster={poster}
                autoPlay
                muted
                playsInline
                loop
              />
            ) : (
              <motion.div
                style={{ scale }}
                className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_30%,#0b1220_10%,#0b0b0b_70%)]"
              />
            )}
          </div>

          {/* Glow and dark tint */}
          <div className={`absolute inset-0 ${glow[tone]}`} />
          <motion.div style={{ opacity: tint }} className="absolute inset-0 bg-black" />

          {/* Heading */}
          <div className="relative z-10 h-full grid place-items-center">
            <motion.div
              style={{ y: titleY, opacity: titleO }}
              className="text-center px-6"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">{title}</h2>
              {subtitle ? (
                <p className="mt-3 text-base md:text-lg text-neutral-300">{subtitle}</p>
              ) : null}
              {children ? <div className="mt-6">{children}</div> : null}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
