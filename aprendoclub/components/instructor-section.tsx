"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "$2M+", label: "en ventas generadas" },
  { value: "30+", label: "empresas ayudadas" },
  { value: "2,000+", label: "estudiantes formados" },
];

export function InstructorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="instructor"
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl items-center">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center lg:justify-start"
        >
          {/* Decorative Frame - offset behind */}
          <div className="absolute top-4 left-4 lg:left-0 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl border-2 border-[#012fd8]/30" />

          {/* Photo */}
          <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl overflow-hidden">
            <img
              src="/arianna-lupi.webp"
              alt="Arianna Lupi - Fundadora de aprendoclub"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#b8f60d]">
              TU INSTRUCTOR
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Arianna Lupi
          </h2>

          <p className="text-lg text-[#012fd8] font-medium">
            Consultora SEO y Fundadora aprendoclub
          </p>

          <p className="text-gray-400 leading-relaxed">
            Con un Magíster en Data Analytics y más de una década de experiencia, Arianna ha generado más de $2M en ventas para 30+ empresas mediante posicionamiento en buscadores y plataformas de IA.
          </p>

          <p className="text-gray-400 leading-relaxed">
            En 2022 fundó aprendoclub (antes aprendoseo), donde ha capacitado a más de 2,000 estudiantes con una metodología 100% práctica y comprobada.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-3xl md:text-4xl font-extrabold text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
