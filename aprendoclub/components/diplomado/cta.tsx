import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1117] p-10 md:p-16">
          {/* Glow effects */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#012fd8]/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#b8f60d]/10 blur-[80px]" />

          <div className="relative text-center">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold text-white md:text-4xl">
              No es magia, es SEO. Y tú lo puedes aprender.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-gray-400">
              Este diplomado es una ruta completa para transformar tu perfil
              profesional y aprender esta habilidad de alta demanda, desde cero,
              con resultados reales y acompañamiento de la comunidad de
              aprendoclub.
            </p>

            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400">
              <p>
                Descubre cómo posicionar sitios web con estrategias que sí
                funcionan.
              </p>
              <p>
                Conviértete en especialista SEO, sin experiencia previa ni
                tecnicismos.
              </p>
              <p>
                Cientos de estudiantes ya comenzaron este camino. Tú
                también puedes.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#b8f60d] px-8 py-4 text-base font-semibold text-black transition-all hover:brightness-110"
              >
                Quiero aprender SEO
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
