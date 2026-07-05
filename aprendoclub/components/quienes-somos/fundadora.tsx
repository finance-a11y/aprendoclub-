"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fundadora } from "@/content/quienes-somos";
import { Eyebrow } from "@/components/ui/eyebrow";

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
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-start"
        >
          {/* Decorative Frame - offset behind */}
          <div className="absolute top-4 left-4 lg:left-0 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl border-2 border-[var(--primary)]/30" />

          {/* Photo */}
          <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl overflow-hidden">
            <Image
              src={fundadora.foto}
              alt={`${fundadora.nombre} - ${fundadora.rol}`}
              fill
              sizes="(max-width: 768px) 280px, 350px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          <Eyebrow>{fundadora.eyebrow}</Eyebrow>

          <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
            <a
              href="https://ariannalupi.com"
              target="_blank"
              rel="noopener"
              className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
            >
              {fundadora.nombre}
            </a>
          </h2>

          <p className="text-lg text-[var(--primary)] font-medium">{fundadora.rol}</p>

          <div className="flex flex-col gap-6 measure-prose">
            {fundadora.bio.map((parrafo, index) => (
              <p key={index} className="text-gray-400 leading-relaxed">
                {parrafo}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
