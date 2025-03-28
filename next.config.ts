import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// Configuración para next-intl
const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  webpack: (config) => {
      config.resolve.fallback = { fs: false, path: false };
      return config;
    },
}

export default withNextIntl(nextConfig)
