import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <header className="fixed top-0 w-full px-6 md:px-10 py-6 z-50 flex justify-between items-center text-black dark:text-white transition-colors duration-300">
      <Link href="/" className="text-lg font-bold">
        Atharva Patel
      </Link>
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#experience" className="hover:text-accent">Experience</Link>
          <Link href="#work" className="hover:text-accent">Projects</Link>
          <Link href="#contact" className="hover:text-accent">Contact Me</Link>
          <Link href="/resume.pdf" target="_blank" className="hover:text-accent">Resume</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};