// import Image from 'next/image';
// import Link from 'next/link';

// // You will replace this data with your own
// const projects = [
//   {
//     id: 'project-1',
//     title: "Serverless Intelligence.",
//     caption: "Architecting a seamless, cost-optimized video analysis pipeline.",
//     image: "/serverless-arch.svg",
//     stats: [
//       {
//         title: "The Cost Challenge.",
//         description: "Legacy systems were inefficient, incurring unnecessary infrastructure overhead. My mandate was to refactor for maximum operational efficiency.",
//         value: "26%",
//         label: "Decrease in Operational Costs"
//       },
//       {
//         title: "Engineering Quality.",
//         description: "Reliability and rapid deployment were hampered by manual processes. I implemented automated testing and CI/CD for continuous, high-quality delivery.",
//         value: "7%",
//         label: "Increase in Code Coverage"
//       }
//     ]
//   },
//   {
//     id: 'project-2',
//     title: "Unified Design System.",
//     caption: "Building a scalable component library for a consistent user experience.",
//     image: "/serverless-arch.svg",
//     stats: [
//       {
//         title: "The Challenge of Fragmentation.",
//         description: "Multiple teams were building in silos, leading to a disjointed user experience and duplicated effort across the company's product suite.",
//         value: "40%",
//         label: "Faster Prototyping"
//       },
//       {
//         title: "Enforcing Accessibility.",
//         description: "The new component library baked in WCAG 2.1 AA standards from the ground up, ensuring our products were usable by everyone.",
//         value: "60%",
//         label: "Reduction in UI Bugs"
//       }
//     ]
//   }
// ];

// export const Projects = () => {
//   return (
//     <div id="work">
//       {projects.map((project, index) => (
//         <section key={project.id} className={`min-h-screen py-20 px-4 md:px-10 flex flex-col justify-center ${index % 2 === 1 ? 'bg-background-light' : 'bg-white'}`}>
//           <div className="max-w-6xl mx-auto w-full">
//             <h2 className="text-4xl md:text-6xl font-bold text-center tracking-tighter mb-8" data-aos="fade-up">
//               {project.title}
//             </h2>
//             <div className="text-center mb-16" data-aos="zoom-in">
//               <p className="text-lg text-gray-600 mb-4">{project.caption}</p>
//               <Image src={project.image} alt={project.title} width={800} height={400} className="mx-auto" />
//             </div>

//             {project.stats.map((stat, statIndex) => (
//               <div key={statIndex} className={`flex flex-col md:flex-row items-center justify-between gap-12 py-16 ${statIndex % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
//                 <div className="md:w-1/2 text-center md:text-left" data-aos={statIndex % 2 === 1 ? 'fade-left' : 'fade-right'}>
//                   <h3 className="text-2xl font-semibold mb-2">{stat.title}</h3>
//                   <p className="text-gray-600">{stat.description}</p>
//                 </div>
//                 <div className="md:w-1/2 text-center md:text-right" data-aos={statIndex % 2 === 1 ? 'fade-right' : 'fade-left'}>
//                   <span className="text-7xl md:text-9xl font-black accent-color-text leading-none">{stat.value}</span>
//                   <p className="text-lg font-medium text-gray-500 mt-2">{stat.label}</p>
//                 </div>
//               </div>
//             ))}
            
//             <div className="text-center mt-12" data-aos="fade-up">
//               <Link href="#" className="font-semibold text-accent border-b-2 border-accent pb-1 hover:opacity-75 transition-opacity">
//                 View Full Case Study →
//               </Link>
//             </div>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };