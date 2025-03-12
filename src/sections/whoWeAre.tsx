'use client'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import Marquee from 'react-fast-marquee'
import { motion } from 'framer-motion'
import LawalImg from '@/media/logos/lawal.png'
import EryxImg from '@/media/logos/eryx.png'
import AnimusImg from '@/media/logos/animus.png'
import NewDevImg from '@/media/logos/newdev.png'

import Image from 'next/image'
import { DialogComponent } from '@/components/getInTouchDialog'
import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function WhoWeAre() {
  const titleRef = useRef(null)
  const t = useTranslations('Sections')
  const coops = [
    { name: 'Lawal', logo: LawalImg, link: 'https://www.lawal.coop' },
    { name: 'Eryx', logo: EryxImg, link: 'https://www.eryx.co' },
    { name: 'Animus', logo: AnimusImg, link: 'https://www.animus.coop' },
    { name: 'New Dev', logo: NewDevImg, link: 'https://www.newdev.cl' },
  ]

  const marqueeContainerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 1.2,
      },
    },
  }

  return (
    <div className="relative min-h-[80vh] flex py-[20px] lg:py-[30px] w-full flex-col items-center justify-center bg-bg dark:bg-darkBg lg:pt-0">
      <div className="mx-auto w-container max-w-full px-5">
        {/* Header section */}
        <div className="w-full mb-16" ref={titleRef}>
          <div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                  shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                  transform hover:-translate-y-1 hover:shadow-shadow hover:shadow-[12px_12px_0px_0px] dark:hover:shadow-darkShadow
                  transition-all duration-300 p-6 mb-10 overflow-hidden"
          >
            <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText">
              {t('WhoWeAre.title')}
            </h1>
          </div>

          {/* Subtitle con el mismo efecto */}
          <div className="overflow-hidden">
            <motion.p
              className="text-lg md:text-xl text-center text-text dark:text-darkText"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              viewport={{ once: false, margin: '-20%' }}
            >
              {t('WhoWeAre.subtitle')}
            </motion.p>
          </div>
        </div>
        <motion.div
          className="w-full mt-10"
          variants={marqueeContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full">
            <motion.div
              className="w-full"
              variants={marqueeContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <Marquee
                className="dark:bg-darkBg bg-white py-12 sm:py-20 font-base"
                direction="left"
                speed={150}
                loop={0}
              >
                {coops.map((coop, id) => (
                  <motion.div key={id} className="mx-24 flex flex-col items-center justify-center">
                    <a href={coop.link} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={coop.logo}
                        alt={coop.name}
                        width={300}
                        height={300}
                        className="filter grayscale hover:grayscale-0 hover:scale-110 hover:rotate-3 hover:brightness-110
                                     hover:shadow-xl transition-all duration-500 ease-out object-contain"
                      />
                    </a>
                  </motion.div>
                ))}
              </Marquee>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
