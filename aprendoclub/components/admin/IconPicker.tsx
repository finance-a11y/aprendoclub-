'use client'

import { useMemo, useState } from 'react'
import { Modal, useField, useModal } from '@payloadcms/ui'
import { DynamicIcon } from 'lucide-react/dynamic'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { normalizeIconName } from '@/lib/blocks/icons'
import './IconPicker.scss'

/** Cantidad de celdas a renderizar sin query (subset, no los 1914 completos). */
const DEFAULT_VISIBLE_COUNT = 100
/** Cap de resultados renderizados con query activa. */
const MAX_FILTERED_RESULTS = 200

const ALL_ICON_KEYS = Object.keys(dynamicIconImports)

/**
 * Custom field component genérico para Payload: trigger que muestra el
 * ícono actualmente guardado (o placeholder) y abre un modal con grid
 * buscable de los 1914 íconos de lucide. Lee/escribe el valor vía
 * `useField`, sin conocer nada de FeatureGrid ni de ningún bloque
 * específico — reutilizable por cualquier campo de tipo `text` que
 * guarde un nombre de ícono kebab-case.
 */
export function IconPicker({ path, field }: { path: string; field?: { label?: string } }) {
  const { value, setValue } = useField<string>({ path })
  const { openModal, closeModal } = useModal()
  const [query, setQuery] = useState('')

  const modalSlug = `icon-picker-${path}`

  const normalized = normalizeIconName(value)
  const recognized = normalized != null && normalized in dynamicIconImports

  const visibleKeys = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return ALL_ICON_KEYS.slice(0, DEFAULT_VISIBLE_COUNT)
    return ALL_ICON_KEYS.filter((key) => key.includes(trimmed)).slice(0, MAX_FILTERED_RESULTS)
  }, [query])

  const hasQuery = query.trim().length > 0
  const noResults = hasQuery && visibleKeys.length === 0

  const handleSelect = (key: string) => {
    setValue(key)
    setQuery('')
    closeModal(modalSlug)
  }

  const label = field?.label ?? 'Ícono'

  return (
    <div className="icon-picker">
      <label className="icon-picker__label">{label}</label>

      <button
        type="button"
        className="icon-picker__trigger"
        onClick={() => openModal(modalSlug)}
      >
        {recognized && normalized ? (
          <>
            <DynamicIcon name={normalized as keyof typeof dynamicIconImports} className="icon-picker__trigger-icon" />
            <span className="icon-picker__trigger-label">Cambiar ícono</span>
          </>
        ) : value ? (
          <>
            <span className="icon-picker__trigger-icon icon-picker__trigger-icon--placeholder" aria-hidden="true" />
            <span className="icon-picker__trigger-label">
              Sin ícono
              <span className="icon-picker__trigger-legacy">
                {' '}(valor guardado: `{value}`, no reconocido)
              </span>
            </span>
          </>
        ) : (
          <>
            <span className="icon-picker__trigger-icon icon-picker__trigger-icon--placeholder" aria-hidden="true" />
            <span className="icon-picker__trigger-label">Sin ícono</span>
          </>
        )}
      </button>

      <Modal slug={modalSlug} className="icon-picker__modal">
        <div className="icon-picker__modal-content">
          <h2 className="icon-picker__modal-title">Elegir ícono</h2>

          <input
            type="text"
            className="icon-picker__search"
            placeholder="Buscar ícono (ej. rocket, target, arrow-right)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          {!hasQuery && (
            <p className="icon-picker__hint">Escribí para buscar entre los 1914 disponibles</p>
          )}

          {noResults ? (
            <p className="icon-picker__no-results">
              No se encontró ningún ícono para &apos;{query}&apos;. Probá con otro término en
              inglés (los nombres de lucide están en inglés, ej. &apos;rocket&apos; no
              &apos;cohete&apos;).
            </p>
          ) : (
            <div className="icon-picker__grid">
              {visibleKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  role="button"
                  tabIndex={0}
                  aria-label={key}
                  className="icon-picker__cell"
                  onClick={() => handleSelect(key)}
                >
                  <DynamicIcon name={key as keyof typeof dynamicIconImports} className="icon-picker__cell-icon" />
                  <span className="icon-picker__cell-label">{key}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default IconPicker
