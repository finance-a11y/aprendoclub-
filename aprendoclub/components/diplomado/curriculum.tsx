"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Eyebrow } from "@/components/ui/eyebrow"

const weeks = [
  { week: 1, title: "Introducción al SEO - Empezando desde cero", detail: "Aprende a llevar a cabo un proyecto SEO de inicio a fin." },
  { week: 2, title: "Proyecto SEO - Inicia tu camino", detail: "Configura tu primer proyecto SEO real paso a paso." },
  { week: 3, title: "Herramientas SEO - Potencia tu trabajo", detail: "Domina las herramientas esenciales del ecosistema SEO." },
  { week: 4, title: "Palabras clave - La base de tu estrategia", detail: "Aprende a investigar y seleccionar las mejores keywords." },
  { week: 5, title: "Mapa de palabras clave - Enfócate en lo que ya tiene", detail: "Organiza y prioriza tus palabras clave estratégicamente." },
  { week: 6, title: "Análisis de la competencia - Encuentra oportunidades de negocio", detail: "Descubre qué hacen tus competidores y cómo superarlos." },
  { week: 7, title: "Estrategias SEO - Acelera tu crecimiento", detail: "Implementa estrategias probadas para escalar resultados." },
  { week: 8, title: "Producción de contenido - Empieza a crear contenido que posicione", detail: "Crea contenido optimizado que Google ame." },
  { week: 9, title: "Arquitectura web - Organiza una web que Google ame", detail: "Estructura tu sitio para máximo rendimiento SEO." },
  { week: 10, title: "Optimización de contenido existente - Impulsa lo que ya tienes", detail: "Mejora el contenido que ya tienes para obtener más tráfico." },
  { week: 11, title: "Redacción SEO - Escribe para posicionar", detail: "Domina el arte de escribir copy que posiciona." },
  { week: 12, title: "Medición de resultados - Evalúa el éxito de tus estrategias", detail: "Aprende a medir y reportar resultados SEO." },
  { week: 13, title: "Tipos de SEO - Divide y conquista tu posicionamiento", detail: "Entiende SEO on-page, off-page y técnico a profundidad." },
  { week: 14, title: "SEO para Nichos - Domina mercados específicos", detail: "Especializa tus estrategias para nichos específicos." },
  { week: 15, title: "Freelance y Empleo SEO - Da el siguiente paso", detail: "Prepara tu perfil profesional para oportunidades reales." },
  { week: 16, title: "Proyecto Final y Certificación - Conviértete en Especialista SEO", detail: "Completa tu proyecto final y obtén tu certificación." },
]

export function Curriculum() {
  const [openWeek, setOpenWeek] = useState<number | null>(0)

  return (
    <section className="section-spacing">
      <div className="mx-auto max-w-6xl container-padding">
        <Eyebrow className="mb-4 block">16 semanas</Eyebrow>

        <h2 className="max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.2] text-white md:text-4xl">
          Pasa de no saber nada a optimizar tu primer sitio web en 16 semanas
        </h2>

        <div className="mt-10 flex flex-col gap-2">
          {weeks.map((w, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border-card)] bg-[var(--surface-card)] transition-colors hover:border-white/20"
            >
              <button
                onClick={() => setOpenWeek(openWeek === i ? null : i)}
                aria-expanded={openWeek === i}
                aria-controls={`week-panel-${i}`}
                className="flex w-full items-center gap-4 px-6 py-4 text-left"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-xs font-semibold text-[var(--primary-light)]">
                  {w.week}
                </span>
                <span className="flex-1 text-sm font-medium text-white md:text-base">
                  SEMANA {w.week}: {w.title}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                    openWeek === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openWeek === i && (
                <div
                  id={`week-panel-${i}`}
                  role="region"
                  className="border-t border-[var(--border-card)] px-6 py-4"
                >
                  <p className="text-sm leading-relaxed text-gray-400">
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
