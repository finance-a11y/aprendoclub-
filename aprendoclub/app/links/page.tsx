"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, CalendarCheck, BookOpen, Rocket } from "lucide-react";
import { trackLinkClick } from "@/components/google-analytics";

const links = [
  {
    id: "conoce-aprendoclub",
    label: "Conoce aprendoclub: Academia de SEO y AIO",
    href: "https://www.aprendoclub.com/",
    icon: GraduationCap,
    external: false,
  },
  {
    id: "asesoria-gratuita",
    label: "Agenda una llamada de asesoría gratuita",
    href: "https://links.apturio.com/widget/bookings/aprendoclub-candidatos",
    icon: CalendarCheck,
    external: true,
  },
  {
    id: "curso-seo-principiantes",
    label: "Únete gratis a nuestro curso SEO para principiantes",
    href: "https://www.aprendoclub.com/curso-seo-para-principiantes",
    icon: BookOpen,
    external: false,
  },
];

const socials = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=13055728892",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.157 5.335 5.494 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.516 5.26l-.999 3.648 3.972-1.297zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@aprendoclub",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com/@aprendo.club",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default function LinksPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] py-20 px-6">
      {/* Dots Pattern Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow Blobs */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[var(--primary)] opacity-20 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 bottom-1/4 -z-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-10 blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6"
        >
          <img src="/logo.svg" alt="aprendoclub" className="h-10 w-auto" />
        </motion.a>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mb-4 rounded-full p-[2px] bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--accent)]"
        >
          <img
            src="/arianna-lupi.webp"
            alt="aprendoclub"
            className="h-24 w-24 rounded-full object-cover border-4 border-[var(--bg-primary)]"
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-2xl font-semibold text-white text-center"
        >
          Bienvenido a aprendoclub.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mt-2 text-sm text-gray-400 text-center max-w-xs"
        >
          Somos una academia de marketing e IA que te ayuda a conseguir trabajo.
        </motion.p>

        {/* Social proof badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-4 mb-8 flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-1.5"
        >
          <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
            <Rocket className="h-4 w-4" aria-hidden />
            10.000+ estudiantes
          </span>
        </motion.div>

        {/* Links */}
        <div className="flex w-full flex-col gap-4">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => trackLinkClick(link.id, link.label, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + i * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-secondary)]/60 px-5 py-4 backdrop-blur-sm transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--bg-tertiary)]/60"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary-light)] transition-colors group-hover:bg-[var(--accent)]/15 group-hover:text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1 text-sm font-semibold text-white">
                  {link.label}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400 transition-colors group-hover:text-[var(--accent)]" />
              </motion.a>
            );
          })}
        </div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          className="mt-10 flex items-center gap-4"
        >
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              onClick={() => trackLinkClick(social.id, social.label, social.href)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-glass)] bg-[var(--bg-secondary)]/60 text-gray-300 backdrop-blur-sm transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-xs text-gray-400"
        >
          © {new Date().getFullYear()} aprendoclub
        </motion.p>
      </div>
    </main>
  );
}
