"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const experienceData = [
  {
    title: "Product Design",
    company: "TechCorp Solutions",
    description: "Leading design on a flagship product with millions of users.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
  },
  {
    title: "Front-End Development",
    company: "Startup X",
    description: "Building a pixel-perfect user interface from the ground up.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
  },
  {
    title: "Full-Stack Engineering",
    company: "Innovate Inc.",
    description: "Architecting scalable systems and intuitive front-end experiences.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop",
  }
];

export const ExperienceSlider = () => {
  return (
    <section id="experience" className="h-screen bg-white dark:bg-black">
       <Swiper
        navigation={true} // Enable click arrows
        loop={true}
        modules={[Navigation]}
        className="w-full h-full"
      >
        {experienceData.map((job, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex flex-col justify-center items-center text-center p-8">
               <Image
                src={job.image}
                alt={job.title}
                fill
                className="object-cover z-0 opacity-80"
              />
              <div className="relative z-20 text-white" data-aos="fade-up">
                <p className="text-lg font-semibold text-gray-200 mb-2">{job.company}</p>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mix-blend-difference">{job.title}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};