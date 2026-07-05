// Barrel export: reusable field helpers + blocks for the Pages page-builder
// (Phase 14 Plans 02 [genéricos] + R01 [bespoke, revisado]).
// Import from this single entrypoint so no consumer re-defines the same fields.

import type { Block } from 'payload'

export { linkFields, linkGroup } from '../fields/link'
export { sectionHeaderFields } from '../fields/sectionHeader'

// --- 11 bloques genéricos (14-02) ---
export { heroFields, HeroBlock } from './Hero'
export { pricingFields, PricingBlock } from './Pricing'
export { ctaBannerFields, CtaBannerBlock } from './CtaBanner'
export { featureGridFields, FeatureGridBlock } from './FeatureGrid'
export { statsFields, StatsBlock } from './Stats'
export { proseFields, ProseBlock } from './Prose'

export { faqRefFields, FaqRefBlock } from './FaqRef'
export { testimonialRefFields, TestimonialRefBlock } from './TestimonialRef'
export { teamGridRefFields, TeamGridRefBlock } from './TeamGridRef'
export { programGridRefFields, ProgramGridRefBlock } from './ProgramGridRef'
export { logosRefFields, LogosRefBlock } from './LogosRef'

// --- 29 bloques bespoke (14-R01) ---
// Compartidos / home / quienes-somos / testimonios / taller
export { SectionHeaderBlock } from './SectionHeaderBlock'
export { relatedLinksFields, RelatedLinksBlock } from './RelatedLinks'
export { heroHomeFields, HeroHomeBlock } from './HeroHome'
export { instructorFields, InstructorBlock } from './Instructor'
export { stickyCtaFields, StickyCtaBlock } from './StickyCta'
export { historiaFields, HistoriaBlock } from './Historia'
export { fundadoraFields, FundadoraBlock } from './Fundadora'
export { metodologiaFields, MetodologiaBlock } from './Metodologia'
export { retoGaleriaFields, RetoGaleriaBlock } from './RetoGaleria'
export { tallerHeroFields, TallerHeroBlock } from './TallerHero'
export { tallerIncluyeFields, TallerIncluyeBlock } from './TallerIncluye'
export { tallerParaQuienFields, TallerParaQuienBlock } from './TallerParaQuien'
export { tallerPricingFields, TallerPricingBlock } from './TallerPricing'

// Diplomado
export { audienceFields, AudienceBlock } from './Audience'
export { curriculum16SemanasFields, Curriculum16SemanasBlock } from './Curriculum16Semanas'
export { howItWorksFields, HowItWorksBlock } from './HowItWorks'
export { diplomadoTeamFields, DiplomadoTeamBlock } from './DiplomadoTeam'
export { diplomadoBenefitsFields, DiplomadoBenefitsBlock } from './DiplomadoBenefits'
export { diplomadoPricingFields, DiplomadoPricingBlock } from './DiplomadoPricing'

// Reto
export { barraUrgenciaFields, BarraUrgenciaBlock } from './BarraUrgencia'
export { retoHeroFields, RetoHeroBlock } from './RetoHero'
export { razonNoEscalasFields, RazonNoEscalasBlock } from './RazonNoEscalas'
export { mentoraFields, MentoraBlock } from './Mentora'
export { agendaFields, AgendaBlock } from './Agenda'
export { comparacionFields, ComparacionBlock } from './Comparacion'
export { incluyeFields, IncluyeBlock } from './Incluye'
export { premiosFields, PremiosBlock } from './Premios'
export { retoPricingFields, RetoPricingBlock } from './RetoPricing'
export { ganadoresFields, GanadoresBlock } from './Ganadores'

// --- Imports locales solo para construir allBlocks[] (Pages.layout.blocks, Plan R02) ---
import { HeroBlock } from './Hero'
import { PricingBlock } from './Pricing'
import { CtaBannerBlock } from './CtaBanner'
import { FeatureGridBlock } from './FeatureGrid'
import { StatsBlock } from './Stats'
import { ProseBlock } from './Prose'
import { FaqRefBlock } from './FaqRef'
import { TestimonialRefBlock } from './TestimonialRef'
import { TeamGridRefBlock } from './TeamGridRef'
import { ProgramGridRefBlock } from './ProgramGridRef'
import { LogosRefBlock } from './LogosRef'

import { SectionHeaderBlock } from './SectionHeaderBlock'
import { RelatedLinksBlock } from './RelatedLinks'
import { HeroHomeBlock } from './HeroHome'
import { InstructorBlock } from './Instructor'
import { StickyCtaBlock } from './StickyCta'
import { HistoriaBlock } from './Historia'
import { FundadoraBlock } from './Fundadora'
import { MetodologiaBlock } from './Metodologia'
import { RetoGaleriaBlock } from './RetoGaleria'
import { TallerHeroBlock } from './TallerHero'
import { TallerIncluyeBlock } from './TallerIncluye'
import { TallerParaQuienBlock } from './TallerParaQuien'
import { TallerPricingBlock } from './TallerPricing'

import { AudienceBlock } from './Audience'
import { Curriculum16SemanasBlock } from './Curriculum16Semanas'
import { HowItWorksBlock } from './HowItWorks'
import { DiplomadoTeamBlock } from './DiplomadoTeam'
import { DiplomadoBenefitsBlock } from './DiplomadoBenefits'
import { DiplomadoPricingBlock } from './DiplomadoPricing'

import { BarraUrgenciaBlock } from './BarraUrgencia'
import { RetoHeroBlock } from './RetoHero'
import { RazonNoEscalasBlock } from './RazonNoEscalas'
import { MentoraBlock } from './Mentora'
import { AgendaBlock } from './Agenda'
import { ComparacionBlock } from './Comparacion'
import { IncluyeBlock } from './Incluye'
import { PremiosBlock } from './Premios'
import { RetoPricingBlock } from './RetoPricing'
import { GanadoresBlock } from './Ganadores'

/**
 * Todos los Block configs disponibles para Pages.layout.blocks (Plan R02):
 * 11 genéricos (14-02) + 29 bespoke (14-R01) = 40, sin slugs duplicados.
 */
export const allBlocks: Block[] = [
  // Genéricos
  HeroBlock,
  PricingBlock,
  CtaBannerBlock,
  FeatureGridBlock,
  StatsBlock,
  ProseBlock,
  FaqRefBlock,
  TestimonialRefBlock,
  TeamGridRefBlock,
  ProgramGridRefBlock,
  LogosRefBlock,
  // Bespoke: compartidos / home / quienes-somos / testimonios / taller
  SectionHeaderBlock,
  RelatedLinksBlock,
  HeroHomeBlock,
  InstructorBlock,
  StickyCtaBlock,
  HistoriaBlock,
  FundadoraBlock,
  MetodologiaBlock,
  RetoGaleriaBlock,
  TallerHeroBlock,
  TallerIncluyeBlock,
  TallerParaQuienBlock,
  TallerPricingBlock,
  // Bespoke: diplomado
  AudienceBlock,
  Curriculum16SemanasBlock,
  HowItWorksBlock,
  DiplomadoTeamBlock,
  DiplomadoBenefitsBlock,
  DiplomadoPricingBlock,
  // Bespoke: reto
  BarraUrgenciaBlock,
  RetoHeroBlock,
  RazonNoEscalasBlock,
  MentoraBlock,
  AgendaBlock,
  ComparacionBlock,
  IncluyeBlock,
  PremiosBlock,
  RetoPricingBlock,
  GanadoresBlock,
]
