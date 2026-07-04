import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RelatedLinks } from "@/components/related-links";
import {
  tallerHero,
  tallerIncluye,
  tallerParaQuien,
  tallerPrecio,
  tallerCta,
} from "@/content/taller-seo-con-ia";
import { JsonLd } from "@/components/json-ld";
import { course } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Taller SEO con IA | aprendoclub",
  description: tallerHero.subtitulo,
};

export default function TallerSeoConIaPage() {
  return (
    <>
      <JsonLd
        data={course({
          name: "Taller de SEO con IA",
          description: tallerHero.subtitulo,
          path: "/programas/taller-seo-con-ia",
          price: "49.99",
          courseWorkload: "P15D",
        })}
      />
      {/* Hero */}
      <section className="container-padding section-spacing max-w-6xl mx-auto flex flex-col items-center gap-4 text-center pt-28">
        <Eyebrow className="tracking-[0.2em]">{tallerHero.eyebrow}</Eyebrow>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-white">
          {tallerHero.titulo}
        </h1>
        <p className="max-w-2xl text-lg text-gray-400">{tallerHero.subtitulo}</p>
        <p className="mt-2 text-base font-medium text-white">
          {tallerHero.duracion}
        </p>
      </section>

      {/* Qué incluye */}
      <section className="container-padding section-spacing max-w-6xl mx-auto w-full">
        <h2 className="mb-8 text-center text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          Qué incluye
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tallerIncluye.map((item, i) => (
            <Card key={i} padding="compact" hover="none" className="flex items-start gap-4">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                <Check className="h-5 w-5 text-[var(--accent)]" />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm leading-relaxed text-gray-300">
                  {item.texto}
                </p>
                {item.valor && (
                  <span className="text-xs text-gray-500">{item.valor}</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Para quién */}
      <section className="container-padding section-spacing max-w-6xl mx-auto w-full">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
            ¿Para quién es?
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            {tallerParaQuien}
          </p>
        </div>
      </section>

      {/* Precio + pago */}
      <section className="container-padding section-spacing max-w-6xl mx-auto w-full">
        <Card
          padding="default"
          hover="none"
          className="mx-auto flex max-w-md flex-col items-center gap-6 text-center"
        >
          <span className="text-5xl font-semibold text-white">
            {tallerPrecio.monto}
          </span>
          <ul className="flex w-full flex-col gap-3">
            {tallerPrecio.opciones.map((op, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-left text-sm text-gray-400"
              >
                <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                {op.texto}
              </li>
            ))}
          </ul>
          <Button href={tallerCta.href} target="_blank" rel="noopener noreferrer" className="mt-2 w-full" icon>
            {tallerCta.label}
          </Button>
        </Card>
      </section>

      <RelatedLinks
        links={[
          { href: "/programas", label: "Ver todos los programas" },
          {
            href: "/testimonios",
            label: "Lee las historias de nuestros estudiantes",
          },
        ]}
      />
    </>
  );
}
