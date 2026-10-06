'use client'

import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

/**
 * Embed de YouTube "lite": solo carga miniatura + botón; el iframe (y sus
 * ~500KB de JS de YouTube) se monta al pulsar play. Dominio no-cookie.
 */
export function YoutubeFacade({
  videoId,
  title,
  vertical = false,
}: {
  videoId: string
  title: string
  vertical?: boolean
}) {
  return (
    <div
      // La CSS de la librería fija aspect-ratio 16/9 e ignora los props aspect*.
      className={`overflow-hidden rounded-2xl bg-black ${vertical ? '[&_.yt-lite]:!aspect-[9/16]' : ''}`}
    >
      <LiteYouTubeEmbed
        id={videoId}
        title={title}
        noCookie
        announce="Reproducir"
        lazyLoad
        poster="hqdefault"
        aspectWidth={vertical ? 9 : 16}
        aspectHeight={vertical ? 16 : 9}
        params="rel=0"
      />
    </div>
  )
}

export default YoutubeFacade
