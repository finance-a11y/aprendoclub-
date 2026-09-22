import { GraduationCap, Award, Trophy, CheckCircle, ExternalLink } from 'lucide-react'

export interface CredentialItem {
  title: string
  issuer?: string
  date: string
  description: string
  credentialId?: string
  badge?: string
}

export interface AuthorCredentialsData {
  intro: string
  academic: CredentialItem[]
  certifications: CredentialItem[]
  awards: CredentialItem[]
}

export const ARIANNA_LUPI_CREDENTIALS: AuthorCredentialsData = {
  intro:
    'Todas las enseñanzas de aprendoclub están respaldadas por una sólida formación académica y certificaciones profesionales reconocidas a nivel internacional. El contenido se basa en estudios avanzados en ciencia de datos, analítica web y posicionamiento orgánico.',
  academic: [
    {
      title: 'M.S. in Data Science',
      date: 'Mayo 2022',
      badge: 'GPA 3.0',
      description:
        'Maestría enfocada en análisis de datos masivos, modelado estadístico y machine learning, permitiendo integrar análisis predictivo y ciencia de datos en estrategias de SEO basadas en datos.',
    },
    {
      title: 'B.B.A. in International Business',
      date: 'Mayo 2019',
      badge: 'GPA 3.7',
      description:
        'Grado universitario centrado en negocios globales, comercio internacional y estrategia empresarial, con énfasis en marketing digital y desarrollo de modelos de negocio online.',
    },
  ],
  certifications: [
    {
      title: 'Google Analytics Audit',
      issuer: 'CXL Institute',
      date: 'Junio 2020',
      description:
        'Certificación avanzada en auditoría de medición y rastreo en Google Analytics, enfocada en diagnosticar errores de configuración y optimizar la recolección de datos.',
    },
    {
      title: 'Google Analytics for Beginners',
      issuer: 'CXL Institute',
      date: 'Junio 2020',
      description:
        'Introducción práctica y estratégica al análisis de tráfico y comportamiento de usuarios.',
    },
    {
      title: 'Google Analytics for Beginners',
      issuer: 'Google',
      date: 'Febrero 2020',
      description:
        'Certificación oficial de Google para medir el rendimiento de sitios web, interpretar métricas y aplicar mejoras continuas.',
    },
    {
      title: 'Google Analytics Advanced',
      issuer: 'Google',
      date: 'Febrero 2020',
      description:
        'Certificación avanzada en configuración personalizada, segmentos, eventos y análisis de embudos de conversión.',
    },
    {
      title: 'Fundamentals of Digital Marketing',
      issuer: 'Google',
      date: 'Marzo 2019',
      credentialId: 'SP2CKRJNP',
      description:
        'Certificación integral en fundamentos de SEO, SEM, analítica web, email marketing y redes sociales.',
    },
  ],
  awards: [
    {
      title: 'Influencer Award',
      issuer: 'Marketing 2.0 Conference (USA)',
      date: 'Verano 2023',
      description:
        'Reconocimiento internacional otorgado en Estados Unidos por liderazgo en marketing digital e influencia positiva en la educación y divulgación del SEO en el mundo hispano.',
    },
  ],
}

export function AuthorCredentials({ credentials }: { credentials: AuthorCredentialsData }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {/* Intro callout */}
      <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6 md:p-8 text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)] mb-4">
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Metodología Respaldada & Verificable</span>
        </div>
        <p className="text-sm md:text-base leading-relaxed text-gray-300">
          {credentials.intro}
        </p>
      </div>

      <div className="space-y-12">
        {/* Formación Académica */}
        {credentials.academic.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--accent)]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Formación Académica
                </h2>
                <p className="text-xs text-gray-400">
                  Estudios superiores en ciencia de datos y negocios
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credentials.academic.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6 flex flex-col justify-between hover:border-white/20 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      {item.badge && (
                        <span className="shrink-0 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-3 font-mono">{item.date}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificaciones */}
        {credentials.certifications.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--accent)]">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Certificaciones Profesionales
                </h2>
                <p className="text-xs text-gray-400">
                  Analítica web, medición avanzada y marketing digital
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {credentials.certifications.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--border-card)] bg-[var(--surface-card)] p-5 flex flex-col justify-between hover:border-white/20 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                        {item.issuer}
                      </span>
                      <span className="text-[11px] text-gray-400">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {item.credentialId && (
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                      <span>ID Credencial:</span>
                      <span className="font-mono text-gray-300">{item.credentialId}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reconocimientos */}
        {credentials.awards.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--accent)]">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Reconocimientos de la Industria
                </h2>
                <p className="text-xs text-gray-400">
                  Premios internacionales por trayectoria e impacto en educación
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {credentials.awards.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--surface-card)] to-transparent p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                        {item.issuer}
                      </span>
                      <span className="text-xs text-gray-400">· {item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
