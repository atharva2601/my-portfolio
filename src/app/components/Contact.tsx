import Link from 'next/link';

export const Contact = () => {
  return (
    <section id="contact" className="bg-background-light py-20 px-4 text-center">
      <h2 
        className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto mb-6"
        data-aos="fade-in"
      >
        Ready to build something iconic?
      </h2>
      <Link 
        href="atharvap987@email.com" 
        className="inline-block bg-accent text-white font-bold py-4 px-10 rounded-full hover:bg-text-dark transition-all duration-300 transform hover:-translate-y-1"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        Get in Touch
      </Link>
    </section>
  );
};