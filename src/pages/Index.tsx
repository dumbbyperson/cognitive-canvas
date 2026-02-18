import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingOrbs from '@/components/FloatingOrbs';
import QuantumCursor from '@/components/QuantumCursor';
import DepthLayers from '@/components/DepthLayers';
import HeroSection from '@/components/sections/HeroSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import EducationSection from '@/components/sections/EducationSection';
import SkillsAbilitiesSection from '@/components/sections/SkillsAbilitiesSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import SkillsLabSection from '@/components/sections/SkillsLabSection';
import SystemsMapSection from '@/components/sections/SystemsMapSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CurrentlyLearningSection from '@/components/sections/CurrentlyLearningSection';
import CurrentlySection from '@/components/sections/CurrentlySection';
import PhotographySection from '@/components/sections/PhotographySection';
import Footer from '@/components/Footer';
import EasterEggSystem from '@/components/EasterEggSystem';
import StickyContactButton from '@/components/StickyContactButton';

const Index = () => {
  return (
    <div className="relative min-h-screen grain scanlines-animated bg-animated-gradient">
      <QuantumCursor />
      <DepthLayers />
      <FloatingOrbs />
      <ParticleBackground />
      <Navigation />
      <EasterEggSystem />
      <StickyContactButton />
      
      <main>
        <HeroSection />
        <AboutMeSection />
        <EducationSection />
        <SkillsAbilitiesSection />
        <CertificationsSection />
        <SkillsLabSection />
        <SystemsMapSection />
        <ProjectsSection />
        <CurrentlyLearningSection />
        <CurrentlySection />
        <PhotographySection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
