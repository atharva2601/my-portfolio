import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="h-screen w-full bg-white dark:bg-black flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop"
          alt="Abstract tech background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 p-4">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-black dark:text-white">
          Full-Stack Elegance
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-4">
          Supercharged by design and engineering.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="#experience" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition-transform hover:scale-105">
            Learn more
          </Link>
          <Link href="#work" className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-semibold py-3 px-6 rounded-full transition-transform hover:scale-105">
            View work
          </Link>
        </div>
      </div>
    </section>
  );
};