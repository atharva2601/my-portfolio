"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import StageIntro from "./StageIntro";
import ProjectModal, { type Project } from "./ProjectModal";

const BASE: Project[] = [
  { name:"Landslide Prediction",year:"2025",tags:["FastAPI","RabbitMQ","AWS"],image:"/projects/landslide.png",description:"HIPAA-compliant adherence system."},
  { name:"BookMyTicket",year:"2025",tags:["Electron","Next.js","Prisma"],image:"/projects/BookMyticket.png",description:"Screenshot ingest + AI summary."},
  { name:"E-voting Database",year:"2024",tags:["Django","Airflow","SAP"],image:"/projects/evoting.png",description:"Automated 3-way match & payments."},
  { name:"Sentiment Analysis",year:"2025",tags:["CrewAI","LLM","MCP"],image:"/projects/emotion.png",description:"Multi-agent resume tailoring."},
  { name:"Serverless Architecture",year:"2025",tags:["K-12","JSON","LLM"],image:"/projects/serverless.png",description:"K-12 project builder."},
];

export default function ProjectsShowcase() {
  const items = [...BASE, ...BASE];
  const [active, setActive] = useState<Project|null>(null);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const step = () => {
      const el = trackRef.current;
      if (el && !paused && !active) {
        el.scrollLeft += 0.9;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused, active]);

  return (
    <div>
      {/* Intro stage with video or gradient */}
      <StageIntro
        id="projects"
        title="Projects"
        subtitle="Selected work and experiments"
        tone="violet"
        videoSrc="/videos/projects-reel.mp4"   // add this (or remove prop for gradient fallback)
        poster="/videos/projects-reel.mp4"
      />

      {/* Auto-scroll deck */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="text-2xl sm:text-3xl font-bold mb-6"
          >
            Gallery
          </motion.h3>

          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="overflow-x-hidden pb-2"
          >
            <div ref={trackRef} className="overflow-x-hidden">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45 }}
                className="flex gap-4 min-w-max"
              >
                {items.map((p, i) => (
                  <motion.button
                    key={p.name + i}
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
                ))}
              </motion.div>
            </div>
          </div>
          <p className="mt-3 text-xs text-neutral-500">Hover to pause • Click a card for details</p>
        </div>

        <ProjectModal project={active} onClose={() => setActive(null)} />
      </section>
    </div>
  );
}
