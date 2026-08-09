import { join } from 'node:path';

/** @type {import('next').NextConfig} */
// Static export so GitHub Pages can serve it. basePath matches the repo name.
const nextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH ?? '',
  images: { unoptimized: true },
  turbopack: { root: join(import.meta.dirname, '..') },
};

export default nextConfig;
