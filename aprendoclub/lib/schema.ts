/**
 * JSON-LD (Schema.org) para el sitio aprendoclub.
 *
 * Fuente única de verdad de los datos estructurados. Cada página server-side
 * embebe el bloque que le corresponde vía <JsonLd>. Payload-ready: cuando el
 * contenido se vuelva dinámico (v1.1), estos builders se alimentan del CMS.
 */

export const SITE_URL = "https://www.aprendoclub.com";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** EducationalOrganization — referenciada por @id desde el resto de bloques. */
export const organization = {
  "@type": "EducationalOrganization",
  "@id": ORG_ID,
  name: "aprendoclub",
  alternateName: "aprendoseo",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/opengraph.png`,
  description:
    "Academia de SEO e IA para el mundo hispano. Formación práctica, comunidad y acompañamiento para especialistas.",
  foundingDate: "2022",
  founder: {
    "@type": "Person",
    name: "Arianna Lupi",
    jobTitle: "Consultora SEO y Fundadora",
  },
  sameAs: [
    "https://www.youtube.com/@aprendoclub",
    "https://tiktok.com/@aprendo.club",
  ],
};

/** WebSite del dominio. */
export const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "aprendoclub",
  inLanguage: "es",
  publisher: { "@id": ORG_ID },
};

/** Referencia corta a la organización por @id (evita duplicar el nodo). */
const orgRef = { "@id": ORG_ID };

type CourseInput = {
  name: string;
  description: string;
  path: string;
  price: string;
  courseWorkload?: string; // ISO 8601 duration, ej. "P16W"
  startDate?: string; // YYYY-MM-DD
};

/** Course individual con provider + offer + courseInstance (rich results). */
export function course({
  name,
  description,
  path,
  price,
  courseWorkload,
  startDate,
}: CourseInput) {
  const instance: Record<string, unknown> = {
    "@type": "CourseInstance",
    courseMode: "online",
  };
  if (courseWorkload) instance.courseWorkload = courseWorkload;
  if (startDate) instance.startDate = startDate;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: "es",
    provider: {
      "@type": "EducationalOrganization",
      name: "aprendoclub",
      url: SITE_URL,
    },
    hasCourseInstance: instance,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      category: "Paid",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${path}`,
    },
  };
}

const ctx = { "@context": "https://schema.org" as const };

/** Home: Organization + WebSite como bloques tipados independientes. */
export function homeGraph() {
  return [
    { ...ctx, ...organization },
    { ...ctx, ...website },
  ];
}

/** /quienes-somos: AboutPage + Organization con su equipo. */
export function aboutGraph(team: { nombre: string; rol: string }[]) {
  return [
    {
      ...ctx,
      "@type": "AboutPage",
      url: `${SITE_URL}/quienes-somos`,
      name: "Quiénes somos - aprendoclub",
      inLanguage: "es",
      about: orgRef,
    },
    {
      ...ctx,
      ...organization,
      employee: team.map((m) => ({
        "@type": "Person",
        name: m.nombre,
        jobTitle: m.rol,
      })),
    },
  ];
}

/** CollectionPage + ItemList de cursos para el hub /programas. */
export function programasGraph(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${SITE_URL}/programas`,
    name: "Programas - aprendoclub",
    inLanguage: "es",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: `${SITE_URL}${it.path}`,
      })),
    },
  };
}

/** FAQPage a partir de una lista de preguntas/respuestas. */
export function faqGraph(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

type BlogPostingInput = {
  title: string;
  description?: string;
  path: string; // /{categoria}/{slug}
  imageUrl?: string;
  authorName?: string;
  authorPath?: string; // /autor/{slug}
  datePublished?: string;
  section?: string;
};

/** BlogPosting de un artículo del blog (rich results). */
export function blogPostingGraph({
  title,
  description,
  path,
  imageUrl,
  authorName,
  authorPath,
  datePublished,
  section,
}: BlogPostingInput) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
    inLanguage: "es",
    publisher: { "@id": ORG_ID },
  };
  if (description) node.description = description;
  if (imageUrl) {
    node.image = imageUrl.startsWith("http") ? imageUrl : `${SITE_URL}${imageUrl}`;
  }
  if (datePublished) node.datePublished = datePublished;
  if (section) node.articleSection = section;
  if (authorName) {
    node.author = {
      "@type": "Person",
      name: authorName,
      ...(authorPath ? { url: `${SITE_URL}${authorPath}` } : {}),
    };
  }
  return node;
}

type Crumb = { name: string; path?: string };

/**
 * BreadcrumbList (rich results). El último item es la página actual y puede ir
 * sin `path` (Google admite el último sin URL).
 */
export function breadcrumbGraph(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => {
      const el: Record<string, unknown> = {
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
      };
      if (it.path) el.item = `${SITE_URL}${it.path}`;
      return el;
    }),
  };
}

type BlogListItem = { name: string; path: string };

/** CollectionPage + ItemList para el índice del blog y las páginas de categoría. */
export function blogListGraph({
  name,
  path,
  description,
  items,
}: {
  name: string;
  path: string;
  description?: string;
  items: BlogListItem[];
}) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    name,
    inLanguage: "es",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${it.path}`,
        name: it.name,
      })),
    },
  };
  if (description) node.description = description;
  return node;
}

/** ProfilePage + Person para las páginas de autor, con sus artículos. */
export function authorGraph({
  name,
  path,
  role,
  bio,
  imageUrl,
  sameAs,
  posts,
}: {
  name: string;
  path: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  sameAs?: string[];
  posts: BlogListItem[];
}) {
  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${SITE_URL}${path}#person`,
    name,
    url: `${SITE_URL}${path}`,
    worksFor: { "@id": ORG_ID },
  };
  if (role) person.jobTitle = role;
  if (bio) person.description = bio;
  if (imageUrl) {
    person.image = imageUrl.startsWith("http") ? imageUrl : `${SITE_URL}${imageUrl}`;
  }
  if (sameAs && sameAs.length) person.sameAs = sameAs;

  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: `${SITE_URL}${path}`,
      inLanguage: "es",
      mainEntity: { "@id": `${SITE_URL}${path}#person` },
      isPartOf: { "@id": WEBSITE_ID },
      hasPart: posts.map((it) => ({
        "@type": "BlogPosting",
        headline: it.name,
        url: `${SITE_URL}${it.path}`,
      })),
    },
    { ...ctx, ...person },
  ];
}

type ReviewInput = { nombre: string; quote: string; ubicacion?: string };

/**
 * Testimonios: EducationalOrganization con aggregateRating + reviews.
 * Nota: cada testimonio se marca con rating 5/5 (son valoraciones positivas
 * reales de estudiantes). ratingValue/reviewCount agregados tomados del sitio.
 */
export function testimoniosGraph(reviews: ReviewInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: "aprendoclub",
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.nombre,
      },
      reviewBody: r.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };
}
