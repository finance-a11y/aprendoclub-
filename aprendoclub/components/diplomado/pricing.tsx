import { CheckCircle2, ArrowRight, Shield } from "lucide-react"

const features = [
  "Todo lo de Aprendiz",
  "Diplomado CERO A SEO completo",
  "3 sesiones semanales",
  "Proyectos aplicados reales",
  "Ruta profesional guiada",
  "Plantillas, frameworks, SOPs",
  "Comunidad privada profesional",
]

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-[72px] py-20 md:py-28">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">
            Tu inversión tiene opciones. Tu crecimiento un camino claro.
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Elige la forma de pago que más te convenga y empieza tu formación.
          </p>
        </div>

        {/* Single Especialista Card */}
        <div className="mx-auto mt-12 max-w-md">
          {/* Card with gradient border glow */}
          <div className="relative rounded-2xl p-[1px]">
            {/* Gradient glow border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#b8f60d]/40 via-[#012fd8]/30 to-[#b8f60d]/20 blur-[2px]" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#b8f60d]/40 via-[#012fd8]/30 to-[#b8f60d]/20" />

            <div className="relative rounded-2xl bg-[#0d1117] p-8">
              {/* Popular badge */}
              <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#b8f60d] px-4 py-1.5 text-sm font-semibold text-black">
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0l2.09 5.527L16 6.18l-4.364 3.89L12.944 16 8 12.616 3.056 16l1.308-5.93L0 6.18l5.91-.654z" />
                </svg>
                {'Más popular'}
              </div>

              {/* Plan name */}
              <h3 className="text-2xl font-bold text-white">Especialista</h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-5xl font-bold text-white">$90</span>
                <span className="text-lg text-gray-400 line-through">
                  $150
                </span>
                <span className="text-lg text-gray-400">/mes</span>
              </div>

              {/* Description */}
              <p className="mt-6 leading-relaxed text-gray-400">
                Para quienes quieren dominar SEO con el diplomado completo,
                sesiones semanales y ruta profesional.
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-white/10" />

              {/* Features */}
              <ul className="flex flex-col gap-4">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#b8f60d]" />
                    <span className="text-sm text-gray-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b8f60d] py-4 text-base font-semibold text-black transition-all hover:brightness-110"
              >
                Elegir Especialista
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mx-auto mt-10 max-w-lg text-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0d1117] px-6 py-4">
            <Shield className="h-5 w-5 text-[#b8f60d]" />
            <p className="text-sm leading-relaxed text-gray-400">
              {'Si por alguna razón no es lo que esperabas, tienes '}
              <span className="font-semibold text-white">7 días</span>
              {' desde tu compra para pedir la devolución total de tu dinero. Sin explicaciones.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
