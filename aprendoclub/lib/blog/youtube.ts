const ID_RE = /^[A-Za-z0-9_-]{11}$/

/**
 * Extrae el ID de 11 caracteres de una URL de YouTube (watch, youtu.be, embed,
 * shorts, live) o de un ID suelto. Devuelve null si no reconoce el formato.
 */
export function parseYoutubeId(input?: string | null): string | null {
  const raw = (input ?? '').trim()
  if (!raw) return null
  if (ID_RE.test(raw)) return raw

  let url: URL
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
  } catch {
    return null
  }

  const host = url.hostname.replace(/^(www|m|music)\./, '')
  let id: string | null = null
  if (host === 'youtu.be') {
    id = url.pathname.split('/')[1] ?? null
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const [, kind, value] = url.pathname.split('/')
    if (kind === 'watch') id = url.searchParams.get('v')
    else if (['embed', 'shorts', 'live', 'v'].includes(kind)) id = value ?? null
  }
  return id && ID_RE.test(id) ? id : null
}

export type YoutubeThumbQuality = 'maxresdefault' | 'hqdefault'

export function youtubeThumbnail(id: string, quality: YoutubeThumbQuality = 'maxresdefault'): string {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
}

/** Validador para campos de Payload: vacío es válido (campo opcional). */
export function validateYoutubeUrl(value?: string | null): true | string {
  if (!value || !value.trim()) return true
  return parseYoutubeId(value)
    ? true
    : 'URL de YouTube no válida. Usa un enlace como https://www.youtube.com/watch?v=… o https://www.youtube.com/shorts/…'
}
