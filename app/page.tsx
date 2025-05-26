"use client"

import { HeroSection } from "@/components/hero-section"
import { DeveloperFlow } from "@/components/developer-flow"
import { LiveActionCarousel } from "@/components/live-action-carousel"
import { ComparisonSection } from "@/components/comparison-section"
import { AnalyticsPeek } from "@/components/analytics-peek"
import { FinalCTA } from "@/components/final-cta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <ParticleBackground />
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
  )
}
