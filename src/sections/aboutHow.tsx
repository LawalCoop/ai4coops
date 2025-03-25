'use client'

import React, { useRef } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
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

const featureCards = [
  {
    icon: faMagnifyingGlass,
    titleKey: 'phase2_keyPoint1',
    descriptionKey: 'phase2_keyPoint1_desc',
  },
  {
    icon: faLightbulb,
    titleKey: 'phase2_keyPoint2',
    descriptionKey: 'phase2_keyPoint2_desc',
  },
  {
    icon: faGaugeHigh,
    titleKey: 'phase2_keyPoint3',
    descriptionKey: 'phase2_keyPoint3_desc',
  },
]

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, titleKey, descriptionKey }) => {
  const t = useTranslations('Sections.AboutHow')

  return (
    <div
      className="group dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                     shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                     transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                     transition-all duration-300 p-4 md:p-6 rounded-lg
                     flex flex-col justify-between items-center text-center
                     w-full h-full overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center h-full gap-3 md:gap-4">
        <FontAwesomeIcon
          icon={icon}
          className="w-12 h-12 md:w-16 md:h-16 text-primary dark:text-darkPrimary"
        />
        <h3 className="text-lg md:text-xl font-extrabold uppercase text-black dark:text-darkText">
          <span className="pb-2 inline-block">{t(titleKey)}</span>
        </h3>
        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{t(descriptionKey)}</p>
      </div>
    </div>
  )
}

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
                     transition-all duration-300 p-4 md:p-8 rounded-lg
                     w-full mx-2 md:mx-4 my-4"
    >
      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
        {!imageOnRight && (
          <div className="lg:w-1/2">
            <Image src={image} alt={t(titleKey)} className="w-full h-full rounded-lg" />
          </div>
        )}
        <div className="lg:w-1/2 space-y-3 md:space-y-4 px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-black dark:text-darkText">
            <span className="border-b-4 border-primary pb-2 inline-block">{t(titleKey)}</span>
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            {t(descriptionKey)}
          </p>
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
        <div className="w-full bg-bg dark:bg-darkBg py-[30px] md:py-[50px]">
          <div className="mx-auto w-container max-w-full px-4 md:px-5">
            <div className="w-full mb-12 md:mb-16">
              <div
                className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                        shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                        transform hover:-translate-y-1 hover:shadow-shadow hover:shadow-[12px_12px_0px_0px] dark:hover:shadow-darkShadow
                        transition-all duration-300 p-4 md:p-6 mb-8 md:mb-10 rounded-lg"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black text-center dark:text-darkText">
                  <span className="pb-2 inline-block">{t('title')}</span>
                </h1>
              </div>
              <div>
                <p className="text-base md:text-lg text-center text-text dark:text-darkText">
                  {t('subtitle')}
                </p>
              </div>
            </div>

            <Carousel
              className="w-full px-2 md:px-8"
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false }),
              ]}
            >
              <CarouselContent>
                <CarouselItem className="flex items-center justify-center">
                  <ContentSlide
                    titleKey="phase1_title"
                    descriptionKey="phase1_text"
                    image={ExplorationImage}
                    imageOnRight={true}
                  />
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center">
                  <div className="w-full">
                    <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-black dark:text-darkText text-center mb-6 md:mb-8">
                      <span className="border-b-4 border-primary pb-2 inline-block">
                        {t('phase2_title')}
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-2 md:px-4">
                      {featureCards.map((card, index) => (
                        <div className="h-full flex" key={index}>
                          <FeatureCard {...card} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center">
                  <ContentSlide
                    titleKey="phase3_title"
                    descriptionKey="phase3_text"
                    image={ProductionImage}
                    imageOnRight={false}
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="dark:text-darkText" />
              <CarouselNext className="dark:text-darkText" />
            </Carousel>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
