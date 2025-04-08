'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import { ThemeSwitcher } from './theme-switcher'
import { DialogComponent } from './getInTouchDialog'
import Image from 'next/image'
import logo from '@/media/logo.png'
import { useTranslations, useLocale } from 'next-intl'
import { useLoading } from '@/contexts/LoadingContext'
import { useNavigation } from '@/config/navigation'

const NavBar = () => {
  const { push } = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('common')
  const [isOpen, setIsOpen] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const { isLoading } = useLoading()
  const { mainNav, sectionNav } = useNavigation()

  useEffect(() => {
    if (!isLoading) {
      setShowNav(true)
    }
  }, [isLoading])

  const handleNavigation = useCallback(
    async (path: string, isSection = false) => {
      const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/home`

      if (isSection) {
        if (isHomePage) {
          await scrollToSection(path)
        } else {
          // Navegamos a home con hash
          push(`/${locale}/#${path}`)
        }
      } else {
        // Navegación normal a otras páginas
        push(`/${locale}${path}`)
      }
      setIsOpen(false)
    },
    [pathname, locale, push]
  )

  const scrollToSection = useCallback(async (id: string, retries = 3): Promise<boolean> => {
    return new Promise(resolve => {
      const element = document.getElementById(id)

      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
          resolve(true)
        })
      } else if (retries > 0) {
        setTimeout(async () => {
          const success = await scrollToSection(id, retries - 1)
          resolve(success)
        }, 300)
      } else {
        resolve(false)
      }
    })
  }, [])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    handleNavigation('/')
  }

  // Efectos para control de scroll y clicks fuera del menú
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowNav(currentScrollY < lastScrollY || currentScrollY <= 100)
      setLastScrollY(currentScrollY)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [lastScrollY])

  const navbarVariants = {
    hidden: { y: '-120%' },
    visible: {
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  }

  return (
    <>
      <motion.nav
        className="fixed left-0 top-0 z-50 w-full px-4"
        variants={navbarVariants}
        initial="hidden"
        animate={showNav ? 'visible' : 'hidden'}
      >
        <div
          className={twMerge(
            `mx-auto mt-4 flex h-[80px] w-full max-w-screen-xl
            items-center justify-between px-6 transition-transform
            duration-300 ease-in-out bg-yellow-300 dark:bg-darkBg transform`,
            showNav ? 'translate-y-0' : '-translate-y-[calc(100%+40px)]'
          )}
          style={{
            border: '3px solid var(--border-color)',
            boxShadow: '8px 8px 0px 0px var(--shadow-color)',
          }}
        >
          {/* Logo */}
          <h1 className="text-3xl font-black tracking-tight text-black dark:text-white transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            <button onClick={handleLogoClick}>
              <Image
                src={logo}
                alt="AI4Coops"
                width={250}
                height={63}
                priority
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                }}
              />
            </button>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-base lg:text-lg space-x-6">
            <NavLinks handleNavigation={handleNavigation} navItems={sectionNav} />
            <div className="flex items-center gap-4">
              <DialogComponent
                triggerButtonText={t('contactButton')}
                dialogTitle={t('contactDialog.title')}
                dialogDescription={t('contactDialog.description')}
                inputLabels={{
                  name: t('contactDialog.name'),
                  email: t('contactDialog.email'),
                  message: t('contactDialog.message'),
                }}
                buttonClassName="dark:border-darkBorder border-4 dark:text-text font-bold dark:shadow-darkShadow dark:bg-darkPrimary"
              />
              <ThemeSwitcher className="dark:text-text font-bold dark:shadow-darkShadow dark:bg-darkPrimary" />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeSwitcher className="text-text bg-primary dark:border-darkBorder dark:text-text border-2 font-bold dark:shadow-darkShadow dark:bg-darkPrimary" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="border-border dark:border-darkBorder p-3 bg-primary dark:bg-darkPrimary transform hover:-rotate-3 transition-transform"
              style={{
                border: '2px solid var(--border-color)',
                boxShadow: '3px 3px 0px 0px var(--shadow-color)',
              }}
            >
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-[100px] z-50 w-full px-4" ref={menuRef}>
          <MobileNavLinks
            handleNavigation={handleNavigation}
            setIsOpen={setIsOpen}
            navItems={sectionNav}
          />
        </div>
      )}
    </>
  )
}

interface NavLinksProps {
  handleNavigation: (path: string, isSection: boolean) => void
  navItems: Array<{
    path: string
    label: string
    isSection?: boolean
  }>
}

const NavLinks = React.memo(({ handleNavigation, navItems }: NavLinksProps) => {
  return (
    <>
      {navItems.map(link => (
        <button
          key={link.path}
          onClick={() => handleNavigation(link.path, link.isSection ?? false)}
          className="px-3 py-1 font-bold text-black dark:text-white hover:-translate-y-1 hover:rotate-2 transform transition-all duration-200"
        >
          {link.label}
        </button>
      ))}
    </>
  )
})

NavLinks.displayName = 'NavLinks'

interface MobileNavLinksProps extends NavLinksProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNavLinks = React.memo(
  ({ handleNavigation, setIsOpen, navItems }: MobileNavLinksProps) => {
    const t = useTranslations('common')

    return (
      <div className="flex flex-col space-y-3 p-4 bg-white dark:bg-darkBg border-2 border-black dark:border-darkBorder shadow-[5px_5px_0_0_rgba(0,0,0,1)] dark:shadow-darkShadow">
        <NavLinks handleNavigation={handleNavigation} navItems={navItems} />
        <button
          className="mt-4 p-2 font-bold border-2 border-black dark:border-darkBorder self-center"
          onClick={() => setIsOpen(false)}
        >
          {t('closeMenu')}
        </button>
      </div>
    )
  }
)

MobileNavLinks.displayName = 'MobileNavLinks'

export default NavBar
