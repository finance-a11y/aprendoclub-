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

/**
 * Registry blockType -> componente de render.
 *
 * Plan R03 registra los 10 bloques de referencia/primitivos. Los Planes
 * R04-R06 AÑADEN sus propias entradas a este mismo objeto (uno por bloque
 * bespoke: hero, pricing, featureGrid, y los ~29 bloques bespoke de
 * home/quienes-somos/diplomado/reto/taller) sin tocar las ya registradas
 * aquí. `RenderBlocks` tolera blockType ausente de este registry (ver
 * components/blocks/RenderBlocks.tsx), así que agregar entradas
 * incrementalmente en R04-R06 nunca rompe el build.
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
}
