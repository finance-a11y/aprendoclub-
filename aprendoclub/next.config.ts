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
  },
  async redirects() {
    return [
      // El índice se sirve en `/`; /home (slug del Page en Payload) redirige a la raíz.
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
