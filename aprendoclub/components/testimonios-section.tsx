"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Johanna Ramírez",
    role: "Creadora de nichos",
    photo: "/testimonio-1.webp",
    quote:
      "Aprendí posicionamiento web y búsqueda de palabras clave desde cero. Ahora estoy creando mi propia página de nichos, y una amiga ya me pidió ayuda con su negocio.",
  },
  {
    name: "Nataly Dominguez",
    role: "Analista SEO, Perú",
    photo: "/testimonio-2.webp",
    quote:
      "Tenía un negocio con web pero sin estrategia ni tráfico de Google. Apliqué lo aprendido y ya veo resultados. Ahora ayudo a otras webs también. Este diplomado no tiene nada que envidiar a los de universidades de prestigio.",
  },
  {
    name: "Marco Garcia",
    role: "SEO Freelancer, USA",
    photo: "/testimonio-3.webp",
    quote:
      "Valió la pena de principio a fin. Aprendí una habilidad que me abrirá muchas puertas y me permitirá trabajar remoto y ser dueño de mi tiempo.",
  },
];

const trustedCompanies = [
  { name: "Holafly", logo: "/logo-holafly.svg" },
  { name: "HubSpot", logo: "/logo-hubspot.svg" },
  { name: "Unilever", logo: "/logo-unilever.svg" },
  { name: "DSLX", logo: "/logo-dslx.svg" },
];

export function TestimoniosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="testimonios"
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-primary)] container-padding section-spacing"
    >
      {/* Header */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4"
      >
        <Eyebrow className="tracking-wider">TESTIMONIOS</Eyebrow>
        <h2 className="text-center text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
          Lo que dicen nuestros estudiantes
        </h2>
      </motion.div>

      {/* Testimonial Cards */}
      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.1 + index * 0.15 }}
            className="group"
          >
            <Card padding="compact" hover="lift">
              {/* Header: Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Ver todos los testimonios → /testimonios (TEST-02) */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.5 }}
      >
        <Button href="/testimonios" variant="ghost">
          Ver todos los testimonios
        </Button>
      </motion.div>

      {/* Trusted By */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.6 }}
        className="flex flex-col items-center gap-6 pt-8"
      >
        <p className="text-sm text-gray-400 uppercase tracking-wider">
          Profesionales de empresas como
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {trustedCompanies.map((company) => (
            <Image
              key={company.name}
              src={company.logo}
              alt={company.name}
              width={120}
              height={40}
              className="h-8 md:h-10 w-auto object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
