"use client";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Experience, { type ExperienceItem } from "./Experience";
import SectionStage from "./SectionStage";

const experiences: ExperienceItem[] = [
  { title:"CVS Health", role:"Backend Python Developer", time:"2024 — Present", logo:"/logos/cvs.png",
    points:["FastAPI microservices on AWS (Lambda/EC2)","RabbitMQ, Twilio; HIPAA-compliant pipelines","Improved adherence notifications latency 32%"]},
  { title:"Hexaware", role:"Software Dev Engineer", time:"2023 — 2024", logo:"/logos/hexaware.png",
    points:["Automated invoice reconciliation (Django + Airflow)","SAP PI, Oracle Financials integration","Reduced manual effort by 40%"]},
  { title:"VibeSea", role:"Founding Engineer", time:"2025", logo:"/logos/vibesea.png",
    points:["Anti-cheat screenshot platform (Electron/Next.js)","Prisma/PostgreSQL, S3 snapshot ingestion","Real-time summarization & hiring tools"]},
];

export default function ExperienceSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const apiRef = useRef<any>(null);
  useEffect(()=>{ if(emblaApi) apiRef.current = emblaApi; },[emblaApi]);

  return (
    <SectionStage id="experiences" title="Experiences" tone="blue">
      <div className="flex items-center justify-end -mt-2 mb-4 gap-2">
        <button onClick={()=>apiRef.current?.scrollPrev()} className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-black/10 dark:border-white/10"><ChevronLeft className="h-4 w-4"/></button>
        <button onClick={()=>apiRef.current?.scrollNext()} className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-black/10 dark:border-white/10"><ChevronRight className="h-4 w-4"/></button>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.5}} transition={{duration:.4}} className="flex gap-6">
          {experiences.map(e => (
            <motion.div key={e.title} initial={{opacity:0,y:16,scale:.98}} whileInView={{opacity:1,y:0,scale:1}} transition={{duration:.35}} viewport={{once:false,amount:.4}}>
              <Experience item={e}/>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionStage>
  );
}
