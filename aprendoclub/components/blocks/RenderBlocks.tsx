import { blockRenderers } from './render'

type LayoutBlock = { blockType: string; id?: string | null; [key: string]: unknown }

/**
 * Dispatcher server component: recorre `blocks` (Page.layout) y renderiza el
 * componente registrado para cada `blockType`. Tolerante a tipos de bloque
 * aún no registrados (R04-R06 los añadirán incrementalmente a
 * `blockRenderers` sin romper este componente ni el build):
 * - en dev, muestra un aviso visible con `data-unknown-block`
 * - en prod, no renderiza nada para ese bloque (null)
 */
export function RenderBlocks({ blocks }: { blocks: LayoutBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const Renderer = blockRenderers[block.blockType]
        const key = block.id ?? `${block.blockType}-${index}`

        if (!Renderer) {
          if (process.env.NODE_ENV !== 'production') {
            return (
              <div
                key={key}
                data-unknown-block={block.blockType}
                className="container-padding py-8 text-sm text-red-400 border border-dashed border-red-400/40"
              >
                Bloque sin renderer registrado: <code>{block.blockType}</code>
              </div>
            )
          }
          return null
        }

        return <Renderer key={key} block={block} />
      })}
    </>
  )
}

export default RenderBlocks
