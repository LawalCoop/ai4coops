'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import ComputerVision from '@/media/computervision.png'
import Prediction from '@/media/prediction.png'
import LLMs from '@/media/llms.png'
import BigData from '@/media/bigdata.png'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { faEye, faChartLine, faLanguage, faDatabase } from '@fortawesome/free-solid-svg-icons'
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
    <div className="w-full bg-bg dark:bg-darkBg py-12 lg:py-24 px-4 sm:px-6" id="services">
      <div className="mx-auto max-w-7xl">
        {/* ENCABEZADO */}
        <div className="w-full mb-12 md:mb-16 text-center">
          <div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                      shadow-[6px_6px_0px_0px] md:shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                      transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px] md:hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                      transition-all duration-300 p-4 md:p-6 mb-4 md:mb-6 mx-2"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-darkText">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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
                          transition-all duration-300 p-4 md:p-5 rounded-lg h-full flex flex-col sm:flex-row gap-3 md:gap-4"
              >
                {/* IMAGEN - CENTRADA EN MÓVIL */}
                <div className="flex justify-center sm:justify-start flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    width={100}
                    height={100}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain"
                  />
                </div>

                {/* CONTENIDO */}
                <div className="flex-grow text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                    <FontAwesomeIcon
                      icon={service.icon}
                      className="text-primary dark:text-darkPrimary text-xl md:text-2xl mb-2 sm:mb-0"
                    />
                    <h3 className="text-lg md:text-xl font-extrabold text-black dark:text-darkText">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-text dark:text-darkText leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
