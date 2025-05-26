
import { HeroSection } from '@/components/sections/HeroSection';
import { FlowSection } from '@/components/sections/FlowSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <main>
        <HeroSection />
        <FlowSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ComparisonSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
