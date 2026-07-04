import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/program-card";
import { RelatedLinks } from "@/components/related-links";
import { programas, hubHero, hubCtaFinal } from "@/content/programas";
import { JsonLd } from "@/components/json-ld";
import { programasGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Programas | aprendoclub",
  description:
    "Desde un reto de 7 días hasta el diplomado completo. Elige el programa de SEO + IA que va con tu momento.",
};

export default function ProgramasPage() {
  return (
    <>
      <JsonLd
        data={programasGraph([
          { name: "Diplomado de cero a SEO", path: "/diplomado" },
          {
            name: "Taller de SEO con IA",
            path: "/programas/taller-seo-con-ia",
          },
          { name: "Reto 7 días", path: "/reto" },
        ])}
      />
      {/* Hero */}
      <section className="container-padding section-spacing max-w-6xl mx-auto flex flex-col items-center gap-4 text-center pt-28">
        <Eyebrow className="tracking-[0.2em]">{hubHero.eyebrow}</Eyebrow>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          {hubHero.titulo}
        </h1>
        <p className="max-w-2xl text-lg text-gray-400">{hubHero.subtitulo}</p>
      </section>

      {/* Grid de programas */}
      <section className="container-padding max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programas.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="container-padding section-spacing max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-[var(--surface-card)] px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {hubCtaFinal.titulo}
          </h2>
          <p className="max-w-xl text-gray-400">{hubCtaFinal.texto}</p>
          <Button
            href={hubCtaFinal.botonHref}
            target="_blank"
            rel="noopener noreferrer"
            icon
          >
            {hubCtaFinal.botonLabel}
          </Button>
        </div>
      </section>

      <RelatedLinks
        title="Antes de decidir"
        links={[
          {
            href: "/testimonios",
            label: "Lee las historias de nuestros estudiantes",
          },
          {
            href: "/quienes-somos",
            label: "Conoce al equipo detrás de aprendoclub",
          },
        ]}
      />
    </>
  );
}
