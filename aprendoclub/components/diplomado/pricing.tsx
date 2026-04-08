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
    <section id="pricing" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-balance font-mono text-3xl font-bold text-foreground md:text-4xl">
            Tu inversi&oacute;n tiene opciones. Tu crecimiento un camino claro.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Elige la forma de pago que m&aacute;s te convenga y empieza tu formaci&oacute;n.
          </p>
        </div>

        {/* Single Especialista Card */}
        <div className="mx-auto mt-12 max-w-md">
          {/* Card with gradient border glow */}
          <div className="relative rounded-2xl p-[1px]">
            {/* Gradient glow border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/40 via-primary/30 to-accent/20 blur-[2px]" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/40 via-primary/30 to-accent/20" />

            <div className="relative rounded-2xl bg-card p-8">
              {/* Popular badge */}
              <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0l2.09 5.527L16 6.18l-4.364 3.89L12.944 16 8 12.616 3.056 16l1.308-5.93L0 6.18l5.91-.654z" />
                </svg>
                {'M\u00e1s popular'}
              </div>

              {/* Plan name */}
              <h3 className="text-2xl font-bold text-foreground">Especialista</h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-5xl font-bold text-foreground">$90</span>
                <span className="text-lg text-muted-foreground line-through">
                  $150
                </span>
                <span className="text-lg text-muted-foreground">/mes</span>
              </div>

              {/* Description */}
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Para quienes quieren dominar SEO con el diplomado completo,
                sesiones semanales y ruta profesional.
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Features */}
              <ul className="flex flex-col gap-4">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm text-muted-foreground">
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
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Elegir Especialista
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mx-auto mt-10 max-w-lg text-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-6 py-4">
            <Shield className="h-5 w-5 text-accent" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {'Si por alguna raz\u00f3n no es lo que esperabas, tienes '}
              <span className="font-semibold text-foreground">7 d&iacute;as</span>
              {' desde tu compra para pedir la devoluci\u00f3n total de tu dinero. Sin explicaciones.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
