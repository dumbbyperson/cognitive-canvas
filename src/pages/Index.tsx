import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
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
    <div className="relative min-h-screen grain app-background">
      {/* Animated floating orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      {/* VHS scanlines */}
      <div className="scanline-overlay" aria-hidden="true" />
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
