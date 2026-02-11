import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProblemaSection } from "@/components/problema-section";
import { BeneficiosSection } from "@/components/beneficios-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimoniosSection } from "@/components/testimonios-section";
import { InstructorSection } from "@/components/instructor-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { StickyCTAMobile } from "@/components/sticky-cta-mobile";

export default function Home() {
  return (
    <>
      <a
        href="#precios"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-white"
      >
        Ir al contenido principal
      </a>
      <main className="flex min-h-screen w-full flex-col">
      <Navbar />
      <HeroSection />
      <ProblemaSection />
      <BeneficiosSection />
      <PricingSection />
      <TestimoniosSection />
      <InstructorSection />
      <FaqSection />
      <CtaSection />
      <Footer />
      </main>
      <StickyCTAMobile />
    </>
  );
}
