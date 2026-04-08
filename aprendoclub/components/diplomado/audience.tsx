import { CheckCircle2 } from "lucide-react"

const profiles = [
  "No tienes experiencia previa y quieres aprender SEO desde cero.",
  "Eres profesional de marketing, comunicaci\u00f3n o contenidos y quieres especializarte.",
  "Tienes un negocio o marca personal que necesita visibilidad real en buscadores.",
  "Quieres trabajar remoto u ofrecer servicios SEO como freelancer.",
  "Buscas una habilidad pr\u00e1ctica, rentable y con demanda global.",
]

const doubts = [
  "Quiero aprender SEO, pero no s\u00e9 por d\u00f3nde empezar.",
  "Ya he comprado otros cursos... \u00bfY si este no me sirve?",
  "No s\u00e9 programar y la parte t\u00e9cnica tampoco la domino.",
  "\u00bfEsto servir\u00e1 si quiero trabajar remoto o mejorar mi negocio online?",
  "No creo que me contraten estando en Latinoam\u00e9rica y sin saber ingl\u00e9s.",
]

export function Audience() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-balance font-mono text-3xl font-bold text-foreground md:text-4xl">
          {'\u00bfEl diplomado de cero a SEO ser\u00e1 para m\u00ed?'}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          {'Desc\u00fabrelo ya mismo'}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Who it's for */}
          <div className="rounded-2xl border border-border bg-secondary p-8">
            <h3 className="mb-6 text-xl font-semibold text-foreground">
              {'Est\u00e1 pensado para ti si...'}
            </h3>
            <ul className="flex flex-col gap-4">
              {profiles.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common doubts */}
          <div className="rounded-2xl border border-border bg-secondary p-8">
            <h3 className="mb-6 text-xl font-semibold text-foreground">
              {'Tambi\u00e9n te has preguntado esto?'}
            </h3>
            <ul className="flex flex-col gap-4">
              {doubts.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-muted-foreground/30 text-xs text-muted-foreground">
                    ?
                  </span>
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-xl bg-card p-4 text-sm leading-relaxed text-muted-foreground">
              Nuestros estudiantes tambi&eacute;n comenzaron con estas dudas. Hoy,
              muchos aplican SEO en sus propios proyectos y en los de sus clientes,
              generando ingresos reales y posicionando negocios en buscadores.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
