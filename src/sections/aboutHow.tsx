'use client'

import React, { JSX } from 'react'
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
    <Card
      className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                     shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                     transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
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
const ContentSlide: React.FC<ContentSlideProps> = ({
  titleKey,
  descriptionKey,
  image,
  imageOnRight = true,
}) => {
  const t = useTranslations('Sections.AboutHow')

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10">
      {!imageOnRight && (
        <div className="lg:w-1/2">
          {' '}
          {/* Altura fija igual que las cards */}
          <Image src={image} alt={t(titleKey)} className="w-full h-full" />
        </div>
      )}
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-black dark:text-darkText">{t(titleKey)}</h2>
        <p className="text-gray-700 dark:text-gray-300">{t(descriptionKey)}</p>
      </div>
      {imageOnRight && (
        <div className="lg:w-1/2">
          <Image src={image} alt={t(titleKey)} className="w-full h-full" />
        </div>
      )}
    </div>
  )
}

export default function AboutHow() {
  const t = useTranslations('Sections.AboutHow')

  return (
    <div className="w-full bg-bg dark:bg-darkBg py-[50px] lg:py-[50px]">
      <div className="mx-auto w-container max-w-full px-5">
        {/* Header section with image */}
        <div className="w-full mb-16">
          <div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                        shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                        transform hover:-translate-y-1  hover:shadow-shadow hover:shadow-[12px_12px_0px_0px] dark:hover:shadow-darkShadow
                        transition-all duration-300 p-6 mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText">
              {t('title')}
            </h1>
            {/* Subtitle/Description */}
          </div>
          <div className="">
            <p className="text-lg md:text-xl text-center text-text dark:text-darkText">
              {t('subtitle')}
            </p>
          </div>
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
            {' '}
            {/* Añade una altura fija */}
            {/* Primer slide - Cards */}
            <CarouselItem className="flex items-center justify-center">
              {/* Añade flex y centrado */}
              <ContentSlide
                titleKey="phase1_title"
                descriptionKey="phase1_text"
                image={ExplorationImage}
                imageOnRight={true}
              />
            </CarouselItem>
            <CarouselItem className="grid grid-cols-1 items-center justify-center">
              {' '}
              {/* Añade flex y centrado */}
              <h2 className="text-3xl font-bold text-black dark:text-darkText">
                {t('phase2_title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {featureCards.map((card, index) => (
                  <FeatureCard key={index} {...card} />
                ))}
              </div>
            </CarouselItem>
            <CarouselItem className="flex items-center justify-center">
              {' '}
              {/* Añade flex y centrado */}
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
      </div>
    </div>
  )
}
