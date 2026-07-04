"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { hero } from "@/content/testimonios";

export function TestimoniosHero() {
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
        className="flex max-w-[800px] flex-col items-center gap-4 text-center"
      >
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-white">
          {hero.titulo}
        </h1>
        <p className="text-lg text-gray-400">{hero.subtitulo}</p>
      </motion.div>
    </section>
  );
}
