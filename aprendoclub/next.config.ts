import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
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
  },
  async redirects() {
    return [
      // El índice se sirve en `/`; /home (slug del Page en Payload) redirige a la raíz.
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
