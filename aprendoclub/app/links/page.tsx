"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, CalendarCheck, BookOpen } from "lucide-react";
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
          className="text-2xl font-extrabold text-white text-center"
        >
          aprendoclub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mt-2 mb-8 text-sm text-gray-400 text-center max-w-xs"
        >
          Academia de SEO + IA. Recursos para llevar tu carrera de cero a
          consultor.
        </motion.p>

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
                <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-[var(--accent)]" />
              </motion.a>
            );
          })}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-xs text-gray-600"
        >
          © {new Date().getFullYear()} aprendoclub
        </motion.p>
      </div>
    </main>
  );
}
