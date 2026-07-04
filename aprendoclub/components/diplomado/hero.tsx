import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Gradient background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-[var(--primary)]/10 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0">
        <div className="h-[400px] w-[400px] rounded-full bg-[var(--accent)]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl container-padding text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--surface-card)] px-4 py-1.5 text-sm text-gray-400">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
          Diplomado de Cero a SEO
        </div>

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          {'Conviértete en especialista SEO, '}
          <span className="text-[var(--accent)]">sin experiencia previa</span>
          {' ni tecnicismos'}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-gray-400 md:text-xl">
          Aprende a posicionar sitios web en 6 meses, paso a paso, con una
          metodología clara y accesible, clases grabadas, prácticas reales y un
          equipo que te guiará en cada etapa.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="https://diplomado.aprendoseo.com/offers/Z2hKbUch/checkout"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            icon
          >
            Quiero aprender SEO
          </Button>
          <Button
            href="https://calendar.app.google/pRxa4Jd24YZMhVNE7"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" />
            Agendar llamada
          </Button>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          Aclaremos tus dudas juntos
        </p>
      </div>
    </section>
  )
}
