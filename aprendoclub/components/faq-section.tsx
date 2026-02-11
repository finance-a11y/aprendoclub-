"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    q: "¿Qué incluye la membresía de aprendoclub?",
    a: "Acceso a cursos, comunidad, sesiones en vivo, bolsa de trabajo y herramientas según tu plan.",
  },
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí, puedes subir o bajar de plan cuando quieras sin penalización.",
  },
  {
    q: "¿Necesito experiencia previa en SEO?",
    a: "No, nuestro programa empieza desde cero y te lleva paso a paso hasta nivel consultor.",
  },
  {
    q: "¿Cómo funcionan las sesiones en vivo?",
    a: "Son sesiones semanales por videollamada donde resolvemos dudas, revisamos proyectos y aprendemos juntos.",
  },
  {
    q: "¿Hay garantía de devolución?",
    a: "Sí, tienes 7 días para probar la plataforma. Si no es para ti, te devolvemos el dinero.",
  },
  {
    q: "¿Qué diferencia a aprendoclub de otros cursos online?",
    a: "Combinamos cursos actualizados, comunidad activa, mentorías y proyectos reales en una sola plataforma.",
  },
];

export function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
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
          FAQ
        </span>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white">
          Resolvemos tus dudas
        </h2>
      </motion.div>

      {/* FAQ Accordion */}
      <div className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={index !== faqs.length - 1 ? "border-b border-white/[0.06]" : ""}
          >
            <button
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
              className="group flex w-full items-center justify-between py-5 text-left"
            >
              <span
                className={`text-lg font-semibold pr-4 transition-colors duration-300 ${
                  openIndex === index
                    ? "text-[#b8f60d]"
                    : "text-white group-hover:text-[#b8f60d]"
                }`}
              >
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0"
              >
                <ChevronDown
                  className={`h-5 w-5 transition-colors duration-300 ${
                    openIndex === index ? "text-[#b8f60d]" : "text-gray-500"
                  }`}
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-base leading-relaxed text-gray-400">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
