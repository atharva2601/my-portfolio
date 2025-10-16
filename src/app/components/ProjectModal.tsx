"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface Project {
  name: string;
  year: string;
  tags: string[];
  image?: string;
  description: string;
  links?: { label: string; href: string }[];
}

export default function ProjectModal({
  project, onClose,
}: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 w-[min(900px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-neutral-950 p-4 sm:p-6"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/10 bg-neutral-900">
                {project.image ? (
                  <Image src={project.image} alt="" fill className="object-cover" />
                ) : null}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{project.name} <span className="text-neutral-400 text-sm">• {project.year}</span></h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-neutral-800">{t}</span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{project.description}</p>
                {project.links?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.links.map(l => (
                      <a key={l.href} href={l.href} target="_blank" className="text-sm px-3 py-1 rounded-lg bg-white text-black hover:opacity-90">
                        {l.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-4 text-right">
              <button onClick={onClose} className="px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/5">Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
