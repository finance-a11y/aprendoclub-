---
phase: 29
plan: 1
completed: 2026-07-22
---

# Summary 29-01

Causa raíz de las imágenes rotas (galería Diplomado, equipo, avatares de testimonios) identificada: HTTP 402 de Vercel Image Optimization por cuota de transforms agotada, confirmado con network requests reales en producción — no un bug de código. `next.config.ts` `images.deviceSizes` recortado a `[640, 750, 828, 1080, 1200]` (antes hasta 3840px) como prevención adicional, complementando el commit `516be82` del mismo día. Juan confirmó que espera el reset de cuota externamente; se continúa con el resto del milestone.
