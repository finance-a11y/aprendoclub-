'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { Faq, FaqRefBlock as FaqRefBlockType } from '@/payload-types'

/**
 * Render de 'faqRef': eyebrow + título + acordeón sobre `items` (docs `faq`
 * poblados a depth>=2 vía Local API en la ruta catch-all).
 * Espeja components/faq-section.tsx (misma marca/acordeón).
 */
export function FaqRef({ block }: { block: FaqRefBlockType }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = (block.items ?? []).filter(
    (item): item is Faq => typeof item === 'object' && item !== null,
  )
  if (items.length === 0) return null

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="flex w-full flex-col items-center gap-12 lg:gap-16 bg-[var(--bg-secondary)] container-padding section-spacing">
      <div className="flex max-w-[700px] flex-col items-center gap-4">
        {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
        {block.titulo && (
          <h2 className="text-center text-[1.75rem] md:text-4xl font-semibold leading-[1.2] text-white">
            {block.titulo}
          </h2>
        )}
      </div>

      <div className="w-full max-w-3xl mx-auto">
        {items.map((faq, index) => (
          <div
            key={faq.id}
            className={
              index !== items.length - 1 ? 'border-b border-white/[0.06]' : ''
            }
          >
            <button
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
              className="group flex w-full items-center justify-between py-5 text-left"
            >
              <span
                className={`text-lg font-semibold pr-4 transition-colors duration-300 ${
                  openIndex === index
                    ? 'text-white'
                    : 'text-white group-hover:text-white/80'
                }`}
              >
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden min-h-0">
                <p className="pb-5 text-base leading-relaxed text-gray-400">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FaqRef
