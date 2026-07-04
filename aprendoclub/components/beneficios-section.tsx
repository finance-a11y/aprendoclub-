"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, MessageCircle, Video, Briefcase } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";

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
        <Eyebrow>LA SOLUCIÓN</Eyebrow>
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-white">
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
          >
            <Card hover="liftAccent" className="group flex flex-col items-center gap-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--accent)]/10 transition-colors group-hover:bg-[var(--accent)]/20">
                <benefit.icon className="h-7 w-7 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {benefit.desc}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
