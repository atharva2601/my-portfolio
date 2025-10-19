"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import StageIntro from "./StageIntro";
import ProjectModal, { type Project } from "./ProjectModal";

const BASE: Project[] = [
  { name:"Landslide Prediction", year:"2025", tags:["FastAPI","RabbitMQ","AWS"], image:"/projects/landslide.png", description:"HIPAA-compliant adherence system." },
  { name:"BookMyTicket",        year:"2025", tags:["Electron","Next.js","Prisma"], image:"/projects/BookMyticket.png", description:"Screenshot ingest + AI summary." },
  { name:"E-voting Database",   year:"2024", tags:["Django","Airflow","SAP"],     image:"/projects/evoting.png", description:"Automated 3-way match & payments." },
  { name:"Sentiment Analysis",  year:"2025", tags:["CrewAI","LLM","MCP"],        image:"/projects/emotion.png", description:"Multi-agent resume tailoring." },
  { name:"Serverless Architecture", year:"2025", tags:["K-12","JSON","LLM"],     image:"/projects/serverless.png", description:"K-12 project builder." },
];

const SPEED = 230; // px/sec — bump to 360–400 if you want it even faster

export default function ProjectsShowcase() {
  // render the base row twice so we can wrap the marquee seamlessly
  const row = useMemo(() => [...BASE], []);
  const doubled = useMemo(() => [...row, ...row], [row]);

  const [active, setActive] = useState<Project | null>(null);
  const [paused, setPaused] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // offset we apply as translate3d(-offsetPx, 0, 0)
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const [measured, setMeasured] = useState(false);

  // (1) Measure the width of ONE row (half of doubled track)
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      // total width of doubled track; half of that is one row
      const half = el.scrollWidth / 2;
      halfWidthRef.current = half;
      if (half > 0) setMeasured(true);
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  // (2) Marquee RAF loop using translate3d — smooth on GPU
  useEffect(() => {
    if (!measured) return;

    const step = (now: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = now;
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const half = halfWidthRef.current;
      if (half > 0 && !paused && !active) {
        offsetRef.current += SPEED * dt;
        if (offsetRef.current >= half) {
          // wrap seamlessly
          offsetRef.current -= half;
        }
        // apply transform (GPU)
        const el = rowRef.current;
        if (el) {
          el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [measured, paused, active]);

  // Card component
  const Card = (p: Project, i: number) => (
    <motion.button
      key={`${p.name}-${i}`}
      whileHover={{ scale: 1.02 }}
      onClick={() => setActive(p)}
      className="group relative shrink-0 w-72 sm:w-80 md:w-96 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 text-left hover:shadow-lg transition-shadow"
    >
      <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
        {p.image ? (
          <Image
            src={p.image}
            alt=""
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform"
            sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
            priority={i < 3} // first few render immediately
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800" />
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-neutral-500 dark:text-neutral-400">{p.year}</div>
        <div className="text-sm font-semibold">{p.name}</div>
        <div className="mt-1 flex flex-wrap gap-1">
          {p.tags.map((t) => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );

  return (
    <div>
      <StageIntro
        id="projects"
        title="Projects"
        subtitle="Selected work and experiments"
        tone="violet"
        videoSrc="/videos/projects-reel.mp4"
        poster="/videos/projects-reel.mp4"
      />

      <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35 }}
            className="text-2xl sm:text-3xl font-bold mb-6"
          >
            Gallery
          </motion.h3>

          {/* Viewport */}
          <div
            ref={viewportRef}
            className="relative overflow-hidden pb-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Track (doubled) */}
            <motion.div
              ref={rowRef}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: measured ? 1 : 0, y: measured ? 0 : 8 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 min-w-max will-change-transform translate-z-0"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {doubled.map((p, i) => Card(p, i))}
            </motion.div>
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            Hover to pause • Click a card for details
          </p>
        </div>

        <ProjectModal project={active} onClose={() => setActive(null)} />
      </section>
    </div>
  );
}
