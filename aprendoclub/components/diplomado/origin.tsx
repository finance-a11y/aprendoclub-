import { Users, Briefcase, Lightbulb } from "lucide-react"
import { Eyebrow } from "@/components/ui/eyebrow"

export function Origin() {
  return (
    <section className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="mb-4">
          <Eyebrow>Nuestra historia</Eyebrow>
        </div>

        <h2 className="max-w-3xl text-balance text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          Una necesidad real. Una solución creada desde la experiencia.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10">
              <Briefcase className="h-5 w-5 text-[var(--primary-light)]" />
            </div>
            <p className="leading-relaxed text-gray-400">
              En 2022, nuestra fundadora Arianna Lupi, entonces gerente de una
              agencia SEO, no encontraba talento hispanohablante capacitado.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10">
              <Lightbulb className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <p className="leading-relaxed text-gray-400">
              Su comunidad digital preguntaba cómo ella había logrado
              trabajar en SEO 100% remoto. Arianna conectó los puntos: había
              empresas que necesitaban especialistas y personas que querían aprender.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10">
              <Users className="h-5 w-5 text-[var(--primary-light)]" />
            </div>
            <p className="leading-relaxed text-gray-400">
              Así nació aprendoclub, la primera academia especializada en
              SEO para el mercado hispano. Hoy, más de 750 personas se han
              formado con nosotros.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
