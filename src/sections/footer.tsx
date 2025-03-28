'use client'
import React, { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useLoading } from '@/contexts/LoadingContext'
import { useNavigation } from '@/config/navigation'

const footerVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2 },
  },
}

interface FooterLinkProps {
  href: string
  label: string
  isSection?: boolean
  onClick?: (path: string) => void
}

const FooterLinks = () => {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('common.navbar.links')
  const { sectionNav } = useNavigation()
  const locale = pathname?.split('/')[1] || 'en'

  const handleClick = (path: string, isSection: boolean) => {
    if (isSection) {
      if (pathname === `/${locale}` || pathname === `/${locale}/home`) {
        const element = document.getElementById(path)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        router.push(`/${locale}/#${path}`)
      }
    }
  }

  const links: FooterLinkProps[] = [
    ...sectionNav.map(link => ({
      href: `#${link.path}`,
      label: link.label,
      isSection: true,
      onClick: () => handleClick(link.path, true)
    })),
    {
      href: 'https://github.com/LawalCoop/',
      label: 'GitHub'
    },
    {
      href: 'https://www.linkedin.com/company/lawalcoop/',
      label: 'LinkedIn'
    }
  ]

  return (
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          {link.isSection ? (
            <a
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                link.onClick?.(link.href.replace('#', ''))
              }}
              className="text-text border-4 border-transparent hover:border-black hover:bg-yellow-300
                        px-4 py-1 transition-all duration-200 dark:text-darkText dark:hover:text-black"
            >
              {link.label}
            </a>
          ) : (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text border-4 border-transparent hover:border-black hover:bg-yellow-300
                        px-4 py-1 transition-all duration-200 dark:text-darkText dark:hover:text-black inline-flex items-center"
            >
              {link.label}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}

const Footer = () => {
  const { isLoading } = useLoading()
  const t = useTranslations('common')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(true)
    }
  }, [isLoading])

  return (
    <motion.footer
      className="w-full bg-bg p-8 border-t-8 border-black dark:border-darkBorder dark:bg-darkBg"
      variants={footerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-black mb-4 text-text uppercase tracking-wider dark:text-darkText">
              {t('footer.quickLinks')}
            </h3>
            <FooterLinks />
          </div>

          <div className="transform -rotate-1">
            <h3 className="text-2xl font-black mb-4 text-text uppercase tracking-wider dark:text-darkText">
              {t('footer.getInTouch')}
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://github.com/LawalCoop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-gray-800 dark:text-white hover:text-yellow-400 transition-colors duration-300"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/company/lawalcoop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-gray-800 dark:text-white hover:text-yellow-400 transition-colors duration-300"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text font-bold text-lg dark:text-darkText">
            © {new Date().getFullYear()} LAWAL | {t('footer.builtWith')}
          </p>
          <div className="bg-black text-white px-4 py-2 font-mono text-sm dark:bg-bg dark:text-black">
            &lt;/&gt; {t('footer.techStack')}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
