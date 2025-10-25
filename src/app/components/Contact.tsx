"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import StageIntro from "./StageIntro";

/* ---------------------------------------------
   Settings (edit these)
---------------------------------------------- */
const TO_EMAIL = "you@example.com";
const GITHUB_URL = "https://github.com/yourname";
const LINKEDIN_URL = "https://www.linkedin.com/in/yourname/";

/* ---------------------------------------------
   Replay on every scroll visit
---------------------------------------------- */
function ReplayOnView({
  children,
  variants,
  className,
}: {
  children: React.ReactNode;
  variants: Variants;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.35, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={controls} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------
   Animation variants
---------------------------------------------- */
const parentStagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const slideUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 26 } },
};

const slideLeft: Variants = {
  hidden: { x: 50, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 28 } },
};

const slideRight: Variants = {
  hidden: { x: -50, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 28 } },
};

/* ---------------------------------------------
   Simple mailto handler (no backend)
---------------------------------------------- */
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const name = (fd.get("name") || "").toString();
  const email = (fd.get("email") || "").toString();
  const message = (fd.get("message") || "").toString();

  const subject = `Portfolio message from ${name || "someone"}`;
  const body = `${message}\n\nReply to: ${email}`;
  const mailto = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

/* ---------------------------------------------
   Animated particles background
---------------------------------------------- */
function ContactBG() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Assert non-null so inner closures don't re-introduce nullability
    const canvas = canvasRef.current!; // mounted in client
    const ctx = canvas.getContext("2d", { alpha: true }) as CanvasRenderingContext2D;

    let raf: number = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; c: string }[] = [];
    let w = 0,
      h = 0,
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const palette = ["#22d3ee", "#34d399", "#fbbf24", "#a78bfa", "#f472b6"];
    const MAX_DIST = 120;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((w * h) / 15000); // density
      particles = new Array(count).fill(0).map(() => {
        const speed = 0.2 + Math.random() * 0.6;
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1.2 + Math.random() * 2.0,
          c: palette[(Math.random() * palette.length) | 0],
        };
      });
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);

      // soft vignette
      const grd = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
      grd.addColorStop(0, "rgba(0,0,0,0)");
      grd.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // dots
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // strings
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i],
            b = particles[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            const alpha = 1 - d / MAX_DIST;
            ctx.strokeStyle = `rgba(148,163,184,${alpha * 0.55})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      resize();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    });
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* subtle color wash so dots feel integrated */}
      <div className="absolute inset-0 opacity-100 bg-[radial-gradient(120%_120%_at_10%_10%,rgba(16,185,129,.12),transparent_55%),radial-gradient(120%_120%_at_90%_0%,rgba(59,130,246,.10),transparent_60%),radial-gradient(160%_140%_at_50%_120%,rgba(236,72,153,.10),transparent_60%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

/* ---------------------------------------------
   Icon button (logos only)
---------------------------------------------- */
function IconButton({
  href,
  label,
  children,
  delay = 0,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.a
      variants={slideLeft}
      transition={{ delay }}
      href={href}
      aria-label={label}
      target="_blank"
      className="grid h-11 w-11 place-items-center rounded-full bg-white/8 ring-1 ring-white/10 hover:bg-white/12 hover:ring-white/20 active:scale-[.98] transition"
    >
      {children}
    </motion.a>
  );
}

/* ---------------------------------------------
   MAIN
---------------------------------------------- */
export default function Contact() {
  return (
    <>
      {/* Contact reel (your video hero) */}
      <StageIntro
        id="contact-intro"
        title="Contact Me"
        subtitle="Let’s build something great"
        tone={"amber" as any} // keep look; silence TS union error
        videoSrc="/videos/contact-reel.mp4"
        poster="/videos/contact-reel.mp4"
      />

      {/* Animated contact section (background + content + footer) */}
      <section id="contact" className="relative overflow-hidden bg-neutral-950">
        <ContactBG />

        {/* content sits above background */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Form */}
            <ReplayOnView variants={parentStagger} className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
              <motion.form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={slideUp}>
                  <label className="sr-only" htmlFor="name">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </motion.div>
                <motion.div variants={slideUp}>
                  <label className="sr-only" htmlFor="email">
                    Your email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your email"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </motion.div>
                <motion.div variants={slideUp}>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    rows={8}
                    className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </motion.div>
                <motion.div variants={slideUp}>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-black hover:bg-white/90 active:scale-[.98] transition"
                  >
                    Send
                  </button>
                </motion.div>
              </motion.form>
            </ReplayOnView>

            {/* Socials – logos only */}
            <ReplayOnView variants={parentStagger} className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
              <motion.h4 variants={slideRight} className="text-base font-semibold mb-4">
                Prefer email or socials?
              </motion.h4>
              <motion.div variants={parentStagger} className="flex items-center gap-3">
                <IconButton href={`mailto:${TO_EMAIL}`} label="Email">
                  {/* mail glyph */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90" aria-hidden="true">
                    <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" fill="currentColor" opacity=".1" />
                    <path d="M4 7.5 12 13l8-5.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </IconButton>

                <IconButton href={GITHUB_URL} label="GitHub" delay={0.05}>
                  <img
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
                    alt=""
                    className="h-5 w-5"
                    crossOrigin="anonymous"
                    loading="lazy"
                  />
                </IconButton>

                <IconButton href={LINKEDIN_URL} label="LinkedIn" delay={0.1}>
                  <img
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
                    alt=""
                    className="h-5 w-5"
                    crossOrigin="anonymous"
                    loading="lazy"
                  />
                </IconButton>
              </motion.div>
            </ReplayOnView>
          </div>
        </div>

        {/* Footer INSIDE the animated section */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
          <p className="text-center text-xs text-white/60">© Atharva Patel</p>
          
          <p className="text-[10px] sm:text-[11px] text-white/40 sm:ml-auto">
          Videos courtesy of{" "}
          <a
            href="https://www.pexels.com/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted hover:text-white/60"
          >
            Pexels
          </a>
        </p>
        </div>
      </section>
    </>
  );
}
