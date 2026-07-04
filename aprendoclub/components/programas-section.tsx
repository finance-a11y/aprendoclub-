"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProgramCard } from "@/components/program-card";
import { programas, homeProgramas } from "@/content/programas";

export function ProgramasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const rise = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: isInView ? { opacity: 1, y: 0 } : {} };

  return (
    <section
      id="programas"
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      <motion.div
        {...rise}
        transition={{ duration: 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8f60d]">
          {homeProgramas.eyebrow}
        </span>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white">
          {homeProgramas.titulo}
        </h2>
        <p className="text-center text-lg text-gray-400">
          {homeProgramas.subtitulo}
        </p>
      </motion.div>

      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {programas.map((program, index) => (
          <motion.div
            key={program.id}
            {...rise}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1 }}
          >
            <ProgramCard program={program} compact />
          </motion.div>
        ))}
      </div>

      <Link
        href={homeProgramas.botonHref}
        className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0d1117] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#b8f60d]/30"
      >
        {homeProgramas.botonLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </section>
  );
}
