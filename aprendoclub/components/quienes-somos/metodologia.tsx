"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { metodologia } from "@/content/quienes-somos";

export function MetodologiaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-primary)] container-padding section-spacing"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4 text-center"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-[#b8f60d]">
          {metodologia.eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          {metodologia.titulo}
        </h2>
      </motion.div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl">
        {metodologia.pilares.map((pilar, index) => (
          <motion.div
            key={pilar.nombre}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : index * 0.1 }}
            className="rounded-xl bg-[#0d1117] border border-white/10 p-6"
          >
            <span className="text-sm font-bold text-[#b8f60d]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-bold text-white">{pilar.nombre}</h3>
            <p className="mt-2 text-gray-400 leading-relaxed">
              {pilar.descripcion}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
