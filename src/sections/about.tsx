'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
import AboutImageEs from '@/media/about_es.svg'
import AboutImageEn from '@/media/about_en.svg'
import { useLocale, useTranslations } from 'next-intl'
import { faHandshake, faUsers, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function About() {
  const t = useTranslations('pages.home.about')
  const locale = useLocale()
  const sectionRef = useRef(null)

  const AboutImage = locale === 'es' ? AboutImageEs : AboutImageEn

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-out',
    })
  }, [])

  const keyPoints = [
    {
      icon: faHandshake,
      title: t('keyPoints.0.title'),
      description: t('keyPoints.0.description'),
    },
    {
      icon: faUsers,
      title: t('keyPoints.1.title'),
      description: t('keyPoints.1.description'),
    },
    {
      icon: faLightbulb,
      title: t('keyPoints.2.title'),
      description: t('keyPoints.2.description'),
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="w-full pt-16 min-h-screen bg-bg dark:bg-darkBg relative overflow-hidden"
      id="about"
    >
      <div className="mx-auto w-container max-w-full px-5 relative z-10">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row lg:flex-row items-center gap-6 md:gap-8 lg:gap-10">
            {/* Imagen */}
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              className="lg:w-1/2"
            >
              <Image
                src={AboutImage}
                alt="Illustration"
                width={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>

            {/* Contenido principal */}
            <div className="lg:w-1/2">
              {/* Título */}
              <div
                data-aos="fade"
                data-aos-delay="100"
                className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                          shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                          transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                          transition-all duration-300 p-6 mb-8"
              >
                <h1 className="text-4xl md:text-5xl font-black text-black dark:text-darkText text-center">
                  {t('title')}
                </h1>
              </div>

              {/* Texto principal */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                            shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                            p-6 rounded-lg"
              >
                <p className="text-lg text-text dark:text-darkText leading-relaxed">
                  {t('mainText')}
                </p>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mt-12 md:mt-14 lg:mt-16">
            {keyPoints.map((point, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="group dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                          shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                          transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                          transition-all duration-300 p-6 rounded-lg h-full flex flex-col"
              >
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <FontAwesomeIcon
                    icon={point.icon}
                    className="w-12 h-12 text-primary dark:text-darkPrimary group-hover:scale-110 transition-transform"
                  />
                  <h3 className="text-xl font-extrabold text-black dark:text-darkText text-center uppercase">
                    <span className="border-b-4 border-primary dark:border-darkPrimary pb-2">
                      {point.title}
                    </span>
                  </h3>
                  <p className="text-md text-gray-700 dark:text-gray-300 text-center mt-2">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
