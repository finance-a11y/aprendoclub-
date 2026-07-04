import { Users, Briefcase, Lightbulb } from "lucide-react"

export function Origin() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d1117] px-4 py-1.5 text-sm text-[#b8f60d]">
          Nuestra historia
        </div>

        <h2 className="max-w-3xl text-balance text-3xl font-bold text-white md:text-4xl">
          Una necesidad real. Una solución creada desde la experiencia.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#012fd8]/10">
              <Briefcase className="h-5 w-5 text-[#0495f1]" />
            </div>
            <p className="leading-relaxed text-gray-400">
              En 2022, nuestra fundadora Arianna Lupi, entonces gerente de una
              agencia SEO, no encontraba talento hispanohablante capacitado.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#b8f60d]/10">
              <Lightbulb className="h-5 w-5 text-[#b8f60d]" />
            </div>
            <p className="leading-relaxed text-gray-400">
              Su comunidad digital preguntaba cómo ella había logrado
              trabajar en SEO 100% remoto. Arianna conectó los puntos: había
              empresas que necesitaban especialistas y personas que querían aprender.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#012fd8]/10">
              <Users className="h-5 w-5 text-[#0495f1]" />
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
