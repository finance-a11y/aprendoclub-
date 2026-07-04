"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ProgramCard } from "@/components/program-card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
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
        <Eyebrow className="tracking-[0.2em]">{homeProgramas.eyebrow}</Eyebrow>
        <h2 className="text-center text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
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

      <Button href={homeProgramas.botonHref} variant="secondary" icon>
        {homeProgramas.botonLabel}
      </Button>
    </section>
  );
}
