'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import ComputerVision from '@/media/computervision.png'
import Prediction from '@/media/prediction.png'
import LLMs from '@/media/llms.png'
import BigData from '@/media/bigdata.png'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { faEye, faChartLine, faLanguage, faDatabase, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Services() {
  const t = useTranslations('pages.home.services')

  const services = [
    {
      icon: faEye,
      title: t('service1.title'),
      description: t('service1.description'),
      image: ComputerVision,
      imageAlt: 'Computer Vision',
    },
    {
      icon: faChartLine,
      title: t('service2.title'),
      description: t('service2.description'),
      image: Prediction,
      imageAlt: 'Strategic Forecasting',
    },
    {
      icon: faLanguage,
      title: t('service3.title'),
      description: t('service3.description'),
      image: LLMs,
      imageAlt: 'Large Language Models',
    },
    {
      icon: faDatabase,
      title: t('service4.title'),
      description: t('service4.description'),
      image: BigData,
      imageAlt: 'Big Data',
    },
  ]

  return (
    <div className="w-full bg-bg dark:bg-darkBg py-[30px] lg:py-[40px] px-4 sm:px-6" id="services">
      <div className="mx-auto max-w-7xl">
        {/* ENCABEZADO */}
        <div className="w-full mb-12 md:mb-16 text-center">
          <div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                      shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                      transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                      transition-all duration-300 p-6 mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black text-black dark:text-darkText text-center uppercase">
              {t('title')}
            </h1>
          </div>

          <motion.p
            className="text-base md:text-lg px-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* SERVICIOS - GRID RESPONSIVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <div
                className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                          shadow-[6px_6px_0px_0px] md:shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                          transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px] md:group-hover:shadow-[12px_12px_0px_0px] group-hover:shadow-shadow dark:group-hover:shadow-darkShadow
                          transition-all duration-300 p-4 sm:p-5 md:p-6 rounded-lg h-full flex flex-col"
              >
                {/* IMAGEN - CENTRADA */}
                <div className="flex justify-center mb-4">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    width={120}
                    height={120}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
                  />
                </div>

                {/* CONTENIDO */}
                <div className="flex-grow text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <FontAwesomeIcon
                      icon={service.icon}
                      className="text-primary dark:text-darkPrimary text-xl md:text-2xl"
                    />
                    <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold text-black dark:text-darkText">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-text dark:text-darkText leading-relaxed pb-4">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NEW FULL-WIDTH SERVICE - AI TOOLS CAPACITATION */}
        <motion.div
          className="group w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                      shadow-[6px_6px_0px_0px] md:shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                      transform group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px] md:group-hover:shadow-[12px_12px_0px_0px] group-hover:shadow-shadow dark:group-hover:shadow-darkShadow
                      transition-all duration-300 p-6 md:p-8 rounded-lg"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* ICON & TITLE SECTION */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left md:flex-shrink-0">
                <div className="flex items-center gap-3 mb-4">
                  <FontAwesomeIcon
                    icon={faChalkboardTeacher}
                    className="text-primary dark:text-darkPrimary text-3xl md:text-4xl"
                  />
                  <h3 className="text-2xl md:text-3xl font-extrabold text-black dark:text-darkText">
                    {t('service5.title')}
                  </h3>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="flex-grow text-center md:text-left">
                <p className="text-base md:text-lg text-text dark:text-darkText leading-relaxed">
                  {t('service5.description')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
