import { Clock, BookOpen, Video, FolderOpen, Users } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Duraci\u00f3n flexible",
    description:
      "El diplomado se adapta a tu ritmo. Puedes completarlo entre 3 y 6 meses, pero tendr\u00e1s acceso completo al contenido durante 6 meses.",
  },
  {
    icon: BookOpen,
    title: "Aprendizaje estructurado y aplicable",
    description:
      "Cada m\u00f3dulo te lleva desde lo m\u00e1s b\u00e1sico hasta estrategias avanzadas, con lecciones que puedes aplicar en proyectos reales desde el inicio.",
  },
  {
    icon: Video,
    title: "Llamadas en vivo semanales",
    description:
      "Tendr\u00e1s 3 sesiones grupales a la semana con nuestros coaches SEO. Resolver\u00e1s dudas, recibir\u00e1s feedback y avanzar\u00e1s con claridad.",
  },
  {
    icon: FolderOpen,
    title: "Proyecto real para tu portafolio",
    description:
      "Culmina el diplomado aplicando todo lo aprendido en un proyecto SEO completo. Este ser\u00e1 tu mejor carta de presentaci\u00f3n.",
  },
  {
    icon: Users,
    title: "Comunidad activa que te acompa\u00f1a",
    description:
      "Forma parte de un grupo donde podr\u00e1s compartir tus avances, recibir apoyo y conectarte con otros que tambi\u00e9n est\u00e1n en el camino SEO.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-accent">
          {'C\u00f3mo funciona'}
        </div>

        <h2 className="max-w-3xl text-balance font-mono text-3xl font-bold text-foreground md:text-4xl">
          {'C\u00f3mo funciona el diplomado de cero a SEO?'}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-border bg-secondary p-6 ${
                i >= 3 ? "lg:col-span-1" : ""
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Quiero inscribirme ahora
          </a>
        </div>
      </div>
    </section>
  )
}
