"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fundadora } from "@/content/quienes-somos";

export function FundadoraSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center bg-[var(--bg-primary)] container-padding section-spacing"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl items-center">
        {/* Photo */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="relative flex justify-center lg:justify-start"
        >
          {/* Decorative Frame - offset behind */}
          <div className="absolute top-4 left-4 lg:left-0 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl border-2 border-[#012fd8]/30" />

          {/* Photo */}
          <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl overflow-hidden">
            <img
              src={fundadora.foto}
              alt={`${fundadora.nombre} - ${fundadora.rol}`}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.2 }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          <span className="text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
            {fundadora.eyebrow}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            <a
              href="https://ariannalupi.com"
              target="_blank"
              rel="noopener"
              className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
            >
              {fundadora.nombre}
            </a>
          </h2>

          <p className="text-lg text-[#012fd8] font-medium">{fundadora.rol}</p>

          {fundadora.bio.map((parrafo, index) => (
            <p key={index} className="text-gray-400 leading-relaxed">
              {parrafo}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
