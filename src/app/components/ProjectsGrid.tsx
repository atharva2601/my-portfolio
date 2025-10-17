// import Image from 'next/image';
// import Link from 'next/link';

// const projects = [
//   {
//     id: 'project-1',
//     category: "Web Application",
//     title: "Serverless Intelligence",
//     image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 'project-2',
//     category: "UI/UX Design",
//     title: "Unified Design System",
//     image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 'project-3',
//     category: "Data Visualization",
//     title: "Real-Time Analytics",
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 'project-4',
//     category: "E-Commerce",
//     title: "Marketplace Revamp",
//     // UPDATED URL
//     image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 'project-5',
//     category: "Mobile App",
//     title: "Mobile Banking",
//     // UPDATED URL
//     image: "https://images.unsplash.com/photo-1601597111158-2f9e2d4d8e27?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 'project-6',
//     category: "Cloud Architecture",
//     title: "Cloud Migration",
//     image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
//   }
// ];

// export const ProjectsGrid = () => {
//   return (
//     <section id="work" className="py-20 px-4 md:px-8 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">My Work</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {projects.map((project) => (
//             <Link href="#" key={project.id} className="group block rounded-xl overflow-hidden relative h-80" data-aos="fade-up">
//               <Image
//                 src={project.image}
//                 alt={project.title}
//                 fill
//                 className="object-cover z-0 transition-transform duration-500 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
//               <div className="relative z-20 p-6 flex flex-col justify-end h-full text-white">
//                 <p className="text-sm font-semibold text-gray-300">{project.category}</p>
//                 <h3 className="text-2xl font-bold mt-1">{project.title}</h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };