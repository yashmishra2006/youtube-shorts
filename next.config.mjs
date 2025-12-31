/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 REQUIRED for static HTML output
  output: "export",

  // 👇 Required because static export cannot run Image Optimization
  images: {
    unoptimized: true,
  },

  // 👇 Optional but recommended: avoids trailing-slash confusion
  trailingSlash: true,
};

export default nextConfig;
