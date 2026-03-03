import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import UseCases from "@/components/UseCases";
import Stats from "@/components/Stats";
import Integrations from "@/components/Integrations";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Demo />
      <UseCases />
      <Integrations />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
