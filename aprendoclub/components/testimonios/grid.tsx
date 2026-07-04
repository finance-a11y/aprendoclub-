"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import {
  testimonios,
  trustedCompanies,
  gridTitulo,
  logosBanda,
} from "@/content/testimonios";
import { TestimonialAvatar } from "./testimonial-avatar";
import { Card } from "@/components/ui/card";

export function TestimoniosGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
          {gridTitulo}
        </h2>
      </motion.div>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {testimonios.map((testimonio, index) => {
          const subtitulo = testimonio.rol ?? testimonio.ubicacion;
          return (
            <motion.div
              key={testimonio.nombre}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.6),
              }}
              className="group"
            >
              <Card padding="compact" hover="lift">
                <div className="flex items-center gap-4 mb-4">
                  <TestimonialAvatar testimonio={testimonio} />
                  <div>
                    <p className="font-semibold text-white">
                      {testimonio.nombre}
                    </p>
                    {subtitulo ? (
                      <p className="text-sm text-gray-500">{subtitulo}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  &ldquo;{testimonio.quote}&rdquo;
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.4 }}
        className="flex flex-col items-center gap-6 pt-8"
      >
        <p className="text-sm text-gray-500 uppercase tracking-wider">
          {logosBanda}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {trustedCompanies.map((company) => (
            <img
              key={company.name}
              src={company.logo}
              alt={company.name}
              className="h-8 md:h-10 w-auto opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
