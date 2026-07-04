import { Clock, BookOpen, Video, FolderOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Clock,
    title: "Duración flexible",
    description:
      "El diplomado se adapta a tu ritmo. Puedes completarlo entre 3 y 6 meses, pero tendrás acceso completo al contenido durante 6 meses.",
  },
  {
    icon: BookOpen,
    title: "Aprendizaje estructurado y aplicable",
    description:
      "Cada módulo te lleva desde lo más básico hasta estrategias avanzadas, con lecciones que puedes aplicar en proyectos reales desde el inicio.",
  },
  {
    icon: Video,
    title: "Llamadas en vivo semanales",
    description:
      "Tendrás 3 sesiones grupales a la semana con nuestros coaches SEO. Resolverás dudas, recibirás feedback y avanzarás con claridad.",
  },
  {
    icon: FolderOpen,
    title: "Proyecto real para tu portafolio",
    description:
      "Culmina el diplomado aplicando todo lo aprendido en un proyecto SEO completo. Este será tu mejor carta de presentación.",
  },
  {
    icon: Users,
    title: "Comunidad activa que te acompaña",
    description:
      "Forma parte de un grupo donde podrás compartir tus avances, recibir apoyo y conectarte con otros que también están en el camino SEO.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--surface-card)] px-4 py-1.5 text-sm text-[var(--accent)]">
          {'Cómo funciona'}
        </div>

        <h2 className="max-w-3xl text-balance text-3xl font-semibold text-white md:text-4xl">
          {'¿Cómo funciona el diplomado de cero a SEO?'}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6 ${
                i >= 3 ? "lg:col-span-1" : ""
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                <feature.icon className="h-6 w-6 text-[var(--primary-light)]" />
              </div>
              <h3 className="mb-2 font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            href="https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
          >
            Quiero inscribirme ahora
          </Button>
        </div>
      </div>
    </section>
  )
}
