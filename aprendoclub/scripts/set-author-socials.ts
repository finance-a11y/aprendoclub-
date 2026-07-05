import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * Setea las redes sociales de los autores (idempotente, upsert por slug de
 * autor). `payload run`. Editable luego desde /admin.
 */
const SOCIALS: Record<string, { platform: string; url: string }[]> = {
  'arianna-lupi': [
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/ariannalupi' },
    { platform: 'instagram', url: 'https://www.instagram.com/ariannalupi/' },
    { platform: 'website', url: 'https://ariannalupi.com' },
  ],
  'juan-angulo': [
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/juancangulo/' },
    { platform: 'website', url: 'https://juan-tech.com' },
  ],
}

async function run() {
  const payload = await getPayload({ config })
  for (const [slug, socials] of Object.entries(SOCIALS)) {
    const { docs } = await payload.find({
      collection: 'authors',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (!docs.length) {
      console.warn(`[socials] autor no encontrado: ${slug}`)
      continue
    }
    await payload.update({
      collection: 'authors',
      id: docs[0].id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { socials } as any,
      context: { disableRevalidate: true },
    })
    console.log(`[socials] ${slug}: ${socials.length} redes`)
  }
  process.exit(0)
}

await run()
