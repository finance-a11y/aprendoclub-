"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { urgencia, hero, razonNoEscalas, mentora } from "@/content/reto";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

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
      <div className="w-full border-b border-white/10 bg-[var(--surface-card)]">
        <p className="container-padding mx-auto max-w-6xl py-2.5 text-center text-xs font-medium text-gray-300 sm:text-sm">
          {urgencia}
        </p>
      </div>

      {/* Hero */}
      <section className="container-padding section-spacing max-w-6xl mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          {...reveal}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-white">
            {hero.titulo}{" "}
            <span className="text-[var(--accent)]">{hero.destacado}</span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-400">{hero.texto}</p>
          <ul className="flex flex-col gap-3">
            {hero.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-left text-sm text-gray-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                {b}
              </li>
            ))}
          </ul>
          <p className="text-base font-semibold text-white">{hero.precioTexto}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              href={hero.ctas[0].href}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon
            >
              {hero.ctas[0].label}
            </Button>
            <Button
              href={hero.ctas[1].href}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              {hero.ctas[1].label}
            </Button>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.1, ease: "easeOut" }}
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
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
        >
          <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
            {razonNoEscalas.titulo}
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            {razonNoEscalas.parrafo}
          </p>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {razonNoEscalas.frases.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-[var(--surface-card)] p-6 text-sm font-medium leading-relaxed text-white"
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
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
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
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.1, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <Eyebrow>{mentora.rol}</Eyebrow>
            <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
              {mentora.nombre}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mentora.stats.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-[var(--surface-card)] p-4"
              >
                <p className="text-xl font-semibold text-white">{s.valor}</p>
                <p className="text-xs text-gray-400">{s.etiqueta}</p>
              </div>
            ))}
          </div>
          <p className="leading-relaxed text-gray-400 measure-prose">{mentora.historia}</p>
          <blockquote className="border-l-2 border-[var(--accent)] pl-4 text-lg font-medium italic text-white">
            {mentora.quote}
          </blockquote>
          <p className="leading-relaxed text-gray-400 measure-prose">{mentora.cierre}</p>
        </motion.div>
      </section>
    </div>
  );
}
