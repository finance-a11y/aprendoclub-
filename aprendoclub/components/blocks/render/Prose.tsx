import { RichText } from '@payloadcms/richtext-lexical/react'
import type { ProseBlock as ProseBlockType } from '@/payload-types'

/**
 * Render de 'prose': richText Lexical vía el serializer oficial de
 * @payloadcms/richtext-lexical (NUNCA dangerouslySetInnerHTML).
 */
export function Prose({ block }: { block: ProseBlockType }) {
  if (!block.contenido) return null

  return (
    <section className="container-padding section-spacing max-w-3xl mx-auto w-full">
      <div className="measure-prose text-gray-300 leading-relaxed">
        {/* @ts-expect-error -- payload-types' generated ProseBlock.contenido shape
            is structurally compatible with SerializedEditorState but typed loosely */}
        <RichText data={block.contenido} />
      </div>
    </section>
  )
}

export default Prose
