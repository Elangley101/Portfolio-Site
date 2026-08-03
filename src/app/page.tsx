import { CtaBand } from '@/components/cta/CtaBand';
import { AboutPreview } from '@/components/sections/AboutSection';
import { EngagementsSection } from '@/components/sections/EngagementsSection';
import { Hero } from '@/components/sections/Hero';
import { ProblemsSection } from '@/components/sections/ProblemsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ProjectsPreview } from '@/components/sections/ProjectsSection';
import { ResultsPreview } from '@/components/sections/ResultsSection';
import { ServicesPreview } from '@/components/sections/ServicesSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemsSection />
      <ServicesPreview />
      <EngagementsSection />
      <ResultsPreview tone="default" />
      <ProjectsPreview />
      <ProcessSection />
      <AboutPreview />
      <CtaBand location="home-footer" />
    </>
  );
}
