import { HeroSection } from "@/components/hero-section";
import { ProblemaSection } from "@/components/problema-section";
import { BeneficiosSection } from "@/components/beneficios-section";
import { ProgramasSection } from "@/components/programas-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimoniosSection } from "@/components/testimonios-section";
import { InstructorSection } from "@/components/instructor-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { StickyCTAMobile } from "@/components/sticky-cta-mobile";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemaSection />
      <BeneficiosSection />
      <ProgramasSection />
      <PricingSection />
      <TestimoniosSection />
      <InstructorSection />
      <FaqSection />
      <CtaSection />
      <StickyCTAMobile />
    </>
  );
}
