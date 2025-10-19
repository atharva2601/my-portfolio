"use client";

import { AnimatePresence, motion } from "framer-motion";
import BubblesBG from "./bg/BubblesBG";
import SparklesBG from "./bg/SparklesBG";
import RibbonsBG from "./bg/RibbonsBG";

export default function ReelBackground({ index }: { index: number }) {
  // pick a scene for each slide; tweak as you like
  const Scene = [BubblesBG, SparklesBG, RibbonsBG][index % 3];

  return (
    <div className="absolute inset-0 -z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="absolute inset-0"
        >
          <Scene />
          {/* subtle radial vignette to keep cards readable */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.35)_100%)]" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
