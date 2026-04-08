import { Mail } from "lucide-react"

const navigation = [
  { label: "Inicio", href: "#" },
  { label: "Contacto", href: "#contact" },
  { label: "Pol\u00edtica de privacidad", href: "#" },
  { label: "Pol\u00edtica de reembolso", href: "#" },
  { label: "T\u00e9rminos y condiciones", href: "#" },
]

const education = [
  "Webinars",
  "Cursos",
  "Gu\u00edas",
  "Diplomado",
  "Glosario",
]

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-mono text-lg font-bold text-foreground">
              aprendoclub
            </h3>
            <a
              href="mailto:hola@aprendoclub.com"
              className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" />
              hola@aprendoclub.com
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              {'© 2025 aprendoclub. Todos los derechos reservados.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Navegaci&oacute;n
            </h4>
            <ul className="flex flex-col gap-2">
              {navigation.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Educaci&oacute;n
            </h4>
            <ul className="flex flex-col gap-2">
              {education.map((item, i) => (
                <li key={i}>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
