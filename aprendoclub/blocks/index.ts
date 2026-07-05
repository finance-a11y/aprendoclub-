// Barrel export: reusable field helpers + blocks for page globals (Phase 14 Planes 03-07).
// Import from this single entrypoint so no global re-defines the same fields.

export { linkFields, linkGroup } from '../fields/link'
export { sectionHeaderFields } from '../fields/sectionHeader'

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
