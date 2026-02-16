import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary p-10 md:p-16">
          {/* Glow effects */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-[80px]" />

          <div className="relative text-center">
            <h2 className="mx-auto max-w-2xl text-balance font-mono text-3xl font-bold text-foreground md:text-4xl">
              No es magia, es SEO. Y t&uacute; lo puedes aprender.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Este diplomado es una ruta completa para transformar tu perfil
              profesional y aprender esta habilidad de alta demanda, desde cero,
              con resultados reales y acompa&ntilde;amiento de la comunidad de
              aprendoclub.
            </p>

            <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <p>
                Descubre como posicionar sitios web con estrategias que s&iacute;
                funcionan.
              </p>
              <p>
                Convi&eacute;rtete en especialista SEO, sin experiencia previa ni
                tecnicismos.
              </p>
              <p>
                Cientos de estudiantes ya comenzaron este camino. T&uacute;
                tambi&eacute;n puedes.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110"
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
