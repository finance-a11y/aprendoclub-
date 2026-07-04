"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cta } from "@/content/testimonios";

export function TestimoniosCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-2xl flex-col items-center gap-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {cta.titulo}
        </h2>
        <p className="text-lg text-gray-400">{cta.texto}</p>
        {/* CTA primario → /programas (destino en cta.botonHref) */}
        <Link
          href={cta.botonHref}
          className="bg-[var(--accent)] text-black px-6 py-3 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(184,246,13,0.3)] transition-all"
        >
          {cta.botonLabel}
        </Link>
      </motion.div>
    </section>
  );
}
