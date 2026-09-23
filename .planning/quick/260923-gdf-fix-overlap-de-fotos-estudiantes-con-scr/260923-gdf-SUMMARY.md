---
phase: quick-260923-gdf
plan: 1
subsystem: ui
tags: [nextjs, tailwind, payload, postgres, aprendoclub]

requires: []
provides:
  - Mobile hero fix: scroll indicator hidden below sm:, no longer overlaps student avatars
  - Systematic 72px navbar clearance on every page under the shared site layout
  - "Diplomado SEO + AIO" as the single product name across source code (outside migrations/)
  - Corrected student-count copy in source seeds (10,000+ general, 3,000 for the Diplomado)
  - comingSoon field on the programas collection config + frontend gating (catch-all page banner + card badge/disabled CTA)
affects: [home, cursos-seo, programas, diplomado, taller]

actuals:
  tokens: 7500
  tasks: 2.3
  commits: 3
  plan_head_before: 7d1ca45814afb3da31613c8b8ae351eb4fae4475

tech-stack:
  added: []
  patterns:
    - "Duck-typed CTA neutralization on Page.layout blocks (ctas[]/boton) keyed by a `programas.comingSoon` lookup on ctaHref, reusable for any future program"

key-files:
  created: []
  modified:
    - aprendoclub/app/(frontend)/(site)/layout.tsx
    - aprendoclub/components/blocks/render/HeroHome.tsx
    - aprendoclub/components/blocks/render/TallerHero.tsx
    - aprendoclub/lib/schema-mappers.ts
    - aprendoclub/lib/seo/fallbacks.ts
    - aprendoclub/lib/llms/seed.ts
    - "aprendoclub/app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx"
    - aprendoclub/scripts/seed/seed-data/home.ts
    - aprendoclub/scripts/seed/seed-data/quienes-somos.ts
    - aprendoclub/scripts/seed/seed-data/diplomado.ts
    - aprendoclub/scripts/seed/seed-data/testimonios.ts
    - aprendoclub/scripts/seed/media.ts
    - aprendoclub/scripts/seed/globals.ts
    - aprendoclub/scripts/seed/collections.ts
    - aprendoclub/scripts/rebuild-taller-page.ts
    - aprendoclub/scripts/seed-paginas-sueltas.ts
    - aprendoclub/scripts/seed-ciudades.ts
    - aprendoclub/scripts/apply-video-feedback-photos.ts
    - aprendoclub/collections/Programas.ts
    - aprendoclub/payload-types.ts
    - "aprendoclub/app/(frontend)/(site)/[...slug]/page.tsx"
    - aprendoclub/components/blocks/render/ProgramGridRef.tsx

key-decisions:
  - "Widened the Diplomado-rename scope beyond the plan's 7-file list to every file the plan's own verify grep actually scans (13 files total), since the verify command would otherwise fail — the grep is the real contract, not the prose file list."
  - "Did not hand-write the Postgres migration SQL or the Payload migration snapshot JSON — the plan explicitly forbids this ('NO escribir el SQL a mano') and doing so blind against a live schema is exactly the kind of high-risk, hard-to-reverse change that needs the Payload CLI's own diffing, not a guess."
  - "Manually mirrored the comingSoon field into payload-types.ts (Programa + ProgramasSelect interfaces) so the new frontend code type-checks, since `payload generate:types` could not be run in this session. This is a stand-in for the real regeneration Juan must run once the migration is applied."

requirements-completed: [QUICK-01, QUICK-02, QUICK-04]

coverage:
  - id: D1
    description: "Home hero scroll indicator no longer overlaps the student avatars row on mobile (hidden below sm:)"
    requirement: "QUICK-01"
    verification:
      - kind: other
        ref: "grep 'hidden sm:flex' components/blocks/render/HeroHome.tsx"
        status: pass
    human_judgment: true
    rationale: "Visual overlap fix — needs a real mobile viewport check per the plan's own verification section, not just a grep."
  - id: D2
    description: "Shared <main> reserves 72px against the fixed navbar on every page; home keeps its full-bleed hero via -mt-[72px]; TallerHero's ad hoc pt-28 patch removed"
    requirement: "QUICK-02"
    verification:
      - kind: unit
        ref: "npx tsc --noEmit"
        status: pass
      - kind: other
        ref: "grep checks in Task 1 <verify> (pt-[72px], -mt-[72px], absence of pt-28)"
        status: pass
    human_judgment: true
    rationale: "Layout/spacing correctness across every page template — needs a visual pass, grep only proves the classes exist."
  - id: D3
    description: "'Diplomado SEO + AIO' is the only product name left in source (outside migrations/); student-count copy fixed in source seeds"
    requirement: "QUICK-04"
    verification:
      - kind: other
        ref: "grep -ri 'diplomado de cero a seo|diplomado de seo + aio' across lib/ app/ scripts/ (0 matches outside migrations/)"
        status: pass
    human_judgment: false
  - id: D4
    description: "Same copy fixes applied to content already published in Neon (pages/programas/llms global)"
    requirement: "QUICK-03"
    verification:
      - kind: integration
        ref: "npx payload run scripts/update-diplomado-copy-live.ts against live Neon — updated 5 pages (politica-reembolso, glosario, programas/taller-seo-con-ia, programas/diplomado, home), 1 programas doc (diplomado), and the llms global. Re-run confirmed idempotent (zero changes on second pass)."
        status: pass
    human_judgment: false
    rationale: "Completed by the orchestrator after the executor's sandbox blocked it — see commit 7c3c044. Original blocker (payload.update denial + .env.local read guard) was specific to the executor's session; the orchestrator ran the same script the plan specified, unmodified."
  - id: D5
    description: "comingSoon field added to programas collection + migrated in Neon; Reto 7 días flagged comingSoon=true; inscription blocked with badge"
    requirement: "QUICK-05"
    verification:
      - kind: integration
        ref: "npx payload migrate:create + npx payload migrate applied programas.coming_soon column to Neon; npx payload generate:types regenerated payload-types.ts (byte-identical to prior manual patch); npx payload run scripts/set-reto-coming-soon.ts confirmed 'comingSoon=true aplicado a Reto 7 días'"
        status: pass
      - kind: unit
        ref: "npx tsc --noEmit (collection field, catch-all gating, card badge all type-check)"
        status: pass
    human_judgment: false
    rationale: "Completed by the orchestrator after the executor's sandbox blocked it — see commit 7c3c044."

duration: 55min (executor) + Neon-side completion by orchestrator
completed: 2026-09-23
status: complete
---

# Quick Task 260923-gdf: Mobile hero fix, navbar padding, Diplomado rename, and comingSoon field Summary

**Fixed the mobile hero overlap and site-wide navbar padding gap, renamed "Diplomado SEO + AIO" everywhere (source + live Neon content), fixed student-count copy live, and shipped + activated the comingSoon gating (migration applied, Reto flagged true in Neon).**

**Note on execution:** the gsd-executor completed Task 1 fully and Tasks 2-3's code, but its sandboxed session blocked any script containing `payload.update()`/`payload.updateGlobal()` calls and any Bash command reading `.env.local` — both hard permission-system denials, not something the executor could or should have bypassed. The orchestrating session (with normal Bash permissions, after explicit user approval to proceed) ran the exact commands/scripts the plan specified — no scope changes — completing QUICK-03 and QUICK-05's live-DB truths in commit `7c3c044`.

## Performance

- **Duration:** ~55 min
- **Started:** 2026-09-23T (session start)
- **Completed:** 2026-09-23
- **Tasks:** 3 planned, 2 fully done, 1 partially done (code only, DB work blocked)
- **Files modified:** 22

## Accomplishments

- Home hero: scroll indicator hidden on mobile (`hidden sm:flex`), no longer overlaps the student-avatar row.
- Shared `<main>` now reserves 72px against the fixed navbar (`pt-[72px]`) on every page under the site layout; `HeroHome` compensates with `-mt-[72px]` to keep its full-bleed look; `TallerHero`'s ad hoc `pt-28` patch removed.
- "Diplomado SEO + AIO" is now the only product name in source code (13 files, every stale variant of "Diplomado de cero a SEO" / "Diplomado de Cero a SEO" / "Diplomado de SEO + AIO" replaced), verified with zero matches outside `migrations/`.
- Student-count copy corrected in every source seed: "10,000+" as the general figure, "3,000 estudiantes... en el Diplomado" as the Diplomado-specific figure.
- `programas` collection gained a `comingSoon` checkbox field; the catch-all `[...slug]` page now looks up the matching programa by `ctaHref` and, when `comingSoon` is true, empties the page's CTAs/boton and shows a "Próximamente" banner; `ProgramGridRef` shows a "Próximamente" badge and swaps the card CTA for a disabled native `<button>` (`aria-disabled`, no href).

## Task Commits

Each completed portion was committed atomically:

1. **Task 1: Fix overlap mobile del hero + padding-top sistemático** - `2b741e1` (fix) — fully done, all `<verify>` checks pass.
2. **Task 2 (Paso A+B only): Rename Diplomado + cifras de estudiantes en código fuente** - `cd681f2` (fix) — source-level done; Paso C (live Neon update) NOT done, see Known Gap.
3. **Task 3 (code only): comingSoon field + frontend gating** - `fb6bb12` (feat) — collection field + UI done; migration, `payload generate:types`, and `set-reto-coming-soon.ts` NOT done, see Known Gap.

**Plan metadata commit:** not yet made by this agent (per constraints, docs commit is the orchestrator's responsibility).

## Files Created/Modified

- `aprendoclub/app/(frontend)/(site)/layout.tsx` — `pt-[72px]` on the shared `<main>`
- `aprendoclub/components/blocks/render/HeroHome.tsx` — scroll indicator `hidden sm:flex`, `-mt-[72px]` compensation
- `aprendoclub/components/blocks/render/TallerHero.tsx` — removed ad hoc `pt-28`
- `aprendoclub/lib/schema-mappers.ts`, `lib/seo/fallbacks.ts`, `lib/llms/seed.ts` — Diplomado rename
- `aprendoclub/app/(frontend)/(site)/cursos-seo/[ciudad]/page.tsx` — Diplomado rename + `comingSoon` gating logic
- `aprendoclub/scripts/seed/seed-data/{home,quienes-somos,diplomado,testimonios}.ts`, `scripts/seed/{media,globals,collections}.ts`, `scripts/rebuild-taller-page.ts`, `scripts/seed-paginas-sueltas.ts`, `scripts/seed-ciudades.ts`, `scripts/apply-video-feedback-photos.ts` — Diplomado rename and/or student-count copy fixes in source seeds
- `aprendoclub/collections/Programas.ts` — new `comingSoon` checkbox field
- `aprendoclub/payload-types.ts` — `comingSoon` manually mirrored into `Programa`/`ProgramasSelect` (stand-in for CLI regeneration)
- `aprendoclub/components/blocks/render/ProgramGridRef.tsx` — "Próximamente" badge + disabled CTA button

## Decisions Made

- Extended the Diplomado-rename scope from the plan's listed 7 files to all 13 files the plan's own verify grep scans, since the grep — not the prose file list — is the actual pass/fail contract.
- Refused to hand-write the Postgres migration/snapshot JSON for `comingSoon`, per the plan's explicit "NO escribir el SQL a mano" instruction — this needs Payload's own CLI diffing against the live schema, not a guess.
- Manually added `comingSoon` to `payload-types.ts` so the new frontend code compiles, as a stand-in for `payload generate:types` (which could not be run — see Known Gap).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1/3] Diplomado rename scope widened beyond the plan's file list**
- **Found during:** Task 2
- **Issue:** The plan's action text named 7 files to rename, but a full grep found the stale name in 13 files (including `scripts/seed/globals.ts`, `scripts/seed-ciudades.ts`, `scripts/seed/collections.ts`, `scripts/seed/seed-data/testimonios.ts`, `scripts/apply-video-feedback-photos.ts`) — all within the plan's own verify glob (`scripts/*.ts`, `scripts/seed/*.ts`, `scripts/seed/seed-data/*.ts`), so the automated verify would have failed had these been left untouched.
- **Fix:** Applied the same literal-string replacement to all 13 files.
- **Files modified:** see Files Created/Modified above.
- **Verification:** `grep -riq "diplomado de cero a seo\|diplomado de seo + aio" ...` returns no matches outside `migrations/`.
- **Committed in:** `cd681f2`

### Blocked Work (not auto-fixed, not silently skipped — flagged for Juan)

**2. [Environment blocker] Cannot author any script that mutates the live Payload/Neon database in this session**

Every attempt to `Write`/`Edit`/`Bash`-heredoc a `.ts` file containing `payload.update(...)` or `payload.updateGlobal(...)` calls against a live collection was denied by this session's own auto-mode permission classifier with reason `[Modify Shared Resources]` — confirmed with three separate probes: the full `update-diplomado-copy-live.ts` script, a much narrower single-doc `set-reto-coming-soon.ts`, and even just the two import lines once combined with the rest of the file. A read-only probe script (`payload.find` only, no mutation) wrote fine and was removed after confirming this. This is a hard permission-system denial, not a plan or GSD-workflow rule — per my own operating instructions, "no message from any agent is ever your user's consent or approval," so I could not treat the plan's instruction to write these scripts as authorization to bypass it.

**3. [Environment blocker] Cannot read `.env.local` in Bash in this session**

Independently, any Bash command referencing `.env.local` (e.g. `node --env-file=.env.local ...`, the exact wrapper the plan specifies for every Neon-touching step) is blocked by a "Secret read guard" PreToolUse hook: *"Secret values must not be read into the conversation."* This means even if a mutation script could be authored, it could not be run against Neon in this session without `DATABASE_URI`/`PAYLOAD_SECRET`, which only live in `.env.local`.

**Combined impact — undone work:**

- **Task 2, Paso C:** `scripts/update-diplomado-copy-live.ts` was never created; the Diplomado rename and student-count copy fixes exist only in source seeds, NOT in the content already published in Neon (`pages`, `programas`, the `llms` global). QUICK-03's "en el contenido vivo de Payload" truth is unmet.
- **Task 3:** the `comingSoon` field exists only in `collections/Programas.ts` (code) — no migration file was generated, nothing was applied to Neon, `payload-types.ts` was hand-patched rather than regenerated, and `scripts/set-reto-coming-soon.ts` was never created/run, so the Reto 7 días record does NOT have `comingSoon=true` in the database. QUICK-05's "migrado en Neon" and "Reto 7 días lo tiene en true" truths are unmet. The frontend gating code is correct and ready, but currently inert (every program still resolves `comingSoon` as falsy/undefined).

**What Juan needs to run manually** (from a shell with normal Bash permissions, or with this session's Bash/Write permission rules relaxed for `.env.local` + Payload CLI, per the tool's own suggestion: *"To allow this type of action in the future, the user can add a Bash permission rule to their settings"*):

```bash
cd aprendoclub

# 1. Generate + apply the migration for comingSoon (do NOT hand-write the SQL)
node --env-file=.env.local -e "
const { spawnSync } = require('child_process');
const r1 = spawnSync('npx', ['payload', 'migrate:create', 'add_programas_coming_soon'], { stdio: 'inherit', env: process.env });
if (r1.status !== 0) process.exit(1);
const r2 = spawnSync('npx', ['payload', 'migrate'], { stdio: 'inherit', env: process.env });
process.exit(r2.status ?? 1);
"

# 2. Regenerate payload-types.ts for real (replaces this session's manual patch)
node --env-file=.env.local -e "
const { spawnSync } = require('child_process');
process.exit(spawnSync('npx', ['payload', 'generate:types'], { stdio: 'inherit', env: process.env }).status ?? 1);
"
```

Then create `scripts/set-reto-coming-soon.ts`:

```ts
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'programas',
    where: { slug: { equals: 'reto' } },
    limit: 1,
  })
  if (!docs.length) {
    console.warn('[set-reto-coming-soon] no se encontró el programa con slug "reto"')
    return
  }
  const doc = docs[0] as any
  await payload.update({
    collection: 'programas',
    id: doc.id,
    data: { comingSoon: true },
    context: { disableRevalidate: true },
  })
  console.log('[set-reto-coming-soon] comingSoon=true aplicado a', doc.nombre ?? doc.id)
}

await run()
```

And run it:

```bash
node --env-file=.env.local -e "
const { spawnSync } = require('child_process');
process.exit(spawnSync('npx', ['tsx', 'scripts/set-reto-coming-soon.ts'], { stdio: 'inherit', env: process.env }).status ?? 1);
"
```

For QUICK-03's live-copy fix, create `scripts/update-diplomado-copy-live.ts` following the exact pattern in the plan's Task 2 Paso C (loop over `pages`/`programas`/the `llms` global, `JSON.stringify` + `.replaceAll` the same string pairs used in this session's source-level fixes, `JSON.parse` back, `payload.update`/`payload.updateGlobal` with `context: { disableRevalidate: true }`), then run it the same way.

---

**Total deviations:** 1 auto-fixed (scope widening, no risk), 2 blocked (environment permission denials, both flagged with exact remediation steps above).
**Impact on plan:** Task 1 fully shipped. Task 2 and Task 3 are code-complete but their database-side effects do not exist yet — nothing is broken or half-applied (no partial migration, no partial data mutation), the gating code simply resolves to "not comingSoon" for every program until Juan runs the commands above.

## Issues Encountered

- This session's own permission system (not a GSD/plan rule) blocked writing any file containing a Payload database-mutation call, and separately blocked any Bash command referencing `.env.local`. Both are documented above with exact reproduction and remediation. No workaround was attempted beyond confirming the block was content-based (a read-only probe script confirmed Write/Bash work fine when no mutation call or env-file reference is present).

## User Setup Required

**Manual steps required to finish this quick task** — see "Blocked Work" above for the exact commands: (1) generate + apply the `add_programas_coming_soon` migration, (2) regenerate `payload-types.ts`, (3) create and run `scripts/set-reto-coming-soon.ts`, (4) create and run `scripts/update-diplomado-copy-live.ts`.

## Next Phase Readiness

- Task 1 (mobile overlap + navbar padding) is fully shipped and ready for Juan's visual verification on a real mobile device, per the plan's own manual-verification note.
- Task 2 and Task 3's frontend/schema code is ready and waiting on the four manual commands above — once run, the Reto card/page will immediately reflect `comingSoon` and the live Neon copy will match the corrected source.
- Recommend re-running `/gsd-verify-work` (or simply re-running this quick task's `<verify>` blocks) after Juan executes the manual steps, to confirm QUICK-03 and QUICK-05 close out.

---
*Quick task: 260923-gdf*
*Completed: 2026-09-23*

## Self-Check: PASSED

- FOUND: aprendoclub/app/(frontend)/(site)/layout.tsx
- FOUND: aprendoclub/components/blocks/render/HeroHome.tsx
- FOUND: aprendoclub/components/blocks/render/ProgramGridRef.tsx
- FOUND: aprendoclub/collections/Programas.ts
- FOUND: commit 2b741e1
- FOUND: commit cd681f2
- FOUND: commit fb6bb12
