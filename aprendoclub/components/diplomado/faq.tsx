"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "¿Debo tener experiencia previa?",
    answer:
      "No te preocupes, ¡no necesitas experiencia previa! El curso está diseñado para personas que recién están comenzando, así que puedes empezar desde cero.",
  },
  {
    question: "¿Cuánto tiempo debo invertir para convertirme en un experto en SEO?",
    answer:
      "El diplomado se puede completar entre 3 y 6 meses. Con dedicación constante, podrás empezar a ver resultados desde las primeras semanas.",
  },
  {
    question: "¿Cuáles son los tipos de SEO que existen?",
    answer:
      "Existen tres tipos principales: SEO On-Page (optimización del contenido), SEO Off-Page (construcción de autoridad) y SEO Técnico (optimización de la infraestructura web). En el diplomado cubrirás los tres.",
  },
  {
    question: "¿Qué debo estudiar para ser SEO?",
    answer:
      "No necesitas estudios previos específicos. Nuestro diplomado te lleva desde lo más básico hasta estrategias avanzadas, con todo lo necesario para convertirte en especialista SEO.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl container-padding">
        <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
          Preguntas que suelen hacernos antes de dar el sí
        </h2>

        <div className="mt-10 flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-[#0d1117]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className="border-t border-white/10 px-6 py-5"
                >
                  <p className="leading-relaxed text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
