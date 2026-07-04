import { GraduationCap, Wrench, Award, DollarSign } from "lucide-react"

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
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d1117] px-4 py-1.5 text-sm text-[#b8f60d]">
          Metodología EPAM
        </div>

        <h2 className="max-w-3xl text-balance text-3xl font-bold text-white md:text-4xl">
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
              className="group rounded-2xl border border-white/10 bg-[#0d1117] p-6 transition-colors hover:border-[#b8f60d]/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#012fd8]/10 transition-colors group-hover:bg-[#b8f60d]/10">
                <pillar.icon className="h-6 w-6 text-[#0495f1] transition-colors group-hover:text-[#b8f60d]" />
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
