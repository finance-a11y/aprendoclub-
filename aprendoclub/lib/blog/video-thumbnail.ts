import type { CollectionBeforeChangeHook } from 'payload'
import sharp from 'sharp'

import { parseYoutubeId, youtubeThumbnail } from './youtube'

async function download(id: string): Promise<Buffer | null> {
  for (const quality of ['maxresdefault', 'hqdefault'] as const) {
    try {
      const res = await fetch(youtubeThumbnail(id, quality), { signal: AbortSignal.timeout(8000) })
      if (res.ok) return Buffer.from(await res.arrayBuffer())
    } catch {
      // intenta la siguiente calidad
    }
  }
  return null
}

/**
 * Al guardar un post con `videoUrl`, descarga la miniatura de YouTube, la
 * convierte a WebP 16:9 liviano y la sube a Media (`videoThumbnail`). Así el
 * hero sale del mismo CDN que el resto de portadas, sin depender de i.ytimg.com
 * ni cargar 100KB+ de un tercero. Si algo falla, el post se guarda igual y el
 * frontend cae a la miniatura remota.
 */
export const videoThumbnailHook: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  const url = data.videoUrl !== undefined ? data.videoUrl : originalDoc?.videoUrl
  const id = parseYoutubeId(url)
  if (!id) {
    data.videoThumbnail = null
    return data
  }

  const unchanged = id === parseYoutubeId(originalDoc?.videoUrl)
  const current = data.videoThumbnail !== undefined ? data.videoThumbnail : originalDoc?.videoThumbnail
  if (unchanged && current) return data

  try {
    const raw = await download(id)
    if (!raw) throw new Error('no se pudo descargar la miniatura')
    const out = await sharp(raw)
      .resize(1280, 720, { fit: 'cover' })
      .webp({ quality: 74 })
      .toBuffer()
    const media = await req.payload.create({
      collection: 'media',
      data: { alt: data.title ?? originalDoc?.title ?? 'Miniatura del video' },
      file: { data: out, mimetype: 'image/webp', name: `video-${id}.webp`, size: out.length },
      req,
    })
    data.videoThumbnail = media.id
  } catch (err) {
    req.payload.logger.warn(`[blogposts] miniatura de video no generada (${id}): ${String(err)}`)
  }
  return data
}
