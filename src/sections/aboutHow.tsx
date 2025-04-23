'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image, { StaticImageData } from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { faMagnifyingGlass, faGaugeHigh, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExplorationImage from '@/media/exploration.png'
import ProductionImage from '@/media/produccion.png'
import Autoplay from 'embla-carousel-autoplay'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface FeatureCardProps {
  icon: IconProp
  title: string
  description: string
}

interface ContentSlideProps {
  title: string
  description: string
  image: StaticImageData
  imageOnRight: boolean
}

export default function AboutHow() {
  const t = useTranslations('pages.home.aboutHow')
  const locale = useLocale()

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-out',
    })
  }, [])

  const featureCards = [
    {
      icon: faMagnifyingGlass,
      title: t('phases.1.keyPoints.0.title'),
      description: t('phases.1.keyPoints.0.description'),
    },
    {
      icon: faLightbulb,
      title: t('phases.1.keyPoints.1.title'),
      description: t('phases.1.keyPoints.1.description'),
    },
    {
      icon: faGaugeHigh,
      title: t('phases.1.keyPoints.2.title'),
      description: t('phases.1.keyPoints.2.description'),
    },
  ]

  const phases = [
    {
      title: t('phases.0.title'),
      description: t('phases.0.description'),
      image: ExplorationImage,
      imageOnRight: true,
    },
    {
      title: t('phases.2.title'),
      description: t('phases.2.description'),
      image: ProductionImage,
      imageOnRight: false,
    },
  ]

  const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
      <div
        className="group dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                   shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                   transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                   transition-all duration-300 p-4 md:p-6 rounded-lg
                   flex flex-col justify-between items-center text-center
                   w-full h-full overflow-hidden"
        data-aos="fade-up"
      >
        <div className="flex flex-col items-center justify-center h-full gap-3 md:gap-4">
          <FontAwesomeIcon
            icon={icon}
            className="w-12 h-12 md:w-16 md:h-16 text-primary dark:text-darkPrimary"
          />
          <h3 className="text-lg md:text-xl font-extrabold uppercase text-black dark:text-darkText">
            <span className="pb-2 inline-block">{title}</span>
          </h3>
          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{description}</p>
        </div>
      </div>
    )
  }

  const ContentSlide: React.FC<ContentSlideProps> = ({
    title,
    description,
    image,
    imageOnRight = true,
  }) => {
    return (
      <div
        className="group dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                   shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                   transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                   transition-all duration-300 p-4 md:p-8 rounded-lg
                   w-full mx-2 md:mx-4 my-4"
        data-aos="fade-up"
      >
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
          {!imageOnRight && (
            <div className="lg:w-1/2" data-aos={imageOnRight ? 'fade-left' : 'fade-right'}>
              <Image src={image} alt={title} className="w-full h-full rounded-lg" />
            </div>
          )}
          <div className="lg:w-1/2 space-y-3 md:space-y-4 px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-black dark:text-darkText">
              <span className="border-b-4 border-primary pb-2 inline-block">{title}</span>
            </h2>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">{description}</p>
          </div>
          {imageOnRight && (
            <div className="lg:w-1/2" data-aos={imageOnRight ? 'fade-right' : 'fade-left'}>
              <Image src={image} alt={title} className="w-full h-full rounded-lg" />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-bg dark:bg-darkBg py-[50px] lg:py-[50px]" id="how">
      <div className="mx-auto w-container max-w-full px-5">
        <div className="w-full bg-bg dark:bg-darkBg py-[30px] md:py-[50px]">
          <div className="mx-auto w-container max-w-full px-4 md:px-5">
            <div className="w-full mb-12 md:mb-16">
              <div
                className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                        shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                        transform hover:-translate-y-1 hover:shadow-shadow hover:shadow-[12px_12px_0px_0px] dark:hover:shadow-darkShadow
                        transition-all duration-300 p-4 md:p-6 mb-8 md:mb-10 rounded-lg"
                data-aos="fade-down"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black text-center dark:text-darkText">
                  <span className="pb-2 inline-block">{t('title')}</span>
                </h1>
              </div>
              <div data-aos="fade-up" data-aos-delay="150">
                <p className="text-base md:text-lg text-center text-text dark:text-darkText mb-4">
                  {t('subtitle')}
                </p>
                <div className="text-center">
                  <Link
                    href="/documents/ai4coops_brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary dark:text-darkPrimary hover:text-primary/80 dark:hover:text-darkPrimary/80
                              transition-colors duration-300 text-sm md:text-base underline"
                  >
                    {t('seeMore')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Carousel
            className="w-full px-2 md:px-8"
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })]}
          >
            <CarouselContent>
              {/* 1. Fase de Exploración */}
              <CarouselItem key="exploration" className="flex items-center justify-center">
                <ContentSlide
                  title={phases[0].title}
                  description={phases[0].description}
                  image={phases[0].image}
                  imageOnRight={phases[0].imageOnRight}
                />
              </CarouselItem>

              {/* 2. Fase con Cards (ahora en el medio) */}
              <CarouselItem key="feature-cards" className="flex items-center justify-center">
                <div className="w-full" data-aos="zoom-in">
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-black dark:text-darkText text-center mb-6 md:mb-8">
                    <span className="border-b-4 border-primary pb-2 inline-block">
                      {t('phases.1.title')}
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-2 md:px-4">
                    {featureCards.map((card, index) => (
                      <div
                        className="h-full flex"
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <FeatureCard {...card} />
                      </div>
                    ))}
                  </div>
                </div>
              </CarouselItem>

              {/* 3. Fase de Producción */}
              <CarouselItem key="production" className="flex items-center justify-center">
                <ContentSlide
                  title={phases[1].title}
                  description={phases[1].description}
                  image={phases[1].image}
                  imageOnRight={phases[1].imageOnRight}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="dark:text-darkText" />
            <CarouselNext className="dark:text-darkText" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
