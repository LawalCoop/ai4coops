// Navbar.tsx
'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import { ThemeSwitcher } from './theme-switcher'
import { DialogComponent } from './getInTouchDialog'
import Image from 'next/image'
import logo from '@/media/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'

const NavBar = ({ isLoading }: { isLoading: boolean }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [showNav, setShowNav] = useState(false) // Inicialmente oculto
  const [lastScrollY, setLastScrollY] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  // Efecto para mostrar el navbar después del loading
  useEffect(() => {
    if (!isLoading) {
      setShowNav(true) // Muestra el navbar cuando termina el loading
    }
  }, [isLoading])

  // Efecto para reiniciar la animación al cambiar de ruta
  useEffect(() => {
    setShowNav(false) // Oculta el navbar al cambiar de ruta
    const timeout = setTimeout(() => setShowNav(true), 100) // Vuelve a mostrarlo después de un breve retraso
    return () => clearTimeout(timeout) // Limpia el timeout si el componente se desmonta
  }, [pathname])

  const scrolltoHash = (element_id: string) => {
    if (window.location.pathname !== '/') {
      router.push(`/#${element_id}`)
    } else {
      const element = document.getElementById(element_id)
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
  }

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
            <a
              href="/"
              onClick={e => {
                e.preventDefault()
                router.push('/')
              }}
            >
              <Image src={logo} alt="AI4Coops" width={250} />
            </a>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-base lg:text-lg space-x-6">
            <NavLinks scrolltoHash={scrolltoHash} />
            <div className="flex items-center gap-4">
              <DialogComponent
                triggerButtonText="Get in Touch!"
                dialogTitle="Get in Touch"
                dialogDescription="Please fill out the form below to get in touch with me."
                inputLabels={{
                  name: 'Name',
                  email: 'Email',
                  message: 'Message',
                }}
                buttonClassName="dark:border-darkBorder border-4 dark:text-text font-bold dark:shadow-darkShadow dark:bg-darkPrimary"
              />
              <ThemeSwitcher className="dark:border-darkBorder dark:text-text border-4 font-bold dark:shadow-darkShadow dark:bg-darkPrimary" />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeSwitcher className="text-text bg-primary dark:bg-darkPrimary dark:border-darkBorder dark:text-text border-2 font-bold dark:shadow-darkShadow dark:bg-darkPrimary" />
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
          <div
            className="w-full bg-white dark:bg-darkBg p-4 transform"
            style={{
              border: '3px solid black',
              boxShadow: '8px 8px 0px 0px #000000',
            }}
          >
            <MobileNavLinks scrolltoHash={scrolltoHash} setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </>
  )
}

function NavLinks({ scrolltoHash }: { scrolltoHash: (id: string) => void }) {
  const t = useTranslations('Sections')

  const links = [
    { href: 'about', label: t('About.navbarTitle') },
    { href: 'services', label: t('Services.navbarTitle') },
    { href: 'aboutHow', label: t('AboutHow.navbarTitle') },
    { href: 'whoWeAre', label: t('WhoWeAre.navbarTitle') },
    { href: 'projects', label: t('Projects.navbarTitle') },
  ]

  return (
    <>
      {links.map(link => (
        <a
          key={link.href}
          href={`/#${link.href}`}
          className="px-3 py-1 font-bold text-black dark:text-white hover:-translate-y-1 hover:rotate-2 transform transition-all duration-200"
          onClick={e => {
            e.preventDefault()
            scrolltoHash(link.href)
          }}
        >
          {link.label}
        </a>
      ))}
    </>
  )
}

function MobileNavLinks({
  scrolltoHash,
  setIsOpen,
}: {
  scrolltoHash: (id: string) => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className="flex flex-col space-y-3">
      <NavLinks scrolltoHash={scrolltoHash} />
      <button className="mt-4 p-2 font-bold" onClick={() => setIsOpen(false)}>
        Close Menu
      </button>
    </div>
  )
}

export default NavBar
