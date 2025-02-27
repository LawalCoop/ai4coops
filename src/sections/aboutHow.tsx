'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { faStar, faRocket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AI4CoopsAbout from '@/media/ai4coopsAbout.png'

// Datos para las cards del primer slide - Ahora usando keys para translations
const featureCards = [
  {
    icon: faStar,
    titleKey: 'phase1_keyPoint1',
    descriptionKey: 'phase1_keyPoint1',
  },
  {
    icon: faRocket,
    titleKey: 'phase1_keyPoint2',
    descriptionKey: 'phase1_keyPoint2',
  },
  {
    icon: faRocket,
    titleKey: 'phase1_keyPoint3',
    descriptionKey: 'phase1_keyPoint3',
  },
]

// Componente para las cards con iconos
const FeatureCard = ({ icon, titleKey, descriptionKey }) => {
  const t = useTranslations('Sections.AboutHow')

  return (
    <Card
      className="dark:border-darkPrimary bg-bg border-4 border-black dark:bg-darkBg
                     shadow-[8px_8px_0px_0px_#ff304f]
                     transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                     transition-all duration-300 p-6
                     aspect-square w-full"
    >
      {' '}
      {/* Cambiado a aspect-square para hacerla cuadrada */}
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
    </Card>
  )
}

// Componente para slides con imagen y texto
const ContentSlide = ({ titleKey, descriptionKey, image, imageOnRight = true }) => {
  const t = useTranslations('Sections.AboutHow')

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10">
      {!imageOnRight && (
        <div className="lg:w-1/2">
          {' '}
          {/* Altura fija igual que las cards */}
          <Image
            src={image}
            alt={t(titleKey)}
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>
      )}
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-black dark:text-darkText">{t(titleKey)}</h2>
        <p className="text-gray-700 dark:text-gray-300">{t(descriptionKey)}</p>
      </div>
      {imageOnRight && (
        <div className="lg:w-1/2">
          <Image
            src={image}
            alt={t(titleKey)}
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  )
}

export default function AboutHow() {
  const t = useTranslations('Sections.AboutHow')

  return (
    <div className="w-full min-h-screen bg-bg dark:bg-darkBg py-[110px] lg:py-[150px]">
      <div className="mx-auto w-container max-w-full px-5">
        {/* Header section with image */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <div
            className="dark:border-darkPrimary bg-bg border-4 border-black dark:bg-darkBg
                           shadow-[8px_8px_0px_0px_#ff304f]
                           transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                           transition-all duration-300 p-6 mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText">
              {t('title')} 🚀
            </h1>
          </div>
        </div>

        {/* Carousel section */}
        <Carousel className="w-full">
          <CarouselContent>
            {' '}
            {/* Añade una altura fija */}
            {/* Primer slide - Cards */}
            <CarouselItem className="flex items-center justify-center">
              {' '}
              {/* Añade flex y centrado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {featureCards.map((card, index) => (
                  <FeatureCard key={index} {...card} />
                ))}
              </div>
            </CarouselItem>
            {/* Slides de contenido */}
            <CarouselItem className="flex items-center justify-center">
              {' '}
              {/* Añade flex y centrado */}
              <ContentSlide
                titleKey="phase2_title"
                descriptionKey="phase2_text"
                image={AI4CoopsAbout}
                imageOnRight={true}
              />
            </CarouselItem>
            <CarouselItem className="flex items-center justify-center">
              {' '}
              {/* Añade flex y centrado */}
              <ContentSlide
                titleKey="phase3_title"
                descriptionKey="phase3_text"
                image={AI4CoopsAbout}
                imageOnRight={false}
              />
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious
            className="dark:border-darkPrimary bg-bg border-4 border-black dark:bg-darkBg
                                       shadow-[8px_8px_0px_0px_#ff304f]
                                       hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
          />
          <CarouselNext
            className="dark:border-darkPrimary bg-bg border-4 border-black dark:bg-darkBg
                                  shadow-[8px_8px_0px_0px_#ff304f]
                                  hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
          />
        </Carousel>
      </div>
    </div>
  )
}
