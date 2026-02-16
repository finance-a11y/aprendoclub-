import { Navbar } from "@/components/diplomado/navbar"
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
import { Footer } from "@/components/diplomado/footer"

export default function DiplomadoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Origin />
      <Audience />
      <div id="metodologia">
        <Methodology />
      </div>
      <div id="programa">
        <Curriculum />
      </div>
      <HowItWorks />
      <div id="equipo">
        <Team />
      </div>
      <Benefits />
      <Pricing />
      <div id="faq">
        <FAQ />
      </div>
      <CTA />
      <Footer />
    </main>
  )
}
