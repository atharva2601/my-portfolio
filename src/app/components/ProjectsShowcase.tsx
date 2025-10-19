"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import StageIntro from "./StageIntro";
import ProjectModal, { type Project } from "./ProjectModal";

const BASE: Project[] = [
  { name: "Landslide Prediction", year: "2025", tags: ["FastAPI", "RabbitMQ", "AWS"], image: "/projects/landslide.png", description: "HIPAA-compliant adherence system." },
  { name: "BookMyTicket",        year: "2025", tags: ["Electron", "Next.js", "Prisma"], image: "/projects/BookMyticket.png", description: "Screenshot ingest + AI summary." },
  { name: "E-voting Database",   year: "2024", tags: ["Django", "Airflow", "SAP"],     image: "/projects/evoting.png", description: "Automated 3-way match & payments." },
  { name: "Sentiment Analysis",  year: "2025", tags: ["CrewAI", "LLM", "MCP"],        image: "/projects/emotion.png", description: "Multi-agent resume tailoring." },
  { name: "Serverless Architecture", year: "2025", tags: ["K-12", "JSON", "LLM"],     image: "/projects/serverless.png", description: "K-12 project builder." },
];

export default function ProjectsShowcase() {
  // Duplicate items so the track can loop seamlessly
  const items = useMemo(() => [...BASE, ...BASE], []);
  const [active, setActive] = useState<Project | null>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady]   = useState(false);

  const scrollerRef = useRef<HTMLDivElement>(null); // the scrolling container
  const trackRef    = useRef<HTMLDivElement>(null); // the long inner strip

  // ---------- Preload images + fallback so gallery doesn't hang ----------
  useEffect(() => {
    let cancelled = false;
    const imgs = items
      .map(p => p.image)
      .filter(Boolean) as string[];

    const loaders = imgs.slice(0, BASE.length).map(src => {
      return new Promise<void>(resolve => {
        const img = new window.Image();
        img.src = src;
        // decode when possible (super smooth), otherwise resolve on load/error
        (img.decode?.() ?? Promise.resolve())
          .catch(() => {})
          .finally(() => resolve());
      });
    });

    // Safety timeout so we don't wait forever on slow networks
    const timer = setTimeout(() => !cancelled && setReady(true), 1200);

    Promise.allSettled(loaders).then(() => {
      if (!cancelled) {
        clearTimeout(timer);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [items]);

  // ---------- Smooth auto-scroll (time-based, fast & consistent) ----------
  useEffect(() => {
    if (!ready) return;

    let raf = 0;
    let last = performance.now();

    // ~240 px/sec feels “a bit faster” while still readable.
    // Tweak if you want: 200–300 range is usually nice.
    const PX_PER_SEC = 240;

    const loop = (now: number) => {
      const scroller = scrollerRef.current;
      const track = trackRef.current;
      if (!scroller || !track) {
        raf = requestAnimationFrame(loop);
        return;
      }

      const dt = (now - last) / 1000;
      last = now;

      if (!paused && !active) {
        const half = track.scrollWidth / 2;
        scroller.scrollLeft += PX_PER_SEC * dt;
        // wrap seamlessly
        if (scroller.scrollLeft >= half) scroller.scrollLeft -= half;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ready, paused, active]);

  return (
    <div>
      {/* Intro stage */}
      <StageIntro
        id="projects"
        title="Projects"
        subtitle="Selected work and experiments"
        tone="violet"
        videoSrc="/videos/projects-reel.mp4"
        poster="/videos/projects-reel.mp4"
      />

      {/* Auto-scroll gallery */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35 }}
            className="text-2xl sm:text-3xl font-bold mb-6"
          >
            Gallery
          </motion.h3>

          <div
            className="overflow-x-hidden pb-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Scroller */}
            <div
              ref={scrollerRef}
              className="overflow-x-hidden w-full"
              // Avoid momentum rubber-band on iOS
              style={{ WebkitOverflowScrolling: "auto" }}
            >
              {/* Track */}
              <motion.div
                ref={trackRef}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
                transition={{ duration: 0.35 }}
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
                          sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                          className="object-cover group-hover:scale-[1.03] transition-transform"
                          // make the very first few images eager to show content instantly
                          priority={i < 3}
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

          <p className="mt-3 text-xs text-neutral-500">
            Hover to pause • Click a card for details
          </p>
        </div>

        <ProjectModal project={active} onClose={() => setActive(null)} />
      </section>
    </div>
  );
}
