"use client";

import { useRef, useState } from "react";
import { ChevronDown, ArrowRight, Check } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { pricing, faq, ctaFinal } from "@/content/reto";

export function RetoBottom() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const rise = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: isInView ? { opacity: 1, y: 0 } : {} };

  return (
    <div ref={ref}>
      {/* Pricing */}
      <section className="container-padding section-spacing max-w-6xl mx-auto">
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-2xl border border-[#b8f60d]/30 bg-[#0d1117] p-8 text-center">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white">{pricing.precio}</span>
            <span className="text-sm text-gray-400">{pricing.precioNota}</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            {pricing.incluyeTexto}
          </p>
          <div className="flex w-full flex-col gap-3">
            {pricing.ctas.map((cta, i) => (
              <a
                key={i}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  i === 0
                    ? "group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#b8f60d] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:brightness-110"
                    : "inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                }
              >
                {cta.label}
                {i === 0 && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </a>
            ))}
          </div>
          <p className="flex items-center gap-2 text-xs text-gray-500">
            <Check className="h-3.5 w-3.5 text-[#b8f60d]" />
            {pricing.nota}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg-secondary)] container-padding section-spacing">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#012fd8]">
              FAQ
            </span>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="w-full">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                {...rise}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.05 }}
                className={
                  index !== faq.length - 1 ? "border-b border-white/[0.06]" : ""
                }
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  className="group flex w-full items-center justify-between py-5 text-left"
                >
                  <span
                    className={`pr-4 text-lg font-semibold transition-colors duration-300 ${
                      openIndex === index
                        ? "text-[#b8f60d]"
                        : "text-white group-hover:text-[#b8f60d]"
                    }`}
                  >
                    {item.pregunta}
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
                        {item.respuesta}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="container-padding section-spacing max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-[#0d1117] px-6 py-14 text-center">
          <h2 className="max-w-2xl text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {ctaFinal.titulo}
          </h2>
          <a
            href={ctaFinal.botonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#b8f60d] px-8 py-4 text-base font-semibold text-black transition-all hover:brightness-110"
          >
            {ctaFinal.botonLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </div>
  );
}
