"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const weeks = [
  { week: 1, title: "Introducci\u00f3n al SEO \u2013 Empezando desde cero", detail: "Aprende a llevar a cabo un proyecto SEO de inicio a fin." },
  { week: 2, title: "Proyecto SEO \u2013 Inicia tu camino", detail: "Configura tu primer proyecto SEO real paso a paso." },
  { week: 3, title: "Herramientas SEO \u2013 Potencia tu trabajo", detail: "Domina las herramientas esenciales del ecosistema SEO." },
  { week: 4, title: "Palabras clave \u2013 La base de tu estrategia", detail: "Aprende a investigar y seleccionar las mejores keywords." },
  { week: 5, title: "Mapa de palabras clave \u2013 Enf\u00f3cate en lo que ya tiene", detail: "Organiza y prioriza tus palabras clave estrat\u00e9gicamente." },
  { week: 6, title: "An\u00e1lisis de la competencia \u2013 Encuentra oportunidades de negocio", detail: "Descubre qu\u00e9 hacen tus competidores y c\u00f3mo superarlos." },
  { week: 7, title: "Estrategias SEO \u2013 Acelera tu crecimiento", detail: "Implementa estrategias probadas para escalar resultados." },
  { week: 8, title: "Producci\u00f3n de contenido \u2013 Empieza a crear contenido que posicione", detail: "Crea contenido optimizado que Google ame." },
  { week: 9, title: "Arquitectura web \u2013 Organiza una web que Google ame", detail: "Estructura tu sitio para m\u00e1ximo rendimiento SEO." },
  { week: 10, title: "Optimizaci\u00f3n de contenido existente \u2013 Impulsa lo que ya tienes", detail: "Mejora el contenido que ya tienes para obtener m\u00e1s tr\u00e1fico." },
  { week: 11, title: "Redacci\u00f3n SEO \u2013 Escribe para posicionar", detail: "Domina el arte de escribir copy que posiciona." },
  { week: 12, title: "Medici\u00f3n de resultados \u2013 Eval\u00faa el \u00e9xito de tus estrategias", detail: "Aprende a medir y reportar resultados SEO." },
  { week: 13, title: "Tipos de SEO \u2013 Divide y conquista tu posicionamiento", detail: "Entiende SEO on-page, off-page y t\u00e9cnico a profundidad." },
  { week: 14, title: "SEO para Nichos \u2013 Domina mercados espec\u00edficos", detail: "Especializa tus estrategias para nichos espec\u00edficos." },
  { week: 15, title: "Freelance y Empleo SEO \u2013 Da el siguiente paso", detail: "Prepara tu perfil profesional para oportunidades reales." },
  { week: 16, title: "Proyecto Final y Certificaci\u00f3n \u2013 Convi\u00e9rtete en Especialista SEO", detail: "Completa tu proyecto final y obt\u00e9n tu certificaci\u00f3n." },
]

export function Curriculum() {
  const [openWeek, setOpenWeek] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-accent">
          16 semanas
        </div>

        <h2 className="max-w-3xl text-balance font-mono text-3xl font-bold text-foreground md:text-4xl">
          Pasa de no saber nada a optimizar tu primer sitio web en 16 semanas
        </h2>

        <div className="mt-10 flex flex-col gap-2">
          {weeks.map((w, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-secondary transition-colors hover:border-border/80"
            >
              <button
                onClick={() => setOpenWeek(openWeek === i ? null : i)}
                className="flex w-full items-center gap-4 px-6 py-4 text-left"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                  {w.week}
                </span>
                <span className="flex-1 text-sm font-medium text-foreground md:text-base">
                  SEMANA {w.week}: {w.title}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                    openWeek === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openWeek === i && (
                <div className="border-t border-border px-6 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {w.detail}
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
