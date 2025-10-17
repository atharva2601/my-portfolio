"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import StageIntro from "./StageIntro";

type Exp = {
  company: string;
  role: string;
  time: string;
  logo?: string;
  video?: string;     // clip shown in sticky media
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

export default function ExperienceReel() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Intro stage with video */}
      <StageIntro
        id="experiences"
        title="Experiences"
        subtitle="A few highlights from recent roles"
        tone="blue"
        videoSrc="/videos/experience-reel.mp4"   // add file under /public/videos
        poster="/videos/experience-reel.mp4"
      />

      {/* Stepper with sticky media */}
      <section className="relative bg-white dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8">
          {/* Sticky media (left on desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 h-[40vh] lg:h-[70vh] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-900">
            {EXPERIENCES[active]?.video ? (
              <video
                key={EXPERIENCES[active].video}
                className="h-full w-full object-cover"
                src={EXPERIENCES[active].video}
                poster={EXPERIENCES[active].poster}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_30%,#0b1220_10%,#0b0b0b_70%)]" />
            )}
          </div>

          {/* Steps (right column) */}
          <div className="lg:col-span-6">
            {EXPERIENCES.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <motion.article
                  key={exp.company}
                  id={`exp-${i}`}
                  onViewportEnter={() => setActive(i)}
                  viewport={{ amount: 0.6, once: false }}
                  initial={{ opacity: 0, y: 28, x: left ? -12 : 12 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[80vh] flex items-center"
                >
                  <div className="w-full p-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/60 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      {exp.logo && (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10">
                          <Image src={exp.logo} alt="" fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold leading-tight">
                          {exp.role} • {exp.company}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{exp.time}</p>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
