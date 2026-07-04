"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  siteNav,
  siteCta,
  footerMeta,
  programMenu,
  type NavItem,
} from "@/content/site";

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.href === "/") return pathname === "/";
  if (item.href === "/programas") return pathname.startsWith("/programas");
  return pathname === item.href;
}

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [programaOpen, setProgramaOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programaTriggerRef = useRef<HTMLAnchorElement>(null);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProgramaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setProgramaOpen(false), 120);
  };

  // Scroll listener for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Cerrar el menú al pasar a desktop (>=768px) para que el scroll-lock
  // no quede pegado tras un resize/rotación con el panel abierto.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileMenuOpen(false);
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Accesibilidad del panel modal mobile: cerrar con Escape, mover el foco
  // al panel al abrir y devolverlo al botón hamburguesa al cerrar.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      toggleRef.current?.focus();
    };
  }, [isMobileMenuOpen]);

  const underlineTransition = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 380, damping: 30 } as const);

  return (
    <>
      <motion.nav
        initial={reduceMotion ? false : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          isScrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="flex h-full items-center justify-between container-padding max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="aprendoclub"
              width={166}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {siteNav.map((item) => {
              const active = isItemActive(item, pathname);
              const className = `relative text-sm font-medium transition-colors ${
                active ? "text-white" : "text-gray-400 hover:text-white"
              }`;
              const underline = active && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent)]"
                  transition={underlineTransition}
                />
              );

              // Item "Programas": megamenú al hacer hover/focus.
              if (item.href === "/programas") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    onFocus={openMega}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        closeMega();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape" && programaOpen) {
                        if (closeTimer.current) clearTimeout(closeTimer.current);
                        setProgramaOpen(false);
                        programaTriggerRef.current?.focus();
                      }
                    }}
                  >
                    <Link
                      ref={programaTriggerRef}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-haspopup="menu"
                      aria-expanded={programaOpen}
                      className={className}
                    >
                      {item.label}
                      {underline}
                    </Link>

                    <AnimatePresence>
                      {programaOpen && (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                          transition={{ duration: reduceMotion ? 0 : 0.18 }}
                          role="menu"
                          aria-label="Programas"
                          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4"
                        >
                          <div className="w-[360px] overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-card)] bg-[var(--surface-card)]/95 backdrop-blur-xl shadow-[var(--shadow-lg)]">
                            <div className="flex flex-col p-2">
                              {programMenu.map((p) => (
                                <Link
                                  key={p.href}
                                  href={p.href}
                                  role="menuitem"
                                  onClick={() => setProgramaOpen(false)}
                                  className="group/mega flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-white group-hover/mega:text-[var(--accent)] transition-colors">
                                        {p.label}
                                      </span>
                                      <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
                                        {p.badge}
                                      </span>
                                    </div>
                                    <p className="mt-1 text-xs leading-relaxed text-gray-400">
                                      {p.desc}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <Link
                              href="/programas"
                              onClick={() => setProgramaOpen(false)}
                              className="flex items-center justify-center border-t border-white/10 px-4 py-3 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                            >
                              Ver todos los programas
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return item.type === "route" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={className}
                >
                  {item.label}
                  {underline}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={className}
                >
                  {item.label}
                  {underline}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <Button
            href={siteCta.href}
            variant="primary"
            className="hidden md:flex px-5 py-2.5 text-sm"
          >
            {siteCta.label}
          </Button>

          {/* Mobile Menu Button */}
          <button
            ref={toggleRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center min-w-11 min-h-11 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              ref={panelRef}
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              tabIndex={-1}
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", damping: 25, stiffness: 200 }
              }
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-[var(--bg-primary)] border-l border-white/10 md:hidden focus:outline-none"
            >
              <div className="flex flex-col h-full p-6 pt-20">
                {/* Mobile Nav Links */}
                <div className="flex flex-col gap-2">
                  {siteNav.map((item, index) => {
                    const active = isItemActive(item, pathname);
                    const className = `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`;
                    const dot = active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    );
                    const motionProps = reduceMotion
                      ? {}
                      : {
                          initial: { opacity: 0, x: 20 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: index * 0.1 },
                        };

                    return item.type === "route" ? (
                      <motion.div key={item.href} {...motionProps}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={className}
                        >
                          {item.label}
                          {dot}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={className}
                        {...motionProps}
                      >
                        {item.label}
                        {dot}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Mobile CTA */}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.4 }}
                  className="mt-6"
                >
                  <div onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      href={siteCta.href}
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      {siteCta.label}
                    </Button>
                  </div>
                </motion.div>

                {/* Footer info */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400">
                    {footerMeta.mobilePanelBlurb}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
