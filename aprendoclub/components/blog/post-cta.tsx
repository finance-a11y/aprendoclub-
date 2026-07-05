import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'

/**
 * CTA al final del artículo — reemplaza el embed de formulario Kajabi que
 * aprendoseo inyectaba mid-artículo (decisión de Fase 18). Envía al diplomado.
 */
export function PostCta() {
  return (
    <aside className="my-4 flex flex-col items-center gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/10 px-8 py-10 text-center">
      <Eyebrow>¿Quieres aprender SEO en serio?</Eyebrow>
      <h3 className="max-w-xl text-2xl font-semibold leading-tight text-white">
        Conviértete en especialista SEO desde cero con el Diplomado de aprendoclub
      </h3>
      <p className="max-w-lg text-sm text-gray-400">
        16 semanas de práctica real, coaching en vivo y certificación. Sin
        experiencia previa ni tecnicismos.
      </p>
      <Button href="/diplomado">Ver el diplomado</Button>
    </aside>
  )
}

export default PostCta
