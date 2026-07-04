import { HeroSection } from "@/components/hero-section";
import { ProblemaSection } from "@/components/problema-section";
import { BeneficiosSection } from "@/components/beneficios-section";
import { ProgramasSection } from "@/components/programas-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimoniosSection } from "@/components/testimonios-section";
import { InstructorSection } from "@/components/instructor-section";
import { CtaSection } from "@/components/cta-section";
import { StickyCTAMobile } from "@/components/sticky-cta-mobile";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import { homeGraph, faqGraph } from "@/lib/schema";
import { homeFaqs } from "@/content/faqs";

export default function Home() {
  return (
    <>
      <JsonLd data={[...homeGraph(), faqGraph(homeFaqs)]} />
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
