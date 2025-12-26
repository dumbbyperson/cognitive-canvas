import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/sections/HeroSection';
import HowIThinkSection from '@/components/sections/HowIThinkSection';
import SystemsMapSection from '@/components/sections/SystemsMapSection';
import SkillsLabSection from '@/components/sections/SkillsLabSection';
import BuildLogSection from '@/components/sections/BuildLogSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ConstraintsSection from '@/components/sections/ConstraintsSection';
import FailureArchiveSection from '@/components/sections/FailureArchiveSection';
import DesignPhilosophySection from '@/components/sections/DesignPhilosophySection';
import CurrentlyLearningSection from '@/components/sections/CurrentlyLearningSection';
import CurrentlySection from '@/components/sections/CurrentlySection';
import PhotographySection from '@/components/sections/PhotographySection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import EasterEggSystem from '@/components/EasterEggSystem';

const Index = () => {
  return (
    <div className="relative min-h-screen grain">
      <ParticleBackground />
      <Navigation />
      <EasterEggSystem />
      
      <main>
        <HeroSection />
        <HowIThinkSection />
        <SystemsMapSection />
        <SkillsLabSection />
        <BuildLogSection />
        <ProjectsSection />
        <ConstraintsSection />
        <FailureArchiveSection />
        <DesignPhilosophySection />
        <CurrentlyLearningSection />
        <CurrentlySection />
        <PhotographySection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
