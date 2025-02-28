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
      lightShadow: '#ddd',
      darkShadow: '#292929',
      lightBorder: '#ddd',
      darkBorder: '#292929',
      colors: {
        // Light mode
        bg: '#f5f7fa',
        text: '#212121',
        border: '#000',
        shadow: '#000',
        primary: '#ff304f', // Rojo neón
        secondary: '#00e6ff', // Celeste neón
        accent: '#00ff99', // Verde neón
        warning: '#ffdd33', // Amarillo neón
        info: '#0066ff', // Azul eléctrico
        purple: '#a833ff', // Violeta neón
        orange: '#ff6600', // Naranja fuego

        // Dark mode
        darkBg: '#212121',
        darkText: '#eeefe9',
        darkShadow:'#000',
        darkBorder: '#000',
        darkPrimary: '#ff304f',
        darkSecondary: '#00e6ff',
        darkAccent: '#00ff99',
        darkWarning: '#ffdd33',
        darkInfo: '#0066ff',
        darkPurple: '#a833ff',
        darkOrange: '#ff6600',
      },
      borderRadius: {
        base: '5px',
      },
      boxShadow: {
        light: '4px 4px 0px 0px #000',
        dark: '4px 4px 0px 0px #000',
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
