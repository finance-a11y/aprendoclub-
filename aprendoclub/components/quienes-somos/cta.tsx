"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ctaFinal } from "@/content/quienes-somos";
import { Button } from "@/components/ui/button";

export function CtaFinalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center bg-[var(--bg-primary)] container-padding section-spacing"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-2xl flex-col items-center gap-6 text-center"
      >
        <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          {ctaFinal.titulo}
        </h2>
        <p className="text-lg text-gray-400">{ctaFinal.texto}</p>
        {/* CTA primario → /programas (destino en ctaFinal.botonHref) */}
        <Button href={ctaFinal.botonHref} variant="primary">
          {ctaFinal.botonLabel}
        </Button>
        <Link
          href="/testimonios"
          className="text-gray-300 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white"
        >
          Mira las historias de nuestros estudiantes
        </Link>
      </motion.div>
    </section>
  );
}
