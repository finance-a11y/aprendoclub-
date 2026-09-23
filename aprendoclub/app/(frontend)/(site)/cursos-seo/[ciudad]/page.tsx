import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import {
  MapPin,
  TrendingUp,
  Award,
  Sparkles,
  Laptop,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react'

import config from '@/payload.config'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/json-ld'

type Params = Promise<{ ciudad: string }>

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'ciudades-seo',
    limit: 100,
    depth: 0,
  })

  return docs.map((doc) => ({
    ciudad: doc.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { ciudad: ciudadSlug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'ciudades-seo',
    where: { slug: { equals: ciudadSlug } },
    limit: 1,
  })

  const ciudad = docs[0]
  if (!ciudad) return {}

  const title =
    ciudad.meta?.title ||
    `Curso de SEO en ${ciudad.nombre} | Diplomado Especialista en aprendoclub`
  const description =
    ciudad.meta?.description ||
    `Aprende SEO en ${ciudad.nombre}. Formación completa en posicionamiento web y optimización para ChatGPT y Gemini. 16 semanas con mentoría en vivo.`

  const canonicalUrl = `https://www.aprendoclub.com/cursos-seo/${ciudad.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'aprendoclub',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function CiudadPage({ params }: { params: Params }) {
  const { ciudad: ciudadSlug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'ciudades-seo',
    where: { slug: { equals: ciudadSlug } },
    limit: 1,
  })

  const ciudad = docs[0]
  if (!ciudad) {
    notFound()
  }

  const { docs: allCities } = await payload.find({
    collection: 'ciudades-seo',
    limit: 20,
    sort: 'nombre',
    depth: 0,
  })
  const otherCities = allCities.filter((c) => c.slug !== ciudadSlug)

  // Schema.org structured data (Course + FAQPage)
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Curso de SEO en ${ciudad.nombre} — Diplomado SEO + AIO`,
    description: `Aprende posicionamiento web profesional y optimización para motores de IA adaptado a estudiantes y profesionales ${ciudad.gentilicio || `en ${ciudad.nombre}`}.`,
    provider: {
      '@type': 'Organization',
      name: 'aprendoclub',
      url: 'https://www.aprendoclub.com',
    },
    offers: {
      '@type': 'Offer',
      price: '700',
      priceCurrency: 'USD',
      url: 'https://www.aprendoclub.com/programas/diplomado',
      availability: 'https://schema.org/InStock',
    },
    educationalCredentialAwarded: 'Certificación Oficial de Especialista en SEO + AIO',
    occupationalCategory: 'Especialista en Posicionamiento en Buscadores (SEO)',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'P16W',
    },
  }

  const faqSchema =
    Array.isArray(ciudad.faqs) && ciudad.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: ciudad.faqs.map((f) => ({
            '@type': 'Question',
            name: f.pregunta,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.respuesta,
            },
          })),
        }
      : null

  const structuredData = faqSchema ? [courseSchema, faqSchema] : [courseSchema]

  return (
    <div className="relative min-h-screen pb-24 text-white">
      <JsonLd data={structuredData} />

      {/* Breadcrumb nav */}
      <div className="mx-auto max-w-6xl px-4 pt-8 text-xs text-gray-400">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-gray-300">Cursos SEO</span>
          <span>/</span>
          <span className="text-[var(--accent)] font-medium">{ciudad.nombre}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>
              {ciudad.nombre}, {ciudad.pais}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <Eyebrow>Formación en Posicionamiento Web & IA</Eyebrow>
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Curso de SEO en <span className="text-[var(--accent)]">{ciudad.nombre}</span>: Domina
              Google y la IA
            </h1>
            <p className="max-w-2xl text-base text-gray-400 md:text-lg leading-relaxed">
              Conviértete en especialista en posicionamiento orgánico con el programa más completo y
              actualizado de habla hispana. 16 semanas de práctica guiada, tutorías en vivo y casos
              reales para impulsar tu perfil profesional {ciudad.gentilicio || `en ${ciudad.nombre}`}.
            </p>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <Laptop className="h-5 w-5 text-[var(--accent)] shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">100% Online en vivo</p>
                <p className="text-xs text-gray-400">Sin desplazamientos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <Award className="h-5 w-5 text-[var(--accent)] shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">Certificación Oficial</p>
                <p className="text-xs text-gray-400">Portafolio verificable</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <Sparkles className="h-5 w-5 text-[var(--accent)] shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">SEO + AIO / GEO</p>
                <p className="text-xs text-gray-400">ChatGPT, Gemini & Perplexity</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button href="/programas/diplomado" size="lg" className="w-full sm:w-auto">
              Ver el Diplomado SEO + AIO
            </Button>
            <Button
              href="/programas"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explorar todos los programas
            </Button>
          </div>
        </div>
      </section>

      {/* Salarios & Mercado Laboral */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">
                <TrendingUp className="h-4 w-4" />
                <span>Oportunidades y Empleabilidad</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                El mercado laboral de SEO {ciudad.gentilicio || `en ${ciudad.nombre}`}
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                {ciudad.salarioNota}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                <span>Formación orientada a inserción laboral y captación de clientes freelance.</span>
              </div>
            </div>

            {/* Salario highlight box */}
            <div className="w-full md:w-auto md:min-w-[280px] rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-6 text-center md:text-left">
              <p className="text-xs uppercase font-semibold text-gray-300 tracking-wide mb-1">
                Rango Salarial Estimado
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-[var(--accent)] mb-2">
                {ciudad.salarioPromedio}
              </p>
              <p className="text-xs text-gray-400">
                Datos de mercado según experiencia y modalidad ({ciudad.pais})
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programa Destacado */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>Nuestra Recomendación</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-2 text-white">
            Diplomado SEO + AIO: De cero a especialista en 16 semanas
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-4">
            Diseñado para personas que quieren cambiar de profesión o escalar sus ingresos en marketing digital desde {ciudad.nombre}, con acompañamiento humano real y casos prácticos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--accent)] mb-2">Módulo 1–4</p>
              <h3 className="text-lg font-bold text-white mb-2">Fundamentos y SEO Técnico</h3>
              <p className="text-sm text-gray-400">
                Rastreo, indexación, Core Web Vitals, arquitectura web y Search Console desde cero.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--accent)] mb-2">Módulo 5–8</p>
              <h3 className="text-lg font-bold text-white mb-2">Estrategia de Contenidos</h3>
              <p className="text-sm text-gray-400">
                Keyword research con Semrush/Ahrefs, intención de búsqueda y creación de clústeres temáticos.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--accent)] mb-2">Módulo 9–12</p>
              <h3 className="text-lg font-bold text-white mb-2">Link Building y Autoridad</h3>
              <p className="text-sm text-gray-400">
                Prospección de enlaces, relaciones públicas digitales y estrategias éticas de autoridad.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--accent)] mb-2">Módulo 13–16</p>
              <h3 className="text-lg font-bold text-white mb-2">IA & Optimización GEO</h3>
              <p className="text-sm text-gray-400">
                Aparecer en respuestas generativas de ChatGPT, Gemini y SearchGPT con auditoría final.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button href="/programas/diplomado" size="lg">
            Conocer el Diplomado completo <ArrowRight className="h-4 w-4 ml-1 inline" />
          </Button>
        </div>
      </section>

      {/* FAQs Locales */}
      {Array.isArray(ciudad.faqs) && ciudad.faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-10">
            <Eyebrow>Preguntas Frecuentes</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
              Dudas comunes sobre el curso {ciudad.gentilicio || `en ${ciudad.nombre}`}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {ciudad.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 open:bg-white/[0.04]"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-white list-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[var(--accent)] shrink-0" />
                    <span>{faq.pregunta}</span>
                  </div>
                  <span className="transition-transform duration-200 group-open:rotate-180 text-gray-400">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-300 leading-relaxed pl-8">
                  {faq.respuesta}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Cursos SEO en otras ciudades (Interlinking Mesh) */}
      {otherCities.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
              <MapPin className="h-4 w-4" />
              <span>Presencia y Formación Global</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Cursos de SEO en otras ciudades
            </h2>
            <p className="text-sm text-gray-400 mb-6 max-w-2xl leading-relaxed">
              Nuestra formación en posicionamiento web y optimización para IA es 100% online con mentoría en directo, adaptada a estudiantes y empresas de habla hispana en:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {otherCities.map((other) => (
                <Link
                  key={other.slug}
                  href={`/cursos-seo/${other.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-gray-300 transition-colors hover:border-[var(--accent)] hover:text-white hover:bg-[var(--accent)]/10"
                >
                  <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>{other.nombre}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner CTA Final */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="rounded-2xl border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent)]/15 via-transparent to-[var(--accent)]/10 p-10 md:p-16 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white max-w-2xl">
            Comienza hoy tu formación como especialista SEO desde {ciudad.nombre}
          </h2>
          <p className="text-gray-300 max-w-xl text-sm md:text-base">
            Únete a la próxima edición del Diplomado SEO + AIO con grupos reducidos y coaching en directo.
          </p>
          <Button href="/programas/diplomado" size="lg">
            Inscribirme al Diplomado
          </Button>
        </div>
      </section>
    </div>
  )
}
