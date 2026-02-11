import { Linkedin, Youtube, Instagram } from "lucide-react";

const footerColumns = [
  {
    title: "Programa",
    links: [
      { label: "Cursos", href: "#beneficios" },
      { label: "Precios", href: "#precios" },
      { label: "Comunidad", href: "#beneficios" },
      { label: "Testimonios", href: "#testimonios" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog", href: "#" },
      { label: "Guías SEO", href: "#" },
      { label: "Herramientas", href: "#" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos de servicio", href: "#" },
      { label: "Privacidad", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

const socialIcons = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-primary)] border-t border-white/[0.06]">
      {/* Main Grid */}
      <div className="container-padding py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <a href="/" className="flex items-center w-fit">
              <img
                src="/logo.svg"
                alt="aprendoclub"
                className="h-6 w-auto"
              />
            </a>
            <p className="text-sm leading-relaxed text-gray-500">
              La plataforma educativa para especialistas en SEO. Cursos, comunidad y mentorías.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-white">
                {col.title}
              </span>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/[0.06] container-padding py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-600">
            © {new Date().getFullYear()} aprendoclub. Todos los derechos reservados.
          </span>
          <span className="text-sm text-gray-600">
            Hecho con 💚 para la comunidad SEO
          </span>
        </div>
      </div>
    </footer>
  );
}
