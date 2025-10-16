"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#home", label: "Home" },
  { href: "#experiences", label: "Experiences" },
  { href: "#projects", label: "Projects" },
  { href: "#tech", label: "Tech Stack" },
  { href: "#contact", label: "Contact Me" },
  { href: "/resume.pdf", label: "Resume" },
];

export default function Header() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-neutral-900/40 border-b border-black/5 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight text-lg">Atharva</a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="text-sm font-medium text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </div>
  );
}
