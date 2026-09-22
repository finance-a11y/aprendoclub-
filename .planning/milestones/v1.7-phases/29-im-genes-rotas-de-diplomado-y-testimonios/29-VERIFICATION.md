---
phase: 29
status: human_needed
verified: 2026-07-22
---

# Verification: Phase 29 — Imágenes rotas de Diplomado y testimonios

## Success Criteria

1. **La galería del Diplomado (`diplomadoGaleria`) muestra sus imágenes cargadas (`naturalWidth > 0`) en `/diplomado` en producción.**
   Estado: **No verificable hoy.** Causa raíz confirmada (HTTP 402 de Vercel Image Optimization, cuota de transforms agotada) — no un bug de código. Depende del reset de cuota de Vercel o upgrade de plan, externo al código.
2. **Las fotos del equipo (`teamGridRef`) en `/diplomado` cargan sin roturas.**
   Estado: **No verificable hoy**, misma causa raíz.
3. **Los avatares de los 3 testimonios destacados del home cargan sin roturas.**
   Estado: **No verificable hoy**, misma causa raíz.
4. **La causa raíz del bug queda identificada y documentada.**
   Estado: ✅ **Cumplido.** Ver `29-CONTEXT.md` y `29-01-PLAN.md` — HTTP 402 en `/_next/image`, confirmado con network requests reales contra producción.

## Root cause

Cuota de Vercel Image Optimization transforms agotada en el período de facturación actual. Confirmado con Chrome DevTools: 11 de 12 requests a `/_next/image` devolvieron 402 durante la sesión; la única que devolvió 200 ya estaba cacheada de una transformación previa exitosa. No es reproducible corrigiendo código — es cuota de cuenta.

## Mitigación de código aplicada

`next.config.ts`: `images.deviceSizes` recortado de la lista default de Next (hasta 3840px) a `[640, 750, 828, 1080, 1200]`, complementando el commit `516be82` (mismo día) que ya redujo duplicación de formato y agregó cache largo. Reduce la huella de transforms going forward; no revierte la cuota ya consumida.

## Decisión de Juan

Confirmado en conversación: "ya arreglé eso, toca esperar a que se reinicie el límite, continúa con el resto". Verificación visual real diferida — no bloquea el resto del milestone.

## Resume

Cuando la cuota de Vercel resetee (o se haga upgrade), correr `/gsd-verify-work 29` para confirmar visualmente que las 3 imágenes/galerías cargan en producción.
