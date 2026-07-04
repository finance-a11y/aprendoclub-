"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
        <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          {cta.titulo}
        </h2>
        <p className="text-lg text-gray-400">{cta.texto}</p>
        {/* CTA primario → /programas (destino en cta.botonHref) */}
        <Button href={cta.botonHref} variant="primary">
          {cta.botonLabel}
        </Button>
        <Link
          href="/quienes-somos"
          className="text-gray-300 underline underline-offset-4 decoration-white/30 transition-colors hover:text-[var(--accent)]"
        >
          Conoce al equipo detrás de aprendoclub
        </Link>
      </motion.div>
    </section>
  );
}
