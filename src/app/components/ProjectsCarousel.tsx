// "use client";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import ProjectModal, { type Project } from "./ProjectModal";
// import SectionStage from "./SectionStage";

// const base: Project[] = [
//   { name:"Landslide Prediction",year:"2025",tags:["FastAPI","RabbitMQ","AWS"],image:"/projects/landslide.png",description:"HIPAA-compliant adherence system."},
//   { name:"BookMyTicket",year:"2025",tags:["Electron","Next.js","Prisma"],image:"/projects/BookMyticket.png",description:"Screenshot ingest + AI summary."},
//   { name:"E-voting Database",year:"2024",tags:["Django","Airflow","SAP"],image:"/projects/evoting.png",description:"Automated 3-way match & payments."},
//   { name:"Sentiment Analysis",year:"2025",tags:["CrewAI","LLM","MCP"],image:"/projects/emotion.png",description:"Multi-agent resume tailoring."},
//   { name:"Serverless Architecture",year:"2025",tags:["K-12","JSON","LLM"],image:"/projects/serverless.png",description:"K-12 project builder."},
// ];

// export default function ProjectsCarousel() {
//   const items = [...base, ...base];
//   const [active, setActive] = useState<Project|null>(null);
//   const [paused, setPaused] = useState(false);
//   const trackRef = useRef<HTMLDivElement>(null);

//   useEffect(()=> {
//     let raf=0;
//     const tick=()=>{ const el=trackRef.current;
//       if(el && !paused && !active){ el.scrollLeft += 0.9; if(el.scrollLeft >= el.scrollWidth/2) el.scrollLeft = 0; }
//       raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     return ()=>cancelAnimationFrame(raf);
//   }, [paused,active]);

//   return (
//     <SectionStage id="projects" title="Projects" tone="violet">
//       <div onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} className="overflow-x-hidden pb-2">
//         <div ref={trackRef} className="overflow-x-hidden">
//           <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.4}} transition={{duration:.45}} className="flex gap-4 min-w-max">
//             {items.map((p,i)=>(
//               <motion.button key={p.name+i} whileHover={{scale:1.02}} onClick={()=>setActive(p)}
//                 className="group relative shrink-0 w-72 sm:w-80 md:w-96 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 text-left hover:shadow-lg transition-shadow">
//                 <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
//                   {p.image ? <Image src={p.image} alt="" fill className="object-cover group-hover:scale-[1.03] transition-transform"/> : <div className="absolute inset-0 bg-neutral-800" />}
//                 </div>
//                 <div className="p-4">
//                   <div className="text-xs text-neutral-500 dark:text-neutral-400">{p.year}</div>
//                   <div className="text-sm font-semibold">{p.name}</div>
//                   <div className="mt-1 flex flex-wrap gap-1">{p.tags.map(t=>(
//                     <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">{t}</span>
//                   ))}</div>
//                 </div>
//               </motion.button>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//       <p className="mt-3 text-xs text-neutral-500">Cards auto-scroll; hover pauses; click opens details.</p>
//       <ProjectModal project={active} onClose={()=>setActive(null)}/>
//     </SectionStage>
//   );
// }
