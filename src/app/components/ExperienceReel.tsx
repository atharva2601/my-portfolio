"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import StageIntro from "./StageIntro";

type Exp = {
  company: string;
  role: string;
  time: string;
  logo?: string;
  video?: string; // clip shown in the media panel
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

/* ---------- slideshow variants (direction-aware) ---------- */
const slideVariants = {
  initial: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60, // coming from right if scrolling down
    scale: 0.98,
    filter: "blur(2px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60, // leave to the left if scrolling down
    scale: 0.98,
    filter: "blur(3px)",
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

export default function ExperienceReel() {
  const topGap = "mt-20 md:mt-28 lg:mt-32";

  const sectionRef = useRef<HTMLDivElement>(null);
  const total = EXPERIENCES.length;
  const containerStyle = useMemo(() => ({ height: `${total * 100}vh` }), [total]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  // Pick an index per "step". Switch a bit after entering each step to avoid jitter.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const step = 1 / total;
    const idx = Math.min(total - 1, Math.max(0, Math.floor((p + step * 0.25) / step))); // 25% bias
    if (idx !== active) {
      setPrev(active);
      setActive(idx);
    }
  });

  const dir = active > prev ? 1 : -1; // 1 = scrolling down, -1 = up
  const exp = EXPERIENCES[active];
  const mediaOnLeft = active % 2 === 0;

  return (
    <div id="experiences" className={topGap}>
      {/* Intro reel with video */}
      <StageIntro
        title="Experiences"
        subtitle="A few highlights from recent roles"
        tone="blue"
        videoSrc="/videos/experience-reel.mp4"
        poster="/videos/experience-reel.mp4"
      />

      {/* Pinned slideshow section */}
      <section ref={sectionRef} className="relative bg-white dark:bg-neutral-950" style={containerStyle}>
        <div className="sticky top-24 h-[calc(100vh-6rem)]">
          <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              {/* One slide at a time */}
              <motion.div
                key={active}
                custom={dir}
                variants={slideVariants}
                initial="initial"
                animate="center"
                exit="exit"
                className="grid h-full w-full grid-cols-1 gap-8 lg:grid-cols-12"
              >
                {/* Media panel */}
                <div
                  className={`relative overflow-hidden rounded-3xl border border-black/10 bg-neutral-900 shadow-sm dark:border-white/10
                  ${mediaOnLeft ? "lg:col-span-6 order-1" : "lg:col-span-6 lg:order-2 order-1"}
                  h-[38vh] lg:h-full`}
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
                </div>

                {/* Text card */}
                <div className={`flex items-center ${mediaOnLeft ? "lg:col-span-6 order-2" : "lg:col-span-6 lg:order-1 order-2"}`}>
                  <div className="w-full rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/60">
                    <div className="mb-3 flex items-center gap-3">
                      {exp.logo && (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10">
                          <Image src={exp.logo} alt="" fill sizes="40px" className="object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold leading-tight">
                          {exp.role} • {exp.company}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{exp.time}</p>
                      </div>
                    </div>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Gap before Projects */}
      <div className="h-24 md:h-32 lg:h-40" />
    </div>
  );
}