import { GraduationCap, Wrench, Award, DollarSign } from "lucide-react"
import { Eyebrow } from "@/components/ui/eyebrow"

const pillars = [
  {
    icon: GraduationCap,
    title: "Especialización",
    description: "Aprendes lo básico hasta lo avanzado, con foco 100% en SEO.",
  },
  {
    icon: Wrench,
    title: "Práctica aplicada",
    description: "Aplicas desde la semana 1 en un proyecto real.",
  },
  {
    icon: Award,
    title: "Autoridad digital",
    description: "Construyes tu presencia profesional con tu portafolio.",
  },
  {
    icon: DollarSign,
    title: "Monetización",
    description: "Atraes oportunidades, trabajes como freelance o en una empresa.",
  },
]

export function Methodology() {
  return (
    <section className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="mb-4">
          <Eyebrow>Metodología EPAM</Eyebrow>
        </div>

        <h2 className="max-w-3xl text-balance text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          Aprende SEO con nuestra metodología: EPAM
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
          El diplomado está diseñado para cualquier persona que quiera
          aprender SEO y aprovechar esta poderosa habilidad para transformar su
          carrera o negocio.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6 transition-colors hover:border-white/20"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                <pillar.icon className="h-6 w-6 text-[var(--primary-light)]" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
