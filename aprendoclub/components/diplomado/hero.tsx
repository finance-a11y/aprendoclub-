import { ArrowRight, MessageCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Gradient background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-[#4338f5]/10 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0">
        <div className="h-[400px] w-[400px] rounded-full bg-[#b8ff2b]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Diplomado de Cero a SEO
        </div>

        <h1 className="mx-auto max-w-4xl text-balance font-mono text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {'Convi\u00e9rtete en especialista SEO, '}
          <span className="text-accent">sin experiencia previa</span>
          {' ni tecnicismos'}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Aprende a posicionar sitios web en 6 meses, paso a paso, con una
          metodolog&iacute;a clara y accesible, clases grabadas, pr&aacute;cticas reales y un
          equipo que te guiar&aacute; en cada etapa.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://diplomado.aprendoseo.com/offers/hh75Pypz/checkout"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Quiero aprender SEO
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://calendar.app.google/pRxa4Jd24YZMhVNE7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-border"
          >
            <MessageCircle className="h-4 w-4" />
            Agendar llamada
          </a>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Aclaremos tus dudas juntos
        </p>
      </div>
    </section>
  )
}
