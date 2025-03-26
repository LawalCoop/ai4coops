import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// Configuración para next-intl
const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  webpack(config) {
    // Asegúrate de que los archivos .json sean tratados correctamente
    config.module.rules.push({
      test: /\.json$/,
      loader: 'json-loader', // Webpack ya tiene soporte para JSON por defecto
      type: 'javascript/auto',
    })

    return config
  },
}

export default withNextIntl(nextConfig)
