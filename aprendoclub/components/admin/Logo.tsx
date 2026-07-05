/* eslint-disable @next/next/no-img-element */
/** Logo de aprendoclub para la pantalla de login del admin. */
export function Logo() {
  return (
    <img
      src="/logo.svg"
      alt="aprendoclub"
      style={{ width: 'clamp(180px, 45vw, 240px)', height: 'auto' }}
    />
  )
}

export default Logo
