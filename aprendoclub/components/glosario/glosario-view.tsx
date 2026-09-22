'use client'

import React, { useState, useMemo } from 'react'
import { Search, X, Link as LinkIcon, Check, Sparkles, BookOpen, Layers, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { Eyebrow } from '@/components/ui/eyebrow'

export interface TerminoItem {
  id: string | number
  termino: string
  slug: string
  definicion: string
  letra: string
  categoria: 'basico' | 'tecnico' | 'onpage' | 'offpage' | 'herramientas' | 'ia-algoritmos' | 'metricas' | string
  destacado?: boolean
  ejemplo?: string
}

interface GlosarioViewProps {
  terminos: TerminoItem[]
}

const CATEGORIES: { key: string; label: string }[] = [
  { key: 'todas', label: 'Todas las áreas' },
  { key: 'basico', label: 'Conceptos Básicos' },
  { key: 'tecnico', label: 'SEO Técnico' },
  { key: 'onpage', label: 'SEO On-Page' },
  { key: 'offpage', label: 'Link Building & Off-Page' },
  { key: 'ia-algoritmos', label: 'IA y Algoritmos' },
  { key: 'herramientas', label: 'Herramientas' },
  { key: 'metricas', label: 'Métricas y Analítica' },
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const CATEGORY_NAMES: Record<string, string> = {
  basico: 'Concepto Básico',
  tecnico: 'SEO Técnico',
  onpage: 'SEO On-Page',
  offpage: 'Link Building',
  'ia-algoritmos': 'IA & Búsqueda',
  herramientas: 'Herramienta SEO',
  metricas: 'Métrica / Analítica',
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-[var(--accent)]/20 text-[var(--accent)] px-0.5 rounded font-medium">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

export function GlosarioView({ terminos }: GlosarioViewProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [selectedLetter, setSelectedLetter] = useState('todas')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  // Conjunto de letras disponibles en los datos
  const availableLetters = useMemo(() => {
    const set = new Set<string>()
    terminos.forEach((t) => {
      if (t.letra) set.add(t.letra.toUpperCase())
    })
    return set
  }, [terminos])

  // Filtrado reactivo en tiempo real
  const filteredTerminos = useMemo(() => {
    const q = search.trim().toLowerCase()

    return terminos.filter((t) => {
      // Filtro de letra
      if (selectedLetter !== 'todas' && t.letra.toUpperCase() !== selectedLetter) {
        return false
      }

      // Filtro de categoría
      if (selectedCategory !== 'todas' && t.categoria !== selectedCategory) {
        return false
      }

      // Filtro de búsqueda
      if (q) {
        const matchTitle = t.termino.toLowerCase().includes(q)
        const matchDef = t.definicion.toLowerCase().includes(q)
        const matchSlug = t.slug.toLowerCase().includes(q)
        return matchTitle || matchDef || matchSlug
      }

      return true
    })
  }, [terminos, search, selectedCategory, selectedLetter])

  // Agrupación por letra cuando no hay búsqueda textual específica
  const groupedByLetter = useMemo(() => {
    const map = new Map<string, TerminoItem[]>()

    filteredTerminos.forEach((item) => {
      const letter = (item.letra || 'A').toUpperCase()
      if (!map.has(letter)) {
        map.set(letter, [])
      }
      map.get(letter)!.push(item)
    })

    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b, 'es'))
  }, [filteredTerminos])

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/glosario#${slug}`
    navigator.clipboard.writeText(url)
    setCopiedSlug(slug)
    setTimeout(() => {
      setCopiedSlug((curr) => (curr === slug ? null : curr))
    }, 2000)
  }

  const handleResetFilters = () => {
    setSearch('')
    setSelectedCategory('todas')
    setSelectedLetter('todas')
  }

  return (
    <div className="w-full">
      {/* Barra de control: Buscador + Filtros */}
      <section className="sticky top-20 z-30 py-4 -mt-2 bg-[#0a0f14]/90 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Fila del Buscador */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar término, concepto, herramienta o definición..."
                className="w-full bg-[#111827] border border-white/15 rounded-xl pl-12 pr-10 py-3 text-white placeholder-white/40 text-sm md:text-base focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs md:text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>
                  Mostrando <strong className="text-white">{filteredTerminos.length}</strong> de {terminos.length}
                </span>
              </span>

              {(search || selectedCategory !== 'todas' || selectedLetter !== 'todas') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-[var(--accent)] hover:underline font-medium cursor-pointer"
                >
                  Reiniciar filtros
                </button>
              )}
            </div>
          </div>

          {/* Fila del Abecedario (A - Z) */}
          <div className="overflow-x-auto pb-1 no-scrollbar">
            <div className="flex items-center gap-1.5 min-w-max">
              <button
                type="button"
                onClick={() => setSelectedLetter('todas')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedLetter === 'todas'
                    ? 'bg-[var(--accent)] text-black'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Todas
              </button>

              {ALPHABET.map((letter) => {
                const hasTerms = availableLetters.has(letter)
                const isSelected = selectedLetter === letter

                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={!hasTerms}
                    onClick={() => setSelectedLetter(letter)}
                    className={`w-7 h-7 flex items-center justify-center text-xs font-semibold rounded-lg transition-all ${
                      isSelected
                        ? 'bg-[var(--accent)] text-black ring-2 ring-[var(--accent)]/30'
                        : hasTerms
                          ? 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10 cursor-pointer'
                          : 'bg-transparent text-white/20 cursor-not-allowed'
                    }`}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Fila de Categorías */}
          <div className="overflow-x-auto pb-1 no-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.key
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--accent)] font-semibold'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contenedor Principal de Términos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredTerminos.length === 0 ? (
          /* Estado Vacío */
          <div className="text-center py-20 px-4 rounded-2xl bg-[#0d1117] border border-white/10 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/40">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No encontramos resultados</h3>
            <p className="text-sm text-white/60 mb-6">
              No hay conceptos en el glosario que coincidan con &ldquo;{search}&rdquo; para los filtros seleccionados.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--accent)] text-black hover:opacity-95 transition-opacity cursor-pointer"
            >
              Ver todos los términos
            </button>
          </div>
        ) : search.trim() ? (
          /* Vista de Búsqueda Activa: Cuadrícula continua de tarjetas */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTerminos.map((item) => (
              <TerminoCard
                key={item.id || item.slug}
                item={item}
                searchQuery={search}
                onCopy={handleCopyLink}
                copied={copiedSlug === item.slug}
              />
            ))}
          </div>
        ) : (
          /* Vista Normal: Agrupada por Letras del Abecedario */
          <div className="space-y-16">
            {groupedByLetter.map(([letter, items]) => (
              <section key={letter} id={`letra-${letter.toLowerCase()}`} className="scroll-mt-48">
                {/* Cabecera de la Letra */}
                <div className="flex items-center gap-4 mb-6 pb-3 border-b border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-2xl font-semibold text-[var(--accent)]">
                    {letter}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white">Letra {letter}</h2>
                    <p className="text-xs text-white/50">{items.length} {items.length === 1 ? 'concepto' : 'conceptos'}</p>
                  </div>
                </div>

                {/* Tarjetas de Términos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item) => (
                    <TerminoCard
                      key={item.id || item.slug}
                      item={item}
                      searchQuery={search}
                      onCopy={handleCopyLink}
                      copied={copiedSlug === item.slug}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Banner CTA Inferior: Invitación al Diplomado / Formación */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#111827] via-[#0d1117] to-[#111827] border border-white/10 p-8 md:p-12">
          <div className="relative z-10 max-w-2xl">
            <Eyebrow className="mb-3">DE LA TEORÍA A LA PRÁCTICA</Eyebrow>
            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">
              Domina estos conceptos en proyectos reales con mentoría en vivo
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
              El SEO moderno va más allá de aprender definiciones. En aprendoclub te formamos para auditar sitios web,
              diseñar estrategias de posicionamiento para Google y optimizar contenidos para motores de IA.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/programas/diplomado"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold text-sm hover:opacity-95 transition-opacity"
              >
                Conocer el Diplomado
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link
                href="/programas"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-medium text-sm hover:bg-white/10 transition-colors"
              >
                Ver todos los programas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TerminoCard({
  item,
  searchQuery,
  onCopy,
  copied,
}: {
  item: TerminoItem
  searchQuery: string
  onCopy: (slug: string) => void
  copied: boolean
}) {
  const catLabel = CATEGORY_NAMES[item.categoria] || item.categoria

  return (
    <article
      id={item.slug}
      className="group relative rounded-xl bg-[#0d1117] border border-white/10 hover:border-[var(--accent)]/40 p-6 md:p-7 transition-all duration-300 flex flex-col justify-between scroll-mt-48 hover:-translate-y-1 hover:shadow-lg"
    >
      <div>
        {/* Cabecera de la Tarjeta */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold text-[var(--accent)]">
              {item.letra}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/10 font-medium">
              {catLabel}
            </span>
            {item.destacado && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] font-medium">
                <Sparkles className="w-3 h-3" />
                Imprescindible
              </span>
            )}
          </div>

          {/* Botón Copiar Enlace Directo */}
          <button
            type="button"
            onClick={() => onCopy(item.slug)}
            title="Copiar enlace directo al término"
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[var(--accent)]" />
            ) : (
              <LinkIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Título del Término */}
        <h3 className="text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">
          <a href={`#${item.slug}`} className="hover:underline">
            {highlightMatch(item.termino, searchQuery)}
          </a>
        </h3>

        {/* Definición */}
        <p className="text-sm md:text-base text-white/70 leading-relaxed">
          {highlightMatch(item.definicion, searchQuery)}
        </p>

        {/* Ejemplo o Aplicación Práctica si existe */}
        {item.ejemplo && (
          <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60">
            <strong className="text-white/80 block mb-1">Ejemplo práctico:</strong>
            {item.ejemplo}
          </div>
        )}
      </div>

      {copied && (
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-[var(--accent)] font-medium">
          <Check className="w-3.5 h-3.5" />
          <span>Enlace copiado al portapapeles</span>
        </div>
      )}
    </article>
  )
}
