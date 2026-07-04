"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { hero } from "@/content/testimonios";

export function TestimoniosHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center bg-[var(--bg-primary)] container-padding pt-28 pb-16 lg:pb-20"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-[800px] flex-col items-center gap-4 text-center"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
          {hero.eyebrow}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          {hero.titulo}
        </h1>
        <p className="text-lg text-gray-400">{hero.subtitulo}</p>
      </motion.div>
    </section>
  );
}
