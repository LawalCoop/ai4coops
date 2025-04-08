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
    <div className="w-full bg-bg dark:bg-darkBg py-16 lg:py-24" id="services">
      <div className="mx-auto max-w-7xl px-5">
        {/* ENCABEZADO CON ANCHO COMPLETO */}
        <div className="w-full mb-16 text-center">
          <motion.div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                      shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                      transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                      transition-all duration-300 p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-black dark:text-darkText">
              {t('title')}
            </h1>
          </motion.div>

          <motion.p
            className="text-lg text-text dark:text-darkText max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                          shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                          transform group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px] group-hover:shadow-shadow dark:group-hover:shadow-darkShadow
                          transition-all duration-300 p-5 rounded-lg h-full flex gap-4"
              >
                <div className=" flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* CONTENIDO PRINCIPAL */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-extrabold text-black dark:text-darkText">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-text dark:text-darkText text-md leading-normal">
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
