"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urgencia, hero, razonNoEscalas, mentora } from "@/content/reto";

export function RetoTop() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
      };

  return (
    <div>
      {/* Barra de urgencia */}
      <div className="w-full border-b border-white/10 bg-[#0d1117]">
        <p className="container-padding mx-auto max-w-6xl py-2.5 text-center text-xs font-medium text-gray-300 sm:text-sm">
          {urgencia}
        </p>
      </div>

      {/* Hero */}
      <section className="container-padding max-w-6xl mx-auto grid grid-cols-1 items-center gap-10 pt-16 pb-20 lg:grid-cols-2 lg:gap-14 lg:pt-20">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8f60d]">
            {hero.eyebrow}
          </span>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {hero.titulo}{" "}
            <span className="text-[#b8f60d]">{hero.destacado}</span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-400">{hero.texto}</p>
          <ul className="flex flex-col gap-3">
            {hero.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-left text-sm text-gray-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8f60d]" />
                {b}
              </li>
            ))}
          </ul>
          <p className="text-base font-semibold text-white">{hero.precioTexto}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href={hero.ctas[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#b8f60d] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:brightness-110"
            >
              {hero.ctas[0].label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.ctas[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#0d1117] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {hero.ctas[1].label}
            </a>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <Image
            src={hero.imagen}
            alt="Arianna Lupi, mentora del Reto 7 días"
            width={640}
            height={800}
            priority
            className="h-auto w-full rounded-2xl object-cover"
          />
        </motion.div>
      </section>

      {/* Razón por la cual no escalas */}
      <section className="bg-[var(--bg-secondary)] container-padding section-spacing">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {razonNoEscalas.titulo}
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            {razonNoEscalas.parrafo}
          </p>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {razonNoEscalas.frases.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-[#0d1117] p-6 text-sm font-medium leading-relaxed text-white"
              >
                {f}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mentora */}
      <section className="container-padding section-spacing max-w-6xl mx-auto grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <Image
            src={mentora.foto}
            alt="Arianna Lupi"
            width={520}
            height={640}
            className="h-auto w-full rounded-2xl object-cover"
          />
        </motion.div>
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8f60d]">
              {mentora.rol}
            </span>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {mentora.nombre}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mentora.stats.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-[#0d1117] p-4"
              >
                <p className="text-xl font-bold text-white">{s.valor}</p>
                <p className="text-xs text-gray-400">{s.etiqueta}</p>
              </div>
            ))}
          </div>
          <p className="leading-relaxed text-gray-400">{mentora.historia}</p>
          <blockquote className="border-l-2 border-[#b8f60d] pl-4 text-lg font-medium italic text-white">
            {mentora.quote}
          </blockquote>
          <p className="leading-relaxed text-gray-400">{mentora.cierre}</p>
        </motion.div>
      </section>
    </div>
  );
}
