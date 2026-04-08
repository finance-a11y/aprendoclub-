import { Users, Briefcase, Lightbulb } from "lucide-react"

export function Origin() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-accent">
          Nuestra historia
        </div>

        <h2 className="max-w-3xl text-balance font-mono text-3xl font-bold text-foreground md:text-4xl">
          Una necesidad real. Una soluci&oacute;n creada desde la experiencia.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-secondary p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <p className="leading-relaxed text-muted-foreground">
              En 2022, nuestra fundadora Arianna Lupi &mdash;entonces gerente de una
              agencia SEO&mdash; no encontraba talento hispanohablante capacitado.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-secondary p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Lightbulb className="h-5 w-5 text-accent" />
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Su comunidad digital preguntaba c&oacute;mo ella hab&iacute;a logrado
              trabajar en SEO 100% remoto. Arianna conect&oacute; los puntos: hab&iacute;a
              empresas que necesitaban especialistas y personas que quer&iacute;an aprender.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-secondary p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="leading-relaxed text-muted-foreground">
              As&iacute; naci&oacute; aprendoclub, la primera academia especializada en
              SEO para el mercado hispano. Hoy, m&aacute;s de 750 personas se han
              formado con nosotros.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
