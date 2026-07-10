'use client'

import { useState } from 'react'
import { Modal, useField, useModal } from '@payloadcms/ui'
import { DynamicIcon } from 'lucide-react/dynamic'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { normalizeIconName } from '@/lib/blocks/icons'

/**
 * Custom field component genérico para Payload: trigger que muestra el
 * ícono actualmente guardado (o placeholder) y abre un modal. Lee/escribe
 * el valor vía `useField`, sin conocer nada de FeatureGrid ni de ningún
 * bloque específico — reutilizable por cualquier campo de tipo `text` que
 * guarde un nombre de ícono kebab-case.
 *
 * El grid buscable de íconos se agrega en un paso siguiente; este
 * componente ya deja montado el Modal con el trigger de 3 estados
 * (reconocido / vacío / legacy-no-reconocido).
 */
export function IconPicker({ path, field }: { path: string; field?: { label?: string } }) {
  const { value, setValue } = useField<string>({ path })
  const { openModal } = useModal()
  const [query, setQuery] = useState('')

  const modalSlug = `icon-picker-${path}`

  const normalized = normalizeIconName(value)
  const recognized = normalized != null && normalized in dynamicIconImports

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

          {/* Grid del ícono se completa en el paso siguiente. */}
          <div className="icon-picker__grid" />
        </div>
      </Modal>
    </div>
  )
}

export default IconPicker
