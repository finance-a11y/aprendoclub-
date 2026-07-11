'use client'

import { Info } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import type { CSSProperties } from 'react'

/**
 * Capa de resolución de íconos sobre el set completo de lucide-react
 * (dynamicIconImports, 1914 entradas, keys kebab-case — la convención
 * canónica documentada en lucide.dev).
 *
 * `normalizeIconName` es la capa de compatibilidad con los strings legacy ya
 * sembrados en la DB (camelCase de un mapa manual viejo, o PascalCase de los
 * seed-data del diplomado): normaliza cualquier estilo a kebab-case antes de
 * resolver, evitando así una migración de datos.
 *
 * `LucideIcon` es un client component (usa `DynamicIcon` de
 * `lucide-react/dynamic`, que resuelve y carga el ícono bajo demanda de
 * forma síncrona vía React.lazy/Suspense internamente — sin async). Si la
 * key no existe, cae a un ícono neutro (`Info`) sin romper el render.
 *
 * IMPORTANTE: no volver a esta capa async (`await import(...)`) — un
 * Server Component async no puede renderizarse desde un Client Component
 * (Next.js App Router), y los dos consumidores actuales (FeatureGrid.tsx,
 * HowItWorks.tsx) son 'use client' desde que sumaron BlurFade/useInView
 * (Phases 23/25). Esa combinación causó React error #482 en producción.
 */

/**
 * Convierte cualquier estilo de nombre de ícono (camelCase, PascalCase,
 * kebab-case) a kebab-case canónico de lucide.
 *
 * Idempotente: aplicar sobre un string ya kebab-case lo deja intacto.
 */
export function normalizeIconName(name?: string | null): string | null {
  if (!name) return null
  if (name in dynamicIconImports) return name // ya es una key canónica, no normalizar
  return name
    // Inserta guion antes de un grupo de dígitos, salvo que la letra previa
    // ya esté precedida por un dígito (evita partir compuestos tipo "2x2"
    // o "3d" en un segundo salto letra→dígito).
    .replace(/(?<!\d)([a-zA-Z])([0-9]+)/g, '$1-$2')
    // Inserta guion en transiciones minúscula→mayúscula (camelCase/PascalCase
    // estándar); no incluye dígitos aquí para no partir compuestos tipo "2X2".
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Client component que resuelve `name` contra el set completo de lucide
 * vía `DynamicIcon` (carga bajo demanda, sin await). Cae a `Info` si `name`
 * es vacío o no matchea ninguna key.
 */
export function LucideIcon({
  name,
  className,
  style,
}: {
  name?: string | null
  className?: string
  style?: CSSProperties
}) {
  const key = normalizeIconName(name)

  if (key && key in dynamicIconImports) {
    return (
      <DynamicIcon
        name={key as keyof typeof dynamicIconImports}
        className={className}
        style={style}
      />
    )
  }

  return <Info className={className} style={style} />
}
