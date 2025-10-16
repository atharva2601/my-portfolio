"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const projects = [
  { id: '1', title: "Serverless Intelligence", image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=400&auto=format&fit=crop" },
  { id: '2', title: "Unified Design System", image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=400&auto=format=fit=crop" },
  { id: '3', title: "Real-Time Analytics", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format=fit=crop" },
  { id: '4', title: "Marketplace Revamp", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400&auto=format=fit=crop" },
  { id: '5', title: "Mobile Banking App", image: "https://images.unsplash.com/photo-1576153139585-5a6857422238?q=80&w=400&auto=format=fit=crop" },
  { id: '6', title: "Cloud Migration", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format=fit=crop" },
];

export const ProjectsCarousel = () => {
  return (
    <section id="work" className="py-20 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-black dark:text-white">Recent Projects</h2>
      </div>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="!pb-12" // Add padding to the bottom for spacing
      >
        {projects.map((project) => (
          // Define the size of each slide here
          <SwiperSlide key={project.id} className="!w-80 !h-96"> 
            <Link href="#" className="group block rounded-xl overflow-hidden relative w-full h-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover z-0 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <h3 className="relative z-20 p-6 flex flex-col justify-end h-full text-white text-2xl font-bold">
                {project.title}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};