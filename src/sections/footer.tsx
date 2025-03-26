// Footer.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation' // Importa usePathname
import { useLoading } from '@/contexts/LoadingContext'

const footerVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5 },
  },
}

function NavLinks() {
  const t = useTranslations('Sections')

  const links = [
    { href: '#about', label: t('About.navbarTitle') },
    { href: '#services', label: t('Services.navbarTitle') },
    { href: '#aboutHow', label: t('AboutHow.navbarTitle') },
    { href: '#projects', label: t('Projects.navbarTitle') },
  ]

  const scrolltoHash = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <ul className="space-y-3">
      {links.map(link => (
        <li key={link.href}>
          <a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : '_self'}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-text border-4 border-transparent hover:border-black hover:bg-yellow-300
                             px-4 py-1 transition-all duration-200 dark:text-darkText dark:hover:text-black"
            onClick={e => {
              if (link.href.startsWith('#')) {
                e.preventDefault()
                scrolltoHash(link.href.substring(1))
              }
            }}
          >
            {link.label}
            {link.href.startsWith('http') && (
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false)
  const pathname = usePathname()
  const { isLoading } = useLoading()

  useEffect(() => {
    if (isLoading) {
      setShowFooter(false)
    } else {
      const timeout = setTimeout(() => setShowFooter(true), 500)
      return () => clearTimeout(timeout) // Limpia el timeout si el componente se desmonta
    }
  }, [isLoading, pathname]) // Ejecuta este efecto cuando cambia isLoading o la ruta

  return (
    <motion.footer
      className="w-full bg-bg p-8 border-t-8 border-black dark:border-darkBorder dark:bg-darkBg"
      variants={footerVariants}
      initial="hidden"
      animate={showFooter ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section with Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-black mb-4 text-text uppercase tracking-wider dark:text-darkText">
              Quick Links
            </h3>
            <NavLinks />
          </div>

          {/* Let's Connect */}
          <div className="transform -rotate-1">
            <h3 className="text-2xl font-black mb-4 text-text uppercase tracking-wider dark:text-darkText">
              Get in Touch!
            </h3>
            <div className="flex flex-col items-center lg:items-start mb-8">
              <div className="flex space-x-6 mb-6">
                <a href="https://github.com/LawalCoop/" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-4xl text-gray-800 dark:text-white hover:text-cerulean-400 transition-colors duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/company/lawalcoop/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-4xl text-gray-800 dark:text-white hover:text-cerulean-400 transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text font-bold text-lg dark:text-darkText">
            {2025} LAWAL | Built with ❤ & 🧉
          </p>
          <div className="bg-black text-white px-4 py-2 font-mono text-sm dark:bg-bg dark:text-black">
            &lt;/&gt; with Next.js + Tailwind
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
