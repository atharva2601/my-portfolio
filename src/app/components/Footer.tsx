export default function Footer(){
  return (
    <footer className="py-10 text-center text-xs text-neutral-500 dark:text-neutral-400">
      © {new Date().getFullYear()} Atharva Patel — Built with Next.js & Tailwind
    </footer>
  );
}
