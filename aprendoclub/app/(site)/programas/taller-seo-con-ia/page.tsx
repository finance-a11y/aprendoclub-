import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import {
  tallerHero,
  tallerIncluye,
  tallerParaQuien,
  tallerPrecio,
  tallerCta,
} from "@/content/taller-seo-con-ia";

export const metadata: Metadata = {
  title: "Taller SEO con IA | aprendoclub",
  description: tallerHero.subtitulo,
};

export default function TallerSeoConIaPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-padding section-spacing max-w-6xl mx-auto flex flex-col items-center gap-4 text-center pt-28">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8f60d]">
          {tallerHero.eyebrow}
        </span>
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {tallerHero.titulo}
        </h1>
        <p className="max-w-2xl text-lg text-gray-400">{tallerHero.subtitulo}</p>
        <p className="mt-2 text-base font-medium text-white">
          {tallerHero.duracion}
        </p>
      </section>

      {/* Qué incluye */}
      <section className="container-padding max-w-6xl mx-auto w-full">
        <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
          Qué incluye
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tallerIncluye.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#0d1117] p-6"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#b8f60d]/10">
                <Check className="h-5 w-5 text-[#b8f60d]" />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm leading-relaxed text-gray-300">
                  {item.texto}
                </p>
                {item.valor && (
                  <span className="text-xs text-gray-500">{item.valor}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Para quién */}
      <section className="container-padding section-spacing max-w-6xl mx-auto w-full">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            ¿Para quién es?
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            {tallerParaQuien}
          </p>
        </div>
      </section>

      {/* Precio + pago */}
      <section className="container-padding max-w-6xl mx-auto w-full pb-24">
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-2xl border border-white/10 bg-[#0d1117] p-8 text-center">
          <span className="text-5xl font-bold text-white">
            {tallerPrecio.monto}
          </span>
          <ul className="flex w-full flex-col gap-3">
            {tallerPrecio.opciones.map((op, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-left text-sm text-gray-400"
              >
                <Check className="h-4 w-4 shrink-0 text-[#b8f60d]" />
                {op.texto}
              </li>
            ))}
          </ul>
          <a
            href={tallerCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#b8f60d] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:brightness-110"
          >
            {tallerCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </>
  );
}
