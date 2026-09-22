import Link from 'next/link'
import {
  Compass,
  ArrowRight,
  Home,
  GraduationCap,
  BookOpen,
  HelpCircle,
  Mail,
  Sparkles,
  Search,
} from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Programas Formativos',
      description: 'Diplomado, Talleres prácticos y Cursos en SEO e IA.',
      href: '/programas',
      icon: GraduationCap,
      badge: 'Formación',
    },
    {
      title: 'Blog de Posicionamiento',
      description: 'Guías paso a paso, estrategias y análisis de algoritmos.',
      href: '/blog',
      icon: BookOpen,
      badge: 'Artículos',
    },
    {
      title: 'Glosario SEO & AIO',
      description: 'Más de 70 conceptos técnicos y definiciones explicadas.',
      href: '/glosario',
      icon: HelpCircle,
      badge: 'Recurso',
    },
    {
      title: 'Atención y Contacto',
      description: '¿Buscabas algo específico o necesitas ayuda directa?',
      href: '/contacto',
      icon: Mail,
      badge: 'Soporte',
    },
  ]

  return (
    <main className="min-h-[85vh] bg-[var(--bg-primary)] text-white flex flex-col justify-center py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Gráfico decorativo de 404 / Radar SEO */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute -inset-4 bg-[var(--accent)]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#0d1117] border border-white/10 flex items-center justify-center shadow-2xl">
            <Compass className="w-12 h-12 text-[var(--accent)] animate-pulse" />
          </div>
        </div>

        {/* Badge / Eyebrow */}
        <div className="flex justify-center mb-4">
          <Eyebrow>ERROR 404 • ESTADO HTTP NO ENCONTRADO</Eyebrow>
        </div>

        {/* Titular Principal Brandeado */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight">
          Parece que esta página{' '}
          <span className="text-[var(--accent)]">no indexa</span> en nuestro mapa
        </h1>

        {/* Copy descriptivo SEO */}
        <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
          La URL que intentas visitar no existe, ha cambiado de dirección o fue eliminada en nuestra última
          migración. Pero no te preocupes: el tráfico de calidad siempre encuentra su ruta.
        </p>

        {/* Botones de Acción Primaria */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button href="/" variant="primary" icon>
            Volver al Inicio
          </Button>
          <Button href="/programas" variant="secondary">
            Ver Programas Formativos
          </Button>
        </div>

        {/* Destinos recomendados (Tarjetas) */}
        <div className="text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              ¿Buscabas alguno de estos destinos?
            </h2>
            <span className="text-xs text-[var(--accent)] font-medium">Enlaces útiles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative p-5 rounded-xl bg-[#0d1117] border border-white/10 hover:border-[var(--accent)]/40 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] shrink-0 group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white group-hover:text-[var(--accent)] transition-colors truncate">
                        {item.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all self-center" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
