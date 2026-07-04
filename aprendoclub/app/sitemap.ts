import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://aprendoclub.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://aprendoclub.com/quienes-somos",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://aprendoclub.com/programas",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://aprendoclub.com/testimonios",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://aprendoclub.com/diplomado",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://aprendoclub.com/programas/taller-seo-con-ia",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://aprendoclub.com/reto",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://aprendoclub.com/links",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
