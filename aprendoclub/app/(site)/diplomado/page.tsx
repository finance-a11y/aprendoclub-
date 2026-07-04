import type { Metadata } from "next"
import { Hero } from "@/components/diplomado/hero"
import { Origin } from "@/components/diplomado/origin"
import { Audience } from "@/components/diplomado/audience"
import { Methodology } from "@/components/diplomado/methodology"
import { Curriculum } from "@/components/diplomado/curriculum"
import { HowItWorks } from "@/components/diplomado/how-it-works"
import { Team } from "@/components/diplomado/team"
import { Benefits } from "@/components/diplomado/benefits"
import { Pricing } from "@/components/diplomado/pricing"
import { FAQ } from "@/components/diplomado/faq"
import { CTA } from "@/components/diplomado/cta"
import { RelatedLinks } from "@/components/related-links"

export const metadata: Metadata = {
  title: "Diplomado de cero a SEO | aprendoclub",
  description:
    "Conviértete en especialista SEO en 16 semanas, sin experiencia previa. Práctica real, coaching en vivo y certificación.",
}

export default function DiplomadoPage() {
  return (
    <div className="w-full bg-[var(--bg-primary)] text-white">
      <Hero />
      <Origin />
      <Audience />
      <div id="metodologia" className="scroll-mt-[72px]">
        <Methodology />
      </div>
      <div id="programa" className="scroll-mt-[72px]">
        <Curriculum />
      </div>
      <HowItWorks />
      <div id="equipo" className="scroll-mt-[72px]">
        <Team />
      </div>
      <Benefits />
      <Pricing />
      <div id="faq" className="scroll-mt-[72px]">
        <FAQ />
      </div>
      <CTA />
      <RelatedLinks
        links={[
          { href: "/programas", label: "Ver todos los programas" },
          {
            href: "/testimonios",
            label: "Lee las historias de nuestros estudiantes",
          },
        ]}
      />
    </div>
  )
}
