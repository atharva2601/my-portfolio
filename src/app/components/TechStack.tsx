const technologies = [
  'TypeScript', 'React', 'Next.js', 'Node.js',
  'Tailwind CSS', 'SQL', 'NoSQL', 'Docker', 'AWS'
];

export const TechStack = () => {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-12 text-black dark:text-white">My Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech) => (
            <div key={tech} className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-mono text-lg py-3 px-6 rounded-md border border-gray-200 dark:border-gray-700">
              [ {tech} ]
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};