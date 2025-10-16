import Image from "next/image";

export interface ExperienceItem {
  title: string;
  role: string;
  time: string;
  points: string[];
  logo?: string; // e.g., "/logos/cvs.png"
}

export default function Experience({ item }: { item: ExperienceItem }) {
  return (
    <article className="min-w-[85%] sm:min-w-[60%] lg:min-w-[40%] p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/60 shadow-sm">
      <header className="mb-4 flex items-center gap-3">
        {item.logo && (
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10">
            <Image src={item.logo} alt="" fill className="object-cover" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold">{item.role} • {item.title}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.time}</p>
        </div>
      </header>
      <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
        {item.points.map((p) => (<li key={p}>{p}</li>))}
      </ul>
    </article>
  );
}
