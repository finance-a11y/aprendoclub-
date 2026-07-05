import type { Media } from '@/payload-types'

export type ResolvedMedia = {
  url: string
  alt: string
  width: number
  height: number
}

/**
 * Adapta el valor de un campo upload/relationship de Media (poblado a
 * depth>=1, o solo un id numérico cuando depth es 0, o null) a un shape
 * plano listo para next/image. Defensivo: nunca lanza, devuelve null si no
 * hay suficiente información (id sin poblar, sin url, etc.).
 */
export function resolveMedia(m?: number | Media | null): ResolvedMedia | null {
  if (!m || typeof m === 'number') return null
  if (!m.url) return null
  return {
    url: m.url,
    alt: m.alt ?? '',
    width: m.width ?? 0,
    height: m.height ?? 0,
  }
}

/** Variante hasMany de resolveMedia; filtra entradas no resolubles. */
export function resolveMediaList(arr?: (number | Media)[] | null): ResolvedMedia[] {
  if (!arr) return []
  return arr
    .map((m) => resolveMedia(m))
    .filter((m): m is ResolvedMedia => m !== null)
}
