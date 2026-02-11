"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Compass,
  Timer,
  Users,
  Brain,
  TrendingUp,
  Target,
} from "lucide-react";

const problems = [
  {
    icon: Compass,
    title: "Sin rumbo profesional",
    desc: "Aprendes de todo, pero no te especializas en nada. Tu CV dice 'marketing digital' pero no tienes diferenciación real.",
  },
  {
    icon: Timer,
    title: "Contenido desactualizado",
    desc: "Los cursos que encuentras online están desactualizados. Google cambia sus algoritmos y tú sigues con técnicas de hace 2 años.",
  },
  {
    icon: Users,
    title: "Sin comunidad real",
    desc: "Aprendes solo, sin feedback, sin networking, sin alguien que te diga si vas por buen camino o estás perdiendo el tiempo.",
  },
  {
    icon: Brain,
    title: "La IA te está dejando atrás",
    desc: "Todos hablan de IA + SEO pero nadie te enseña cómo integrar herramientas de IA en tu flujo de trabajo real.",
  },
  {
    icon: TrendingUp,
    title: "Crecimiento estancado",
    desc: "Sin mentoría ni estructura, tu carrera se estanca. Necesitas un camino claro de junior a consultor.",
  },
  {
    icon: Target,
    title: "Sin proyectos reales",
    desc: "La teoría no basta. Necesitas aplicar SEO en proyectos reales con feedback de expertos para desarrollar habilidades.",
  },
];

export function ProblemaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="problema"
      ref={ref}
      className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex max-w-[700px] flex-col items-center gap-4"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#012fd8]">
          EL PROBLEMA
        </span>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white">
          ¿Por qué necesitas aprendoclub?
        </h2>
        <p className="text-center text-lg text-gray-400">
          El marketing digital cambia cada semana. Sin una guía clara, pierdes
          tiempo, dinero y oportunidades.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProblemCard {...problem} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProblemCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="group h-full flex flex-col gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#012fd8]/30 hover:-translate-y-1">
      {/* Icon */}
      <div className="w-fit rounded-xl bg-[#012fd8]/10 p-3">
        <Icon className="h-6 w-6 text-[#012fd8]" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white">{title}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-400">{desc}</p>
    </div>
  );
}
