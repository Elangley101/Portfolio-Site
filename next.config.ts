import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Pin the workspace root; without this Turbopack can pick up an unrelated
  // lockfile from a parent directory.
  turbopack: { root: path.resolve(process.cwd()) },

  async redirects() {
    // The previous single-page app used these paths. Keep inbound links alive.
    return [
      { source: '/project', destination: '/projects', permanent: true },
      { source: '/resume', destination: '/about', permanent: false },
      { source: '/home', destination: '/', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
