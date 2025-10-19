"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import StageIntro from "./StageIntro";

/* ────────────────────────────────────────────────────────────
   Data
────────────────────────────────────────────────────────────── */

type Exp = {
  company: string;
  role: string;
  time: string;
  logo?: string;
  video?: string;
  poster?: string;
  bullets: string[];
};

const EXPERIENCES: Exp[] = [
  {
    company: "Aarvicom",
    role: "Full-Stack",
    time: "2024 — Present",
    logo: "/logos/aarvicom.jpeg",
    video: "/videos/Aarvicom.mp4",
    poster: "/videos/Aarvicom.mp4",
    bullets: [
      "FastAPI microservices on AWS (Lambda/EC2)",
      "RabbitMQ, Twilio; HIPAA-compliant pipelines",
      "Improved adherence notifications latency 32%",
    ],
  },
  {
    company: "SoftVan",
    role: "Software Engineer",
    time: "2023 — 2024",
    logo: "/logos/softVan.png",
    video: "/videos/Softvan.mp4",
    poster: "/videos/SoftVan.mp4",
    bullets: [
      "Automated invoice reconciliation (Django + Airflow)",
      "SAP PI, Oracle Financials integration",
      "Reduced manual effort by 40%",
    ],
  },
  {
    company: "Version Labs",
    role: "Software Engineer Intern",
    time: "2025",
    logo: "/logos/version.png",
    video: "/videos/version.mp4",
    poster: "/videos/version.mp4",
    bullets: [
      "Anti-cheat screenshot platform (Electron/Next.js)",
      "Prisma/PostgreSQL, S3 snapshot ingestion",
      "Real-time summarization & hiring tools",
    ],
  },
];

/* ────────────────────────────────────────────────────────────
   Layout / math helpers
────────────────────────────────────────────────────────────── */

const NAV_PX = 96; // <-- if your navbar is a different height, change this
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/* ────────────────────────────────────────────────────────────
   Lightweight Canvas Backgrounds (fast, full-bleed)
────────────────────────────────────────────────────────────── */

function useResizeCanvas(ref: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const dpr =
        typeof window !== "undefined" ? Math.min(1.5, window.devicePixelRatio || 1) : 1;
      c.width = Math.floor(c.clientWidth * dpr);
      c.height = Math.floor(c.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(c);
    return () => ro.disconnect();
  }, [ref]);
}

/* Bubbles (bg for slide 0) */
function BgBubbles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useResizeCanvas(ref);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const W = () => c.clientWidth;
    const H = () => c.clientHeight;
    const count = Math.max(40, Math.floor((W() * H()) / 22000));

    const parts = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: H() + Math.random() * H(),
      r: 4 + Math.random() * 10,
      s: 0.3 + Math.random() * 0.8,
      hue: 180 + Math.random() * 100,
    }));

    let id = 0;
    const step = () => {
      ctx.clearRect(0, 0, W(), H());
      for (const p of parts) {
        p.y -= p.s;
        if (p.y + p.r < 0) {
          p.y = H() + p.r;
          p.x = Math.random() * W();
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue},70%,60%,0.25)`;
        ctx.strokeStyle = `hsla(${p.hue},70%,70%,0.35)`;
        ctx.lineWidth = 1.1;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      id = requestAnimationFrame(step);
    };

    if (!reduced) id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* Strings / network (bg for slide 1) */
function BgStrings() {
  const ref = useRef<HTMLCanvasElement>(null);
  useResizeCanvas(ref);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const W = () => c.clientWidth;
    const H = () => c.clientHeight;
    const count = Math.max(70, Math.floor((W() * H()) / 26000));

    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let id = 0;
    const step = () => {
      ctx.clearRect(0, 0, W(), H());

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W()) a.vx *= -1;
        if (a.y < 0 || a.y > H()) a.vy *= -1;

        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140) {
            const alpha = 1 - d2 / (140 * 140);
            ctx.strokeStyle = `rgba(90,200,255,${alpha * 0.18})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        ctx.fillStyle = "rgba(150,220,255,0.35)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      id = requestAnimationFrame(step);
    };

    if (!reduced) id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* Starfield / sparkles (bg for slide 2) */
function BgStars() {
  const ref = useRef<HTMLCanvasElement>(null);
  useResizeCanvas(ref);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const W = () => c.clientWidth;
    const H = () => c.clientHeight;
    const count = Math.max(120, Math.floor((W() * H()) / 18000));

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      s: Math.random() * 1.2 + 0.3,
      tw: Math.random() * 2 * Math.PI,
    }));

    let id = 0;
    const step = () => {
      ctx.clearRect(0, 0, W(), H());
      for (const st of stars) {
        st.tw += 0.03;
        const a = 0.35 + 0.35 * Math.sin(st.tw);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillRect(st.x, st.y, st.s, st.s);
      }
      id = requestAnimationFrame(step);
    };

    if (!reduced) id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* ────────────────────────────────────────────────────────────
   Variants
────────────────────────────────────────────────────────────── */

const slideVariants = {
  initial: { opacity: 0, y: 12, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.995 },
};

const childVariants = {
  leftIn: { opacity: 0, x: -48, scale: 0.98, filter: "blur(2px)" },
  rightIn: { opacity: 0, x: 48, scale: 0.98, filter: "blur(2px)" },
  center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
};

/* ────────────────────────────────────────────────────────────
   Component
────────────────────────────────────────────────────────────── */

export default function ExperienceReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = EXPERIENCES.length;

  /**
   * ✅ KEY FIX:
   * Make the scrollable container tall enough so the sticky viewport
   * can display the LAST slide fully before unpinning.
   *
   * Height = slides * (viewport - navbar) + 1 * viewport
   * (the extra viewport is the "release" space).
   */
  const containerStyle = useMemo(
    () => ({
      height: `calc(${total} * (100vh - ${NAV_PX}px) + 100vh)`,
    }),
    [total]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"], // progress maps across the whole tall container
  });

  const [active, setActive] = useState(0);

  /**
   * ✅ KEY FIX:
   * Use floor-based step mapping with clamping and a tiny epsilon,
   * which prevents rounding skips when progress changes in big jumps.
   */
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = clamp(Math.floor(p * total + 1e-6), 0, total - 1);
    if (idx !== active) setActive(idx);
  });

  const exp = EXPERIENCES[active];
  const isEven = active % 2 === 0;

  const tSlide = { duration: 0.35, ease: "easeOut" };
  const tChild = { type: "spring", stiffness: 320, damping: 28, mass: 0.6 };

  return (
    <div id="experiences">
      <StageIntro
        title="Experiences"
        subtitle="A few highlights from recent roles"
        tone="blue"
        videoSrc="/videos/experience-reel.mp4"
        poster="/videos/experience-reel.mp4"
      />

      <div className="h-12 md:h-16" />

      <section
        ref={sectionRef}
        className="relative overflow-x-clip bg-black dark:bg-neutral-950"
        style={containerStyle}
      >
        {/* Sticky viewport sized to the visible area under the navbar */}
        <div
          className="sticky"
          style={{
            top: NAV_PX,
            height: `calc(100vh - ${NAV_PX}px)`,
          }}
        >
          {/* Full-bleed animated backgrounds */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <AnimatePresence mode="wait">
              {active === 0 && (
                <motion.div
                  key="bg-0"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <BgBubbles />
                </motion.div>
              )}
              {active === 1 && (
                <motion.div
                  key="bg-1"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <BgStrings />
                </motion.div>
              )}
              {active === 2 && (
                <motion.div
                  key="bg-2"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <BgStars />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Foreground slide */}
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`slide-${active}`}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={tSlide}
                className="grid h-full w-full grid-cols-1 gap-8 lg:grid-cols-12"
              >
                {/* Media */}
                <motion.div
                  variants={childVariants}
                  initial={isEven ? "leftIn" : "rightIn"}
                  animate="center"
                  transition={tChild}
                  className={`relative order-1 h-[40vh] overflow-hidden rounded-3xl border border-black/10 bg-neutral-900 shadow-sm dark:border-white/10 lg:h-full ${
                    isEven ? "lg:col-span-6" : "lg:col-span-6 lg:order-2"
                  }`}
                >
                  {exp.video ? (
                    <video
                      key={exp.video}
                      className="h-full w-full object-cover"
                      src={exp.video}
                      poster={exp.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <div className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_30%,#0b1220_10%,#0b0b0b_70%)]" />
                  )}
                </motion.div>

                {/* Text card */}
                <motion.article
                  variants={childVariants}
                  initial={isEven ? "rightIn" : "leftIn"}
                  animate="center"
                  transition={tChild}
                  className={`order-2 flex items-center ${
                    isEven ? "lg:col-span-6" : "lg:col-span-6 lg:order-1"
                  }`}
                >
                  <div className="w-full rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/60">
                    <div className="mb-3 flex items-center gap-3">
                      {exp.logo && (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10">
                          <Image src={exp.logo} alt="" fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold leading-tight">
                          {exp.role} • {exp.company}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {exp.time}
                        </p>
                      </div>
                    </div>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* breathing room before Projects */}
      <div className="h-24 md:h-32 lg:h-40" />
    </div>
  );
}
