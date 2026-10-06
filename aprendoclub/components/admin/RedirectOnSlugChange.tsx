'use client'

import { useDocumentInfo, useField, useFormFields } from '@payloadcms/ui'

import './RedirectOnSlugChange.scss'

type Kind = 'page' | 'blogpost' | 'category'

const COPY: Record<Kind, { noun: string; extra?: string }> = {
  page: { noun: 'la página' },
  blogpost: { noun: 'el artículo' },
  category: {
    noun: 'la categoría',
    extra: ' También cubre las URLs de todos sus artículos.',
  },
}

/** Id de una relación que llega como número, string o documento poblado. */
function relId(value: unknown): string {
  if (value && typeof value === 'object' && 'id' in value) return String((value as { id: unknown }).id)
  return value == null ? '' : String(value)
}

/**
 * Campo virtual `createRedirect`. Solo aparece al editar un documento ya
 * guardado cuyo slug (o categoría, en artículos) cambió. La redirección desde
 * la URL anterior está activa por defecto; el botón la quita o la restaura.
 */
export function RedirectOnSlugChange({ path, kind }: { path: string; kind: Kind }) {
  const { value, setValue } = useField<boolean>({ path })
  const { id, initialData } = useDocumentInfo()
  const slug = useFormFields(([fields]) => fields.slug?.value) as string | undefined
  const category = useFormFields(([fields]) => fields.category?.value)

  const savedSlug = (initialData as { slug?: string } | undefined)?.slug
  const savedCategory = relId((initialData as { category?: unknown } | undefined)?.category)

  const slugChanged = Boolean(savedSlug) && typeof slug === 'string' && slug !== savedSlug
  const categoryChanged = kind === 'blogpost' && savedCategory !== '' && relId(category) !== savedCategory
  if (!id || (!slugChanged && !categoryChanged)) return null

  const active = value !== false
  const { noun, extra = '' } = COPY[kind]
  const what = slugChanged ? `el slug de ${noun}` : 'la categoría del artículo'

  return (
    <div className="redirect-on-slug-change">
      <p className="redirect-on-slug-change__text" role="status" aria-live="polite">
        {slugChanged ? (
          <>
            Cambiaste {what} de <code>{savedSlug}</code> a <code>{slug}</code>.{extra}
          </>
        ) : (
          <>Cambiaste {what}.</>
        )}{' '}
        {active
          ? 'Al guardar, la URL anterior redirigirá a la nueva.'
          : 'Sin redirección, la URL anterior dará 404 y se pierde su tráfico y su SEO.'}
      </p>
      <button
        type="button"
        className="redirect-on-slug-change__button"
        aria-pressed={active}
        onClick={() => setValue(!active)}
      >
        {active ? 'Quitar redirección automática' : 'Agregar redirección automática'}
      </button>
    </div>
  )
}
