"use client";
import { motion } from "framer-motion";
import SectionStage from "./SectionStage";

const tech = [
  { name:"React", src:"/logos/React.png" }, { name:"Django", src:"/logos/Django.png" },
  { name:"Flask", src:"/logos/flask.png" }, { name:"Github Actions", src:"/logos/github.png" },
  { name:"HuggingFace", src:"/logos/HuggingFace.png" }, { name:"Kubernetes", src:"/logos/Kubernetes.png" },
  { name:"MySQL", src:"/logos/Mysql.png" },
  { name:"Numpy", src:"/logos/numpy.png" }, { name:"Pandas", src:"/logos/pandas.png" },
  { name:"PyTorch", src:"/logos/Pytorch.png" }, { name:"TensorFlow", src:"/logos/TensorFlow.png" },
  { name:"Next.js", src:"/logos/Next.png" }, { name:"JavaScript", src:"/logos/JS.png" },
  { name:"Python", src:"/logos/Python.png" }, { name:"Node", src:"/logos/Node.png" },
  { name:"PostgreSQL", src:"/logos/postgre.png" }, { name:"AWS", src:"/logos/AWS.png" },
  { name:"Docker", src:"/logos/Docker.png" }, { name:"Angular", src:"/logos/angular.png" },
];

export default function TechStack(){
  return (
    <SectionStage id="tech" title="Tech Stack" tone="green">
      <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.4}} transition={{duration:.45}} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {tech.map((t,i)=>(
          <motion.div key={t.name}
            initial={{opacity:0,y:16,scale:.96}} whileInView={{opacity:1,y:0,scale:1}} transition={{duration:.35, delay:i*0.03}} viewport={{once:false,amount:.5}}
            whileHover={{ scale:1.08, rotate:1 }}
            className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/60 p-4 flex flex-col items-center justify-center shadow-sm"
          >
            <div className="relative h-12 w-12 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.src} alt={t.name} className="absolute inset-0 h-full w-full object-contain drop-shadow" />
            </div>
            <div className="text-sm font-medium text-center">{t.name}</div>
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity sheen" />
          </motion.div>
        ))}
      </motion.div>
    </SectionStage>
  );
}
