import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Eyebrow } from '@/components/ui/eyebrow'
import { JsonLd } from '@/components/json-ld'
import { GlosarioView } from '@/components/glosario/glosario-view'
import { BookOpen, Sparkles, Search } from 'lucide-react'

export const revalidate = 3600 // ISR de 1 hora o revalidación on-demand

export const metadata: Metadata = {
  title: 'Glosario SEO: Más de 70 Términos y Conceptos Explicados | aprendoCLUB',
  description:
    'Diccionario completo de conceptos, términos y herramientas de SEO e Inteligencia Artificial en español. Aprende qué significan EEAT, Canonicalización, Backlinks, Crawl Budget y más.',
  alternates: {
    canonical: 'https://www.aprendoclub.com/glosario',
  },
  openGraph: {
    title: 'Glosario SEO: Más de 70 Términos y Conceptos Explicados | aprendoCLUB',
    description:
      'Diccionario completo de conceptos, términos y herramientas de SEO e Inteligencia Artificial en español.',
    url: 'https://www.aprendoclub.com/glosario',
    type: 'website',
  },
}

export default async function GlosarioPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'glosario',
    limit: 500,
    sort: 'termino',
    depth: 0,
  })

  // Esquema semántico estructurado DefinedTermSet de Schema.org
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glosario SEO y Posicionamiento Web',
    description:
      'Diccionario completo de conceptos, términos y herramientas de SEO e Inteligencia Artificial en español.',
    url: 'https://www.aprendoclub.com/glosario',
    hasDefinedTerm: docs.map((d) => ({
      '@type': 'DefinedTerm',
      name: d.termino,
      description: d.definicion,
      termCode: d.slug,
      inDefinedTermSet: 'https://www.aprendoclub.com/glosario',
      url: `https://www.aprendoclub.com/glosario#${d.slug}`,
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="min-h-screen bg-[var(--bg-primary)] text-white pt-12 md:pt-16">
        {/* Cabecera / Hero del Glosario */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-8 md:pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recursos SEO & AIO • Diccionario Completo</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-4xl mx-auto leading-tight mb-6">
            Glosario SEO:{' '}
            <span className="text-[var(--accent)]">Conceptos Clave</span>{' '}
            Explicados Fácil
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
            La guía de terminología técnica, estratégica y analítica para entender el SEO moderno,
            los algoritmos de Google y la optimización para inteligencia artificial (AIO/GEO).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-white/60">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10">
              <BookOpen className="w-4 h-4 text-[var(--accent)]" />
              <span><strong>{docs.length}</strong> conceptos documentados</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10">
              <Search className="w-4 h-4 text-[var(--accent)]" />
              <span>Buscador y filtros en tiempo real</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block animate-pulse" />
              <span>Actualizado 2026</span>
            </div>
          </div>
        </header>

        {/* Componente Interactivo con Buscador y Filtros */}
        <GlosarioView
          terminos={docs.map((d) => ({
            id: d.id,
            termino: d.termino,
            slug: d.slug,
            definicion: d.definicion,
            letra: d.letra,
            categoria: d.categoria,
            destacado: d.destacado ?? false,
            ejemplo: d.ejemplo ?? undefined,
          }))}
        />
      </main>
    </>
  )
}
