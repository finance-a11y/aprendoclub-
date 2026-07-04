"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { historia } from "@/content/quienes-somos";

export function HistoriaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center gap-12 bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4 text-center"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
          {historia.eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          {historia.titulo}
        </h2>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.15 }}
        className="flex w-full max-w-3xl flex-col gap-6"
      >
        {historia.parrafos.map((parrafo, index) => (
          <p key={index} className="text-gray-400 leading-relaxed">
            {parrafo}
          </p>
        ))}

        <blockquote className="mt-4 border-l-2 border-white/15 pl-6">
          <p className="text-xl md:text-2xl text-white font-medium italic">
            &ldquo;{historia.quote.texto}&rdquo;
          </p>
          <cite className="mt-3 block text-sm text-gray-500 not-italic">
            {historia.quote.autor}
          </cite>
        </blockquote>
      </motion.div>
    </section>
  );
}
