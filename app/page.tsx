import { CTA } from "@/components/home/CTA";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyBarberHub } from "@/components/home/WhyBarberHub";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      
      <Navbar />
     

      {/* Hero */}
     <Hero />

      {/* Why BarberHub */}
      <WhyBarberHub />

      {/* Dashboard Preview */}
      <DashboardPreview />

      {/* Features */}
      <Features />

      {/* How It Works */}
      <HowItWorks />

      {/* CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}