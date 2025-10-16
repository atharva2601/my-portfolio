import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ExperienceSlider } from "./components/ExperienceSlider";
import { ProjectsCarousel } from "./components/ProjectsCarousel";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollAnimate } from "./components/ScrollAnimate";

export default function Home() {
  return (
    <main className="bg-white dark:bg-black text-black dark:text-white">
      <Header />
      
      <ScrollAnimate>
        <Hero />
      </ScrollAnimate>

      <ScrollAnimate>
        <ExperienceSlider />
      </ScrollAnimate>

      <ScrollAnimate>
        <ProjectsCarousel />
      </ScrollAnimate>
      
      <ScrollAnimate>
        <TechStack />
      </ScrollAnimate>
      
      <ScrollAnimate>
        <Contact />
      </ScrollAnimate>
      
      <Footer />
    </main>
  );
}