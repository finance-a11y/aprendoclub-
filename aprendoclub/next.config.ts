import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // `sharp` es un addon nativo (linux-x64/libvips) — si Next lo bundlea con
  // webpack/turbopack en vez de dejarlo como require() externo de Node, el
  // binario nativo no viaja con la función serverless de Vercel y crashea
  // en runtime (ERR_DLOPEN_FAILED: libvips-cpp.so). Excluirlo del bundle.
  serverExternalPackages: ["sharp"],
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
    // Un solo formato (evita duplicar transformaciones avif+webp) y cache
    // largo: las imágenes de Payload/Blob no cambian de URL al editarse.
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    // Ningún contenedor del sitio supera max-w-6xl (1152px); los buckets de
    // Next por default suben hasta 3840 (4K), cada uno una combinación de
    // transform distinta y facturable. Recortar el techo a 1200 reduce la
    // cantidad de variantes únicas que Vercel Image Optimization genera por
    // imagen (Fase 29, prevención de la cuota de transforms agotada — commit
    // 516be82 ya bajó el formato duplicado; esto reduce el ancho de banda de
    // tamaños restante).
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  async redirects() {
    return [
      // El índice se sirve en `/`; /home (slug del Page en Payload) redirige a la raíz.
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
