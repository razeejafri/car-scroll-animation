import type { NextConfig } from "next";

/**
 * Repository name must match the GitHub repo exactly (used for GitHub Pages
 * basePath). Change this if you rename the repo.
 */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = "car-scroll-animation";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages only if deployed via GitHub Actions
  ...(isGithubActions ? { output: "export" } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGithubActions ? `/${repo}` : "",
  assetPrefix: isGithubActions ? `/${repo}/` : "",
};

export default nextConfig;
