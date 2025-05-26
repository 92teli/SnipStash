import { HeroSection } from '@/components/hero-section';
import { DeveloperFlow } from '@/components/developer-flow';
import { LiveActionCarousel } from '@/components/live-action-carousel';
import { ComparisonSection } from '@/components/comparison-section';
import { AnalyticsPeek } from '@/components/analytics-peek';
import { FinalCTA } from '@/components/final-cta';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <main>
        <HeroSection />
        <DeveloperFlow />
        <LiveActionCarousel />
        <ComparisonSection />
        <AnalyticsPeek />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
