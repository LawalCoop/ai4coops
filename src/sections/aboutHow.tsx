'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isInView, setIsInView] = React.useState(false)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const autoplayRef = React.useRef(Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: true }))

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-out',
    })
  }, [])

  // Intersection Observer to control autoplay
  React.useEffect(() => {
    const currentSection = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          autoplayRef.current.play()
        } else {
          autoplayRef.current.stop()
        }
      },
      { threshold: 0.3 }
    )

    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  // Track current slide
  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

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
      >
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
          {!imageOnRight && (
            <div className="lg:w-1/2">
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
            <div className="lg:w-1/2">
              <Image src={image} alt={title} className="w-full h-full rounded-lg" />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-bg dark:bg-darkBg py-[50px] lg:py-[50px]" id="how" ref={sectionRef}>
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
                <p className="text-base md:text-lg text-center text-text dark:text-darkText mb-4">
                  {t('subtitle')}
                </p>
                <div className="text-center">
                  <Link
                    href={`/documents/aI4coops ${locale}.pdf`}
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
            plugins={[autoplayRef.current]}
            setApi={setApi}
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
                <div className="w-full">
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-black dark:text-darkText text-center mb-6 md:mb-8">
                    <span className="border-b-4 border-primary pb-2 inline-block">
                      {t('phases.1.title')}
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-2 md:px-4">
                    {featureCards.map((card, index) => (
                      <div
                        className="h-full flex"
                        key={index}
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

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full transition-all duration-300 border-2 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  index === current - 1
                    ? 'bg-primary dark:bg-darkPrimary border-primary dark:border-darkPrimary shadow-lg transform scale-110'
                    : 'bg-transparent border-gray-400 dark:border-gray-600 hover:border-primary dark:hover:border-darkPrimary hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1} of ${count}`}
                role="tab"
                aria-selected={index === current - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
