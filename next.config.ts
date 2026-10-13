import type { NextConfig } from "next";

/**
 * Repository name must match the GitHub repo exactly (used for GitHub Pages
 * basePath). Change this if you rename the repo.
 */
const repo = "car-scroll-animation";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
