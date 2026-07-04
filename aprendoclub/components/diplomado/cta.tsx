import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-card)] bg-[var(--surface-card)] p-10 md:p-16">
          <div className="relative text-center">
            <h2 className="mx-auto max-w-2xl text-balance text-[1.75rem] font-semibold leading-[1.2] text-white md:text-4xl">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
