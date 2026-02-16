import { CheckCircle2 } from "lucide-react"

const benefits = [
  {
    text: "Acceso a la plataforma Kajabi con todas las clases grabadas. Cada m\u00f3dulo se desbloquea a medida que avanzas y podr\u00e1s consultar el contenido durante 6 meses.",
    value: "$3.000",
  },
  {
    text: "Llamadas en vivo por zoom (sesiones grupales), 3 veces por semana, para resolver tus dudas.",
    value: "$2.000",
  },
  {
    text: "Soporte de los coaches y acompa\u00f1amiento 1:1 durante todo el proceso.",
    value: "$4.500",
  },
  {
    text: "Recursos pr\u00e1cticos y exclusivos que te facilitar\u00e1n el aprendizaje.",
    value: "$3.000",
  },
]

const extras = [
  "Comunidad privada donde compartes tus avances y aprendes junto a otros estudiantes.",
  "Grupo de LinkedIn de Especialistas SEO.",
  "Proyecto final para portafolio.",
  "Plantillas, brief y cuestionarios para ejercicios pr\u00e1cticos.",
  "Certificaci\u00f3n como Especialista SEO.",
]

export function Benefits() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-accent">
          Beneficios
        </div>

        <h2 className="max-w-3xl text-balance font-mono text-3xl font-bold text-foreground md:text-4xl">
          {'Qu\u00e9 recibes al inscribirte?'}
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Est&aacute;s a solo un clic de distancia de convertirte en un especialista
          SEO.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-secondary p-6"
            >
              <div className="mb-3 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                VALORADO EN {benefit.value}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-secondary p-8">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Tambi&eacute;n incluye:
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {extras.map((extra, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {extra}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
