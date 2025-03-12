'use client'

import React, { useEffect, useState, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import { ThemeSwitcher } from './theme-switcher'
import { DialogComponent } from './getInTouchDialog'
import Image from 'next/image'
import logo from '@/media/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'

const scrolltoHash = function (element_id: string) {
  const element = document.getElementById(element_id)
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
  })
}

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false)
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setShowNav(true)
      }
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
        animate="visible"
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
          <h1
            className="text-3xl font-black font-Space_Grotesk tracking-tight
    text-black dark:text-white transform -rotate-2 hover:rotate-0 transition-transform
    duration-300 min-w-[80px] xs:min-w-[100px] lg:text-5xl"
          >
            <a
              href="#home"
              onClick={e => {
                e.preventDefault()
                scrolltoHash('home')
              }}
            >
              <Image src={logo} alt="AI4Coops" width={250} />
            </a>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-base lg:text-lg space-x-6">
            <NavLinks />

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
            <ThemeSwitcher className="text-text bg-primary dar_bg-darkPrimary dark:border-darkBorder dark:text-text border-2 font-bold dark:shadow-darkShadow dark:bg-darkPrimary" />
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
            <MobileNavLinks setIsOpen={setIsOpen} />
            <div className="mt-4 p-2 ">
              <DialogComponent
                triggerButtonText="Get in Touch!"
                dialogTitle="Get in Touch"
                dialogDescription="Please fill out the form below to get in touch with me."
                inputLabels={{
                  name: 'Name',
                  email: 'Email',
                  message: 'Message',
                }}
                inputClassName="dark:text-text"
                buttonClassName="dark:border-darkBorder border-2 dark:text-text font-bold dark:shadow-darkShadow dark:bg-darkPrimary"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function NavLinks() {
  const t = useTranslations('Sections')

  const links = [
    { href: '#about', label: t('About.navbarTitle') },
    { href: '#services', label: t('Services.navbarTitle') },
    { href: '#aboutHow', label: t('AboutHow.navbarTitle') },
    { href: '#whoWeAre', label: t('WhoWeAre.navbarTitle') },
    { href: '#projects', label: t('Projects.navbarTitle') },
  ]

  return (
    <>
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : '_self'}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="px-3 py-1 font-bold text-black dark:text-white hover:-translate-y-1 hover:rotate-2
                             transform transition-all duration-200"
          style={{
            border: '2px solid transparent',
            borderRadius: '0px',
          }}
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
      ))}
    </>
  )
}

function MobileNavLinks({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const t = useTranslations('Sections')

  const links = [
    { href: '#home', label: t('HeroSection.navbarTitle') },
    { href: '#whatWeAreDoing', label: t('About.navbarTitle') },
    { href: '#aboutHow', label: t('AboutHow.navbarTitle') },
    { href: '#whoWeAre', label: t('WhoWeAre.navbarTitle') },
    { href: '#projects', label: t('Projects.navbarTitle') },
  ]

  return (
    <div className="flex flex-col space-y-3">
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : '_self'}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="p-2 text-center text-lg font-bold
                             transform hover:rotate-2 transition-transform"
          onClick={e => {
            if (link.href.startsWith('#')) {
              e.preventDefault()
              scrolltoHash(link.href.substring(1))
            }
            setIsOpen(false)
          }}
        >
          {link.label}
          {link.href.startsWith('http') && (
            <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
          )}
        </a>
      ))}
    </div>
  )
}

export default NavBar
