"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/content/quienes-somos";

export function QuienesSomosHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex w-full flex-col items-center bg-[var(--bg-primary)] container-padding pt-40 pb-24 md:pt-48 md:pb-32">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-[#b8f60d]">
          {hero.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
          {hero.titulo}
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
          {hero.subtitulo}
        </p>
      </motion.div>
    </section>
  );
}
