import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        container: '1300px',
      },
      colors: {
        // Colores base
        bg: '#ffffff', // Fondo claro (blanco)
        text: '#212121', // Texto oscuro
        border: '#e0e0e0', // Borde gris claro
        shadow: '#bdbdbd', // Sombra gris

        // Colores cooperativistas (Light mode)
        primary: '#ff0000', // Rojo cooperativo
        secondary: '#0077b6', // Azul cooperativo
        accent: '#4caf50', // Verde cooperativo
        warning: '#ffc107', // Amarillo cooperativo
        info: '#2196f3', // Azul claro (para información)
        purple: '#673ab7', // Violeta (opcional)
        orange: '#ff5722', // Naranja (opcional)

        // Dark mode
        darkBg: '#1a1a1a', // Fondo oscuro
        darkText: '#e0e0e0', // Texto claro
        darkBorder: '#424242', // Borde gris oscuro
        darkShadow: '#000000', // Sombra oscura
        darkPrimary: '#ff5252', // Rojo cooperativo (más claro)
        darkSecondary: '#29b6f6', // Azul cooperativo (más claro)
        darkAccent: '#66bb6a', // Verde cooperativo (más claro)
        darkWarning: '#ffca28', // Amarillo cooperativo (más claro)
        darkInfo: '#64b5f6', // Azul claro (más claro)
        darkPurple: '#7c4dff', // Violeta (más claro)
        darkOrange: '#ff7043', // Naranja (más claro)
      },
      borderRadius: {
        base: '8px', // Bordes más redondeados
      },
      boxShadow: {
        // Sombras sutiles
        light: '0 4px 6px rgba(0, 0, 0, 0.1)',
        dark: '0 4px 6px rgba(0, 0, 0, 0.3)',
      },
      translate: {
        boxShadowX: '4px',
        boxShadowY: '4px',
        reverseBoxShadowX: '-4px',
        reverseBoxShadowY: '-4px',
      },
      fontWeight: {
        base: '500',
        heading: '700',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 15s linear infinite',
        marquee2: 'marquee2 15s linear infinite',
      },
      screens: {
        w900: { raw: '(max-width: 900px)' },
        w500: { raw: '(max-width: 500px)' },
      },
    },
  },
  plugins: [tailwindAnimate],
  darkMode: 'class',
}

export default config
