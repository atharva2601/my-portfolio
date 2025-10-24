"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import StageIntro from "./StageIntro";

/* ------------------------------
 * Logos (inline, as requested)
 * -----------------------------*/
type TechLogo = { name: string; src: string };

const TECH_LOGOS: TechLogo[] = [
  { name: "React",        src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Django",       src: "https://static.djangoproject.com/img/logos/django-logo-positive.svg" },
  { name: "Flask",        src: "https://simpleicons.org/icons/flask.svg" },
  { name: "GitHub Actions", src: "https://simpleicons.org/icons/githubactions.svg" },
  { name: "HuggingFace",  src: "https://simpleicons.org/icons/huggingface.svg" },
  { name: "Kubernetes",   src: "https://raw.githubusercontent.com/cncf/artwork/master/projects/kubernetes/icon/color/kubernetes-icon-color.svg" },
  { name: "MySQL",        src: "https://upload.wikimedia.org/wikipedia/labs/8/8e/Mysql_logo.png" },
  { name: "NumPy",        src: "https://numpy.org/images/logo.svg" },
  { name: "Pandas",       src: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg" },
  { name: "PyTorch",      src: "https://pytorch.org/assets/images/pytorch-logo.svg" },
  { name: "TensorFlow",   src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
  { name: "Next.js",      src: "https://simpleicons.org/icons/nextdotjs.svg" },
  { name: "JavaScript",   src: "https://simpleicons.org/icons/javascript.svg" },
  { name: "Python",       src: "https://www.python.org/static/community_logos/python-logo-only.svg" },
  { name: "Node",         src: "https://nodejs.org/static/images/logo.svg" },
  { name: "PostgreSQL",   src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
  { name: "AWS",          src: "https://simpleicons.org/icons/amazonaws.svg" },
  { name: "Docker",       src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  { name: "Angular",      src: "https://angular.io/assets/images/logos/angular/angular.svg" },
];

/* ------------------------------
 * Card
 * -----------------------------*/
function LogoCard({ l }: { l: TechLogo }) {
  return (
    <div className="group flex flex-col items-center">
      <div className="grid place-items-center h-16 w-16 rounded-full bg-white/8 ring-1 ring-white/10 shadow-[0_0_30px_rgba(94,234,212,.08)]">
        <img
          src={l.src}
          alt={l.name}
          className="h-10 w-10 object-contain"
          loading="lazy"
          crossOrigin="anonymous"
        />
      </div>
      <div className="mt-2 text-xs opacity-90">{l.name}</div>
    </div>
  );
}

/* ------------------------------
 * Variants
 * -----------------------------*/
const brickParent = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const brickChild  = {
  hidden: { y: -160, opacity: 0, rotate: -4 },
  show:   { y: 0, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 520, damping: 20, mass: 0.6 } },
};

const leftParent  = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const leftChild   = {
  hidden: { x: -80, opacity: 0 },
  show:   { x: 0,  opacity: 1, transition: { type: "spring", stiffness: 420, damping: 28 } },
};

const rightParent = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const rightChild  = {
  hidden: { x: 80, opacity: 0 },
  show:   { x: 0,  opacity: 1, transition: { type: "spring", stiffness: 420, damping: 28 } },
};

/* ------------------------------
 * Re-trigger on every entry
 * -----------------------------*/
type Mode = "brick" | "left" | "right";

function RevealGrid({ items, mode }: { items: TechLogo[]; mode: Mode }) {
  const parentVariants = mode === "brick" ? brickParent : mode === "left" ? leftParent : rightParent;
  const childVariants  = mode === "brick" ? brickChild  : mode === "left" ? leftChild  : rightChild;

  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    amount: 0.35,          // start animating when ~35% is visible
    margin: "0px 0px -10% 0px", // small bottom margin so it resets sooner when leaving
  });

  // Play when in view, reset when out of view — so it replays on every pass.
  useEffect(() => {
    if (inView) controls.start("show");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={parentVariants}
      initial="hidden"
      animate={controls}
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-6"
    >
      {items.map((l) => (
        <motion.div key={`${mode}-${l.name}`} variants={childVariants}>
          <LogoCard l={l} />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ------------------------------
 * MAIN
 * -----------------------------*/
export default function TechStack() {
  // split evenly into 3 groups
  const third = Math.ceil(TECH_LOGOS.length / 3);
  const A = useMemo(() => TECH_LOGOS.slice(0, third), [third]);
  const B = useMemo(() => TECH_LOGOS.slice(third, third * 2), [third]);
  const C = useMemo(() => TECH_LOGOS.slice(third * 2), [third]);

  return (
    <div id="tech">
      <StageIntro
        id="tech-stack"
        title="Tech Skills"
        subtitle="Tools I ship with"
        tone="emerald"
        videoSrc="/videos/tech-reel.mp4"   // remove if you don't have this
        poster="/videos/tech-reel.mp4"
      />

      <section className="bg-neutral-950 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <RevealGrid items={A} mode="brick" />
          <RevealGrid items={B} mode="left" />
          <RevealGrid items={C} mode="right" />
        </div>
      </section>

      <div className="h-24 md:h-32 lg:h-40 bg-neutral-950" />
    </div>
  );
}
