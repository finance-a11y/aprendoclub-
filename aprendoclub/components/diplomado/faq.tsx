"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "\u00bfDebo tener experiencia previa?",
    answer:
      "No te preocupes, \u00a1no necesitas experiencia previa! El curso est\u00e1 dise\u00f1ado para personas que reci\u00e9n est\u00e1n comenzando, as\u00ed que puedes empezar desde cero.",
  },
  {
    question: "\u00bfCu\u00e1nto tiempo debo invertir para convertirme en un experto en SEO?",
    answer:
      "El diplomado se puede completar entre 3 y 6 meses. Con dedicaci\u00f3n constante, podr\u00e1s empezar a ver resultados desde las primeras semanas.",
  },
  {
    question: "\u00bfCu\u00e1les son los tipos de SEO que existen?",
    answer:
      "Existen tres tipos principales: SEO On-Page (optimizaci\u00f3n del contenido), SEO Off-Page (construcci\u00f3n de autoridad) y SEO T\u00e9cnico (optimizaci\u00f3n de la infraestructura web). En el diplomado cubrir\u00e1s los tres.",
  },
  {
    question: "\u00bfQu\u00e9 debo estudiar para ser SEO?",
    answer:
      "No necesitas estudios previos espec\u00edficos. Nuestro diplomado te lleva desde lo m\u00e1s b\u00e1sico hasta estrategias avanzadas, con todo lo necesario para convertirte en especialista SEO.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center font-mono text-3xl font-bold text-foreground md:text-4xl">
          Preguntas que suelen hacernos antes de dar el s&iacute;
        </h2>

        <div className="mt-10 flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-secondary"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="border-t border-border px-6 py-5">
                  <p className="leading-relaxed text-muted-foreground">
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
