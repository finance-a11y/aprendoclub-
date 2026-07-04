"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { reto, retoImagenes } from "@/content/testimonios";

export function RetoGaleria() {
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
        <span className="text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
          {reto.eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          {reto.titulo}
        </h2>
        <p className="text-lg text-gray-400">{reto.texto}</p>
      </motion.div>

      <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl">
        {retoImagenes.map((imagen, index) => (
          <motion.div
            key={imagen.src}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.4),
            }}
            className="overflow-hidden rounded-lg border border-white/10 bg-[#0d1117]"
          >
            <img
              src={imagen.src}
              alt={imagen.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
