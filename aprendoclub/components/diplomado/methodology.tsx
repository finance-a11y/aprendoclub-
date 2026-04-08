import { GraduationCap, Wrench, Award, DollarSign } from "lucide-react"

const pillars = [
  {
    icon: GraduationCap,
    title: "Especializaci\u00f3n",
    description: "Aprendes lo b\u00e1sico hasta lo avanzado, con foco 100% en SEO.",
  },
  {
    icon: Wrench,
    title: "Pr\u00e1ctica aplicada",
    description: "Aplicas desde la semana 1 en un proyecto real.",
  },
  {
    icon: Award,
    title: "Autoridad digital",
    description: "Construyes tu presencia profesional con tu portafolio.",
  },
  {
    icon: DollarSign,
    title: "Monetizaci\u00f3n",
    description: "Atraes oportunidades, trabajes como freelance o en una empresa.",
  },
]

export function Methodology() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-accent">
          Metodolog&iacute;a EPAM
        </div>

        <h2 className="max-w-3xl text-balance font-mono text-3xl font-bold text-foreground md:text-4xl">
          Aprende SEO con nuestra metodolog&iacute;a: EPAM
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          El diplomado est&aacute; dise&ntilde;ado para cualquier persona que quiera
          aprender SEO y aprovechar esta poderosa habilidad para transformar su
          carrera o negocio.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-secondary p-6 transition-colors hover:border-accent/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-accent/10">
                <pillar.icon className="h-6 w-6 text-primary transition-colors group-hover:text-accent" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
