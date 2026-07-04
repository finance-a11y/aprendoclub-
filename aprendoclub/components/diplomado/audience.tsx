import { CheckCircle2 } from "lucide-react"

const profiles = [
  "No tienes experiencia previa y quieres aprender SEO desde cero.",
  "Eres profesional de marketing, comunicación o contenidos y quieres especializarte.",
  "Tienes un negocio o marca personal que necesita visibilidad real en buscadores.",
  "Quieres trabajar remoto u ofrecer servicios SEO como freelancer.",
  "Buscas una habilidad práctica, rentable y con demanda global.",
]

const doubts = [
  "Quiero aprender SEO, pero no sé por dónde empezar.",
  "Ya he comprado otros cursos... ¿Y si este no me sirve?",
  "No sé programar y la parte técnica tampoco la domino.",
  "¿Esto servirá si quiero trabajar remoto o mejorar mi negocio online?",
  "No creo que me contraten estando en Latinoamérica y sin saber inglés.",
]

export function Audience() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl container-padding">
        <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
          {'¿El diplomado de cero a SEO será para mí?'}
        </h2>
        <p className="mt-3 text-lg text-gray-400">
          {'Descúbrelo ya mismo'}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Who it's for */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-8">
            <h3 className="mb-6 text-xl font-semibold text-white">
              {'Está pensado para ti si...'}
            </h3>
            <ul className="flex flex-col gap-4">
              {profiles.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#b8f60d]" />
                  <span className="leading-relaxed text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common doubts */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-8">
            <h3 className="mb-6 text-xl font-semibold text-white">
              {'¿También te has preguntado esto?'}
            </h3>
            <ul className="flex flex-col gap-4">
              {doubts.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs text-gray-400">
                    ?
                  </span>
                  <span className="leading-relaxed text-gray-400">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-xl bg-[var(--bg-secondary)] p-4 text-sm leading-relaxed text-gray-400">
              Nuestros estudiantes también comenzaron con estas dudas. Hoy,
              muchos aplican SEO en sus propios proyectos y en los de sus clientes,
              generando ingresos reales y posicionando negocios en buscadores.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
