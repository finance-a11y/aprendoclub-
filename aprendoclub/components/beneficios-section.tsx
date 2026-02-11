"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, MessageCircle, Video, Briefcase } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Cursos Prácticos",
    desc: "Diplomado completo de SEO + cursos cortos actualizados cada mes con casos reales.",
  },
  {
    icon: MessageCircle,
    title: "Comunidad 24/7",
    desc: "Conecta con otros profesionales de SEO. Comparte, pregunta y crece en comunidad.",
  },
  {
    icon: Video,
    title: "Mentorías en Vivo",
    desc: "Sesiones grupales y 1:1 con expertos que te dan feedback directo sobre tu trabajo.",
  },
  {
    icon: Briefcase,
    title: "Bolsa de Trabajo",
    desc: "Accede a vacantes exclusivas de empresas que buscan especialistas en SEO.",
  },
];

export function BeneficiosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="beneficios"
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-primary)] container-padding section-spacing"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8f60d]">
          LA SOLUCIÓN
        </span>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white">
          Todo lo que necesitas para dominar el SEO
        </h2>
        <p className="text-center text-lg text-gray-400">
          Herramientas, conocimiento y comunidad en un solo lugar.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col items-center gap-5 rounded-xl bg-[#0d1117] border border-white/10 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#b8f60d]/30"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#b8f60d]/10 transition-colors group-hover:bg-[#b8f60d]/20">
              <benefit.icon className="h-7 w-7 text-[#b8f60d]" />
            </div>
            <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              {benefit.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
