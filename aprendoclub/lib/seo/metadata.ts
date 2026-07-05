import type { Metadata } from "next";

import type { Media } from "@/payload-types";
import { SEO_FALLBACKS } from "@/lib/seo/fallbacks";

/** Forma del grupo `meta` que inyecta plugin-seo en los docs de `pages`. */
type PageMeta =
  | {
      title?: string | null;
      description?: string | null;
      image?: (number | null) | Media;
    }
  | null
  | undefined;

/**
 * Compone la metadata de una página migrada.
 *
 * Precedencia: `doc.meta` (editable desde /admin) → fallback hardcodeado por
 * slug (`SEO_FALLBACKS`) → default del root layout (dejando el campo `undefined`
 * para que Next herede). Solo setea title/description y, si el Page trae
 * `meta.image`, el OG image; el resto de OG/twitter/metadataBase se hereda del
 * layout.
 */
export function buildMetadata(meta: PageMeta, slug: string): Metadata {
  const fallback = SEO_FALLBACKS[slug];

  const title = meta?.title || fallback?.title || undefined;
  const description = meta?.description || fallback?.description || undefined;

  const result: Metadata = {};
  if (title) result.title = title;
  if (description) result.description = description;

  const image = meta?.image;
  if (image && typeof image === "object" && image.url) {
    result.openGraph = { images: [{ url: image.url }] };
  }

  return result;
}
