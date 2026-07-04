"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import {
  agenda,
  comparacion,
  incluye,
  premios,
  ganadores,
  ganadoresIntro,
} from "@/content/reto";
import { Eyebrow } from "@/components/ui/eyebrow";

export function RetoMid() {
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
      {/* Agenda 7 días */}
      <section className="bg-[var(--bg-secondary)] container-padding section-spacing">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <Eyebrow>AGENDA</Eyebrow>
            <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
              7 días para cambiar tu rumbo
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agenda.map((d, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.05 }}
                className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-card)]"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={d.imagen}
                    alt={`${d.dia}: ${d.titulo}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <Eyebrow>{d.dia}</Eyebrow>
                  <h3 className="text-base font-semibold text-white">
                    {d.titulo}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {d.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparación */}
      <section className="container-padding section-spacing max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[var(--surface-card)] p-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-400">
              Lo de siempre
            </h3>
            <ul className="flex flex-col gap-4">
              {comparacion.map((row, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                  {row.deSiempre}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface-card)] p-8">
            <h3 className="mb-6 text-lg font-semibold text-[var(--accent)]">
              El Reto 7 Días
            </h3>
            <ul className="flex flex-col gap-4">
              {comparacion.map((row, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                  {row.elReto}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Incluye */}
      <section className="bg-[var(--bg-secondary)] container-padding section-spacing">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-2xl font-semibold text-white sm:text-3xl">
            Todo esto incluye tu cupo
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {incluye.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-[var(--surface-card)] p-5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                <span className="text-sm leading-relaxed text-gray-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premios */}
      <section className="container-padding section-spacing max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Eyebrow>PREMIOS</Eyebrow>
          <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
            No solo aprendes. También puedes ganar.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            {...reveal}
            transition={{ duration: 0.5 }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-card)]"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={premios.mayor.imagen}
                alt={premios.mayor.titulo}
                fill
                className="object-cover"
              />
            </div>
            <p className="p-6 text-lg font-semibold text-white">
              {premios.mayor.titulo}
            </p>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.05 }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-card)]"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={premios.becas.imagen}
                alt={premios.becas.titulo}
                fill
                className="object-cover"
              />
            </div>
            <p className="p-6 text-lg font-semibold text-white">
              {premios.becas.titulo}
            </p>
          </motion.div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-gray-400 measure-prose">
          {premios.comoSeGana}
        </p>
      </section>

      {/* Ganadores */}
      <section className="bg-[var(--bg-secondary)] container-padding section-spacing">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <Eyebrow>GANADORES</Eyebrow>
            <p className="max-w-2xl leading-relaxed text-gray-400 measure-prose">
              {ganadoresIntro}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {ganadores.map((g, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.05 }}
                className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-card)]"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={g.imagen}
                    alt={g.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="text-sm font-semibold text-white">{g.nombre}</h3>
                  <span className="text-xs text-gray-500">{g.edicion}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
