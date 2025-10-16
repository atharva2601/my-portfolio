"use client";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import SectionStage from "./SectionStage";

export default function Contact(){
  return (
    <SectionStage id="contact" title="Contact Me" tone="orange">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.form initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.5}} transition={{duration:.45}}
          action="https://formspree.io/f/your-id" method="POST"
          className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 space-y-3">
          <input required name="name" placeholder="Your name" className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900" />
          <input required type="email" name="email" placeholder="Your email" className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900" />
          <textarea required name="message" placeholder="Message" rows={5} className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-neutral-900" />
          <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-black text-white dark:bg-white dark:text-black">Send</button>
        </motion.form>

        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.5}} transition={{duration:.45}}
          className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Prefer email or socials?</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href="mailto:you@example.com" className="inline-flex items-center gap-2 hover:underline"><Mail className="h-4 w-4" /> you@example.com</a>
            <a href="https://github.com/atharva2601" className="inline-flex items-center gap-2 hover:underline"><Github className="h-4 w-4" /> github.com/atharva2601</a>
            <a href="https://linkedin.com/in/your-handle" className="inline-flex items-center gap-2 hover:underline"><Linkedin className="h-4 w-4" /> linkedin.com/in/your-handle</a>
          </div>
        </motion.div>
      </div>
    </SectionStage>
  );
}
