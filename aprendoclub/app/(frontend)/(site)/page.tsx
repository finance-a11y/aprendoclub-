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
import { getPayloadClient } from "@/lib/payload";
import { mapProgramaDoc } from "@/lib/programas";

export default async function Home() {
  const payload = await getPayloadClient();
  const { docs: programaDocs } = await payload.find({
    collection: "programas",
    sort: "orden",
    depth: 0,
  });
  const programas = programaDocs.map(mapProgramaDoc);

  return (
    <>
      <JsonLd data={[...homeGraph(), faqGraph(homeFaqs)]} />
      <HeroSection />
      <ProblemaSection />
      <BeneficiosSection />
      <ProgramasSection programas={programas} />
      <PricingSection />
      <TestimoniosSection />
      <InstructorSection />
      <FaqSection />
      <CtaSection />
      <StickyCTAMobile />
    </>
  );
}
