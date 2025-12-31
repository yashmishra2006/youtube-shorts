/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/youtube-short-downloader',
  assetPrefix: '/youtube-short-downloader/',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
