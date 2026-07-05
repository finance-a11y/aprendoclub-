import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'

/**
 * Cliente Payload memoizado por request (React cache()).
 *
 * Evita re-instanciar/re-fetchear Payload cuando el layout y una página piden
 * datos en el mismo render (p.ej. site-settings + programas en el shell).
 * `cache()` de React deduplica la llamada dentro del mismo request server;
 * no persiste entre requests distintos.
 */
export const getPayloadClient = cache(async () => {
  return getPayload({ config })
})
