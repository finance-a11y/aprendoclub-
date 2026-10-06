'use client'

import { useState } from 'react'

import { youtubeThumbnail } from '@/lib/blog/youtube'

/** Hero con la miniatura del video; cae a `hqdefault` si no existe la maxres. */
export function VideoHeroImage({ videoId, alt }: { videoId: string; alt: string }) {
  const [src, setSrc] = useState(youtubeThumbnail(videoId, 'maxresdefault'))
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      fetchPriority="high"
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= 120) setSrc(youtubeThumbnail(videoId, 'hqdefault'))
      }}
      onError={() => setSrc(youtubeThumbnail(videoId, 'hqdefault'))}
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

export default VideoHeroImage
