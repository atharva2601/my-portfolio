const experienceData = [
  {
    date: "2021 → 2024",
    title: "Senior Product Designer",
    company: "TechCorp Solutions",
    tasks: [
      "Led team of four to migrate platform to React, reducing load times by 25%.",
      "Introduced standardized Figma design system, improving collaboration."
    ]
  },
  {
    date: "2018 → 2021",
    title: "Front-End Developer",
    company: "Startup X",
    tasks: [
      "Key contributor to a major e-commerce platform revamp.",
      "Implemented custom component library using Vue.js."
    ]
  },
  {
    date: "2017 → 2018",
    title: "Web Developer Intern",
    company: "Innovate Inc.",
    tasks: [
      "Assisted in development of a client-facing marketing website using HTML, CSS, and jQuery.",
      "Collaborated with senior developers to debug and resolve front-end issues."
    ]
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 md:px-10 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">My Professional Journey</h2>
        <div className="relative border-l border-gray-200">
          {experienceData.map((job, index) => (
            <div key={index} className="mb-10 ml-6" data-aos="fade-up" data-aos-delay={index * 100}>
              <span className="absolute flex items-center justify-center w-6 h-6 bg-text-dark rounded-full -left-3 ring-8 ring-white"></span>
              <p className="text-sm font-semibold text-gray-500 mb-1">{job.date}</p>
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-md text-gray-600 mb-3">{job.company}</p>
              <ul className="list-disc list-inside text-gray-500 space-y-1">
                {job.tasks.map((task, i) => <li key={i}>{task}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};