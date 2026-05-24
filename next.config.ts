import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site can be hosted on Cloudflare Pages (output dir: "out").
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
