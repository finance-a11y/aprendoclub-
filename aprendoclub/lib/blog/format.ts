import type { Author, Blogpost, Category, Media } from '@/payload-types'
import { parseYoutubeId, youtubeThumbnail } from '@/lib/blog/youtube'

type Upload = number | Media | null | undefined

/** URL de un campo upload (Media) resuelto a depth>=1, o null. */
export function mediaUrl(m: Upload): string | null {
  return m && typeof m === 'object' && 'url' in m ? (m.url ?? null) : null
}

export function mediaAlt(m: Upload, fallback = ''): string {
  return m && typeof m === 'object' && 'alt' in m ? (m.alt ?? fallback) : fallback
}

export function categoryOf(post: Blogpost): Category | null {
  return typeof post.category === 'object' ? post.category : null
}

export function authorOf(post: Blogpost): Author | null {
  return typeof post.author === 'object' ? post.author : null
}

/** "8 de diciembre de 2025" (es-ES) o cadena vacía. */
export function formatDate(iso?: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Ruta del post: /{categoria}/{slug}. */
export function postHref(post: Blogpost): string {
  const cat = categoryOf(post)
  return `/${cat?.slug ?? 'blog'}/${post.slug}`
}

/**
 * Imagen principal del post: la imagen destacada si existe (sobrescribe), luego
 * la miniatura del video guardada en Media y, como último recurso, la remota
 * de YouTube. `null` si no hay ninguna.
 */
export function postHero(
  post: Blogpost,
  quality: 'maxresdefault' | 'hqdefault' = 'maxresdefault',
): { url: string; alt: string; fromVideo: boolean; videoId?: string } | null {
  const url = mediaUrl(post.heroImage)
  if (url) return { url, alt: mediaAlt(post.heroImage, post.title), fromVideo: false }
  const stored = mediaUrl(post.videoThumbnail)
  if (stored) return { url: stored, alt: post.title, fromVideo: false }
  const videoId = parseYoutubeId(post.videoUrl)
  if (!videoId) return null
  return { url: youtubeThumbnail(videoId, quality), alt: post.title, fromVideo: true, videoId }
}
