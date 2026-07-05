import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
