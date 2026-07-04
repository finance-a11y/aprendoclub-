"use client";

import { useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { pricing, faq, ctaFinal } from "@/content/reto";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
        <Card
          padding="default"
          hover="none"
          className="!border-[var(--accent)]/30 mx-auto flex max-w-md flex-col items-center gap-6 text-center"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-semibold text-white">{pricing.precio}</span>
            <span className="text-sm text-gray-400">{pricing.precioNota}</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            {pricing.incluyeTexto}
          </p>
          <div className="flex w-full flex-col gap-3">
            {pricing.ctas.map((cta, i) => (
              <Button
                key={i}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                variant={i === 0 ? "primary" : "ghost"}
                icon={i === 0}
                className="w-full"
              >
                {cta.label}
              </Button>
            ))}
          </div>
          <p className="flex items-center gap-2 text-xs text-gray-500">
            <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
            {pricing.nota}
          </p>
        </Card>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg-secondary)] container-padding section-spacing">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
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
                  aria-controls={`reto-faq-panel-${index}`}
                  className="group flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="pr-4 text-lg font-semibold text-white transition-colors duration-300">
                    {item.pregunta}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-gray-400 transition-colors duration-300" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`reto-faq-panel-${index}`}
                      role="region"
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
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-[var(--surface-card)] px-6 py-14 text-center">
          <h2 className="max-w-2xl text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
            {ctaFinal.titulo}
          </h2>
          <Button
            href={ctaFinal.botonHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            icon
          >
            {ctaFinal.botonLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}
