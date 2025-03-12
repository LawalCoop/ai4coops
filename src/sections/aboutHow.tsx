'use client'

import React, { useRef, JSX } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'
import Image, { StaticImageData } from 'next/image'
import { useTranslations } from 'next-intl'
import { faMagnifyingGlass, faGaugeHigh, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExplorationImage from '@/media/exploration.png'
import ProductionImage from '@/media/produccion.png'
import Autoplay from 'embla-carousel-autoplay'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
interface FeatureCardProps {
  icon: IconProp
  titleKey: string
  descriptionKey: string
}

interface ContentSlideProps {
  titleKey: string
  descriptionKey: string
  image: StaticImageData
  imageOnRight: boolean
}

// Datos para las cards del primer slide - Ahora usando keys para translations
const featureCards = [
  {
    icon: faMagnifyingGlass,
    titleKey: 'phase1_keyPoint1',
    descriptionKey: 'phase1_keyPoint1_desc',
  },
  {
    icon: faLightbulb,
    titleKey: 'phase1_keyPoint2',
    descriptionKey: 'phase1_keyPoint2_desc',
  },
  {
    icon: faGaugeHigh,
    titleKey: 'phase1_keyPoint3',
    descriptionKey: 'phase1_keyPoint3_desc',
  },
]

// Componente para las cards con iconos
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, titleKey, descriptionKey }) => {
  const t = useTranslations('Sections.AboutHow')

  return (
    <div
      className="group dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                     shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                     transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                     transition-all duration-300 p-6 rounded-lg
                     aspect-square w-full mx-2 my-4" // Ajustado mx-2 para reducir el margen horizontal
    >
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <FontAwesomeIcon
          icon={icon}
          className="w-20 h-20 text-primary dark:text-darkPrimary" // Icono más grande
        />
        <h3 className="text-2xl font-bold text-black dark:text-darkText text-center">
          {t(titleKey)}
        </h3>
        <p className="text-center text-gray-700 dark:text-gray-300">{t(descriptionKey)}</p>
      </div>
    </div>
  )
}

// Componente para slides con imagen y texto, ahora dentro de una Card
const ContentSlide: React.FC<ContentSlideProps> = ({
  titleKey,
  descriptionKey,
  image,
  imageOnRight = true,
}) => {
  const t = useTranslations('Sections.AboutHow')

  return (
    <div
      className="group dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                     shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                     transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                     transition-all duration-300 p-6 rounded-lg
                     w-full mx-4 my-4"
    >
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {!imageOnRight && (
          <div className="lg:w-1/2">
            <Image src={image} alt={t(titleKey)} className="w-full h-full rounded-lg" />
          </div>
        )}
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-black dark:text-darkText">{t(titleKey)}</h2>
          <p className="text-gray-700 dark:text-gray-300">{t(descriptionKey)}</p>
        </div>
        {imageOnRight && (
          <div className="lg:w-1/2">
            <Image src={image} alt={t(titleKey)} className="w-full h-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  )
}

export default function AboutHow() {
  const t = useTranslations('Sections.AboutHow')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false })
  const locale = useLocale() // Obtiene el idioma actual

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const carouselY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div
      ref={sectionRef}
      className="w-full bg-bg dark:bg-darkBg py-[50px] lg:py-[50px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-auto w-container max-w-full px-5">
        {/* Header section with animations */}
        <motion.div
          className="w-full mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                            shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                            transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                            transition-all duration-300 p-6 mb-10"
            whileHover={{ scale: 1.02 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('title')}
            </motion.h1>
          </motion.div>
          <motion.p
            className="text-lg md:text-xl text-center text-text dark:text-darkText"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('subtitle')}
            <Link href={`/${locale}/in-depth`}>HERE</Link>
          </motion.p>
        </motion.div>

        </div>

        {/* Carousel section */}
        <Carousel
          className="w-full px-8"
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })]}
        >
          <CarouselContent>
            {/* Primer slide - Card con imagen y texto */}
            <CarouselItem className="flex items-center justify-center">
              <ContentSlide
                titleKey="phase1_title"
                descriptionKey="phase1_text"
                image={ExplorationImage}
                imageOnRight={true}
              />
            </CarouselItem>

            {/* Segundo slide - Cards con iconos */}
            <CarouselItem className="flex items-center justify-center">
              <div className="w-full">
                <h2 className="text-3xl font-bold text-black dark:text-darkText text-center mb-6">
                  {t('phase2_title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
                  {featureCards.map((card, index) => (
                    <FeatureCard key={index} {...card} />
                  ))}
                </div>
              </div>
            </CarouselItem>

            {/* Tercer slide - Card con imagen y texto */}
            <CarouselItem className="flex items-center justify-center">
              <ContentSlide
                titleKey="phase3_title"
                descriptionKey="phase3_text"
                image={ProductionImage}
                imageOnRight={false}
              />
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious
            className="font-bold dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                                       shadow-[2px_2px_0px_0px] dark:hover:shadow-darkShadow
                                      dark:text-darkText hover:shadow-[4px_4px_0px_0px] hover:shadow-shadow shadow-shadow dark:shadow-darkShadow"
          />
          <CarouselNext
            className="font-bold dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                                       shadow-[2px_2px_0px_0px] dark:hover:shadow-darkShadow
                                      dark:text-darkText hover:shadow-[4px_4px_0px_0px] hover:shadow-shadow shadow-shadow dark:shadow-darkShadow"
          />
        </Carousel>
    </motion.div>
  )
}
