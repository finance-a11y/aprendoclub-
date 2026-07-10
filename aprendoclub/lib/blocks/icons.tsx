import { Info } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

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
 * `LucideIcon` es un React Server Component async: resuelve la key
 * normalizada contra `dynamicIconImports` y carga el ícono bajo demanda. Si
 * la key no existe (o el import falla), cae a un ícono neutro (`Info`) sin
 * romper el render.
 */

/**
 * Convierte cualquier estilo de nombre de ícono (camelCase, PascalCase,
 * kebab-case) a kebab-case canónico de lucide.
 *
 * Idempotente: aplicar sobre un string ya kebab-case lo deja intacto.
 */
export function normalizeIconName(name?: string | null): string | null {
  if (!name) return null
  return name
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Componente server (RSC async) que resuelve `name` contra el set completo
 * de lucide vía `dynamicIconImports` y renderiza el ícono correspondiente.
 * Cae a `Info` si `name` es vacío, no matchea ninguna key, o el import
 * dinámico falla.
 */
export async function LucideIcon({
  name,
  className,
}: {
  name?: string | null
  className?: string
}) {
  const key = normalizeIconName(name)

  if (key && key in dynamicIconImports) {
    try {
      const mod = await dynamicIconImports[key as keyof typeof dynamicIconImports]()
      const Cmp = mod.default
      return <Cmp className={className} />
    } catch {
      // Import dinámico falló (chunk inexistente/roto): cae al fallback.
    }
  }

  return <Info className={className} />
}
