import type { ComponentType } from 'react'

import { SectionHeader } from './SectionHeader'
import { CtaBanner } from './CtaBanner'
import { Stats } from './Stats'
import { Prose } from './Prose'
import { RelatedLinks } from './RelatedLinks'
import { FaqRef } from './FaqRef'
import { TestimonialRef } from './TestimonialRef'
import { TeamGridRef } from './TeamGridRef'
import { ProgramGridRef } from './ProgramGridRef'
import { LogosRef } from './LogosRef'
import { Hero } from './Hero'
import { FeatureGrid } from './FeatureGrid'
import { Pricing } from './Pricing'
import { HeroHome } from './HeroHome'
import { Instructor } from './Instructor'
import { StickyCta } from './StickyCta'
import { Historia } from './Historia'
import { Fundadora } from './Fundadora'
import { Metodologia } from './Metodologia'
import { RetoGaleria } from './RetoGaleria'
import { TallerHero } from './TallerHero'
import { TallerIncluye } from './TallerIncluye'
import { TallerParaQuien } from './TallerParaQuien'
import { TallerPricing } from './TallerPricing'
import { Audience } from './Audience'
import { Curriculum16Semanas } from './Curriculum16Semanas'
import { HowItWorks } from './HowItWorks'
import { DiplomadoTeam } from './DiplomadoTeam'
import { DiplomadoBenefits } from './DiplomadoBenefits'
import { DiplomadoPricing } from './DiplomadoPricing'
import { BarraUrgencia } from './BarraUrgencia'
import { RetoHero } from './RetoHero'
import { RazonNoEscalas } from './RazonNoEscalas'
import { Mentora } from './Mentora'

/**
 * Registry blockType -> componente de render.
 *
 * Plan R03 registró los 10 bloques de referencia/primitivos. Plan R04 AÑADE
 * los genéricos Hero/FeatureGrid/Pricing y los bespoke de home (heroHome,
 * instructor, stickyCta); R05 añade los bespoke del diplomado (audience,
 * curriculum16Semanas, howItWorks, diplomadoTeam, diplomadoBenefits,
 * diplomadoPricing). R06 añade los bespoke del reto (barraUrgencia,
 * retoHero, razonNoEscalas, mentora, agenda, comparacion, incluye, premios,
 * retoPricing, ganadores), completando la cobertura total de blockTypes. R06 sigue añadiendo entradas
 * a este mismo objeto sin tocar las ya registradas. `RenderBlocks` tolera
 * blockType ausente de este registry (ver components/blocks/RenderBlocks.tsx),
 * así que agregar entradas incrementalmente nunca rompe el build.
 */
export const blockRenderers: Record<string, ComponentType<{ block: any }>> = {
  sectionHeader: SectionHeader,
  ctaBanner: CtaBanner,
  stats: Stats,
  prose: Prose,
  relatedLinks: RelatedLinks,
  faqRef: FaqRef,
  testimonialRef: TestimonialRef,
  teamGridRef: TeamGridRef,
  programGridRef: ProgramGridRef,
  logosRef: LogosRef,
  hero: Hero,
  featureGrid: FeatureGrid,
  pricing: Pricing,
  heroHome: HeroHome,
  instructor: Instructor,
  stickyCta: StickyCta,
  historia: Historia,
  fundadora: Fundadora,
  metodologia: Metodologia,
  retoGaleria: RetoGaleria,
  tallerHero: TallerHero,
  tallerIncluye: TallerIncluye,
  tallerParaQuien: TallerParaQuien,
  tallerPricing: TallerPricing,
  audience: Audience,
  curriculum16Semanas: Curriculum16Semanas,
  howItWorks: HowItWorks,
  diplomadoTeam: DiplomadoTeam,
  diplomadoBenefits: DiplomadoBenefits,
  diplomadoPricing: DiplomadoPricing,
  barraUrgencia: BarraUrgencia,
  retoHero: RetoHero,
  razonNoEscalas: RazonNoEscalas,
  mentora: Mentora,
}
