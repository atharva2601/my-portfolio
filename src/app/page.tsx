import Header from "./components/Header";
import Hero from "./components/Hero";
import ExperienceReel from "./components/ExperienceReel";   // NEW
import ProjectsShowcase from "./components/ProjectsShowcase"; // NEW
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
// import Footer from "./components/Footer";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      {/* Experiences: intro video + step-by-step reveal */}
      <ExperienceReel />
      {/* Projects: intro video + auto-scrolling gallery */}
      <ProjectsShowcase />
      <section id="tech"><TechStack /></section>
      <section id="contact"><Contact /></section>
      {/* <Footer /> */}
    </main>
  );
}
