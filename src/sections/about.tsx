'use client'
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import AboutImageEs from '@/media/about_es.svg'
import AboutImageEn from '@/media/about_en.svg'
import { useLocale, useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { faHandshake, faUsers, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'aos/dist/aos.css'
import AOS from 'aos'

export default function About() {
  const t = useTranslations('pages.home.about')
  const locale = useLocale()
  const sectionRef = useRef(null)

  const AboutImage = locale === 'es' ? AboutImageEs : AboutImageEn

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30])

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
    <motion.div
      ref={sectionRef}
      className="w-full pt-16 min-h-screen bg-bg dark:bg-darkBg relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="about"
    >
      <div className="mx-auto w-container max-w-full px-5 relative z-10">
        {/* Contenedor principal sin borde */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Imagen sin borde */}
            <motion.div
              className="lg:w-1/2"
              style={{ y: imageY }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            >
              <Image
                src={AboutImage}
                alt="Illustration"
                width={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </motion.div>

            {/* Contenido principal */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100, delay: 0.2 }}
            >
              {/* Tarjeta del título */}
              <motion.div
                className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                          shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                          transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                          transition-all duration-300 p-6 mb-8 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h1 className="text-4xl md:text-5xl font-black text-black dark:text-darkText text-center">
                  {t('title')}
                </h1>
              </motion.div>

              {/* Tarjeta del texto principal */}
              <motion.div
                className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                          shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                          transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                          transition-all duration-300 p-6 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-lg text-left text-text dark:text-darkText">{t('mainText')}</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Key Points - Tarjetas con estilo */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                className="group dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                          shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                          transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                          transition-all duration-300 p-6 rounded-lg h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
