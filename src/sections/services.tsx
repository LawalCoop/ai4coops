'use client'

import React, { useRef } from 'react'
import { InfoCardsContainer, type InfoCardProps } from './info-card'
import { useTranslations } from 'next-intl'
import ComputerVision from '@/media/computervision.png'
import Prediction from '@/media/prediction.png'
import LLMs from '@/media/llms.png'
import BigData from '@/media/bigdata.png'
import { motion } from 'framer-motion'

export default function Services() {
  const t = useTranslations('pages.home.services')
  const titleRef = useRef(null)

  // Verificamos que las traducciones existan antes de usarlas
  const services: InfoCardProps[] = [
    {
      title: t('service1.title'),
      description: t('service1.description'),
      imageSrc: ComputerVision,
      imageAlt: 'Computer Vision',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'right',
    },
    {
      title: t('service2.title'),
      description: t('service2.description'),
      imageSrc: Prediction,
      imageAlt: 'Strategic Forecasting',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'left',
    },
    {
      title: t('service3.title'),
      description: t('service3.description'),
      imageSrc: LLMs,
      imageAlt: 'Large Language Models',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'right',
    },
    {
      title: t('service4.title'),
      description: t('service4.description'),
      imageSrc: BigData,
      imageAlt: 'Big Data',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'left',
    },
  ]

  return (
    <div className="w-full min-h-screen bg-bg dark:bg-darkBg py-[50px] lg:py-[50px]" id="services">
      <div className="mx-auto w-container max-w-full px-5">
        {/* Header section */}
        <div className="w-full mb-16" ref={titleRef}>
          <div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                  shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                  transform hover:-translate-y-1 hover:shadow-shadow hover:shadow-[12px_12px_0px_0px] dark:hover:shadow-darkShadow
                  transition-all duration-300 p-6 mb-10 overflow-hidden"
          >
            <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText">
              {t('title')}
            </h1>
          </div>

          <div className="overflow-hidden">
            <motion.p
              className="text-lg md:text-xl text-center text-text dark:text-darkText"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              viewport={{ once: false, margin: '-20%' }}
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </div>
        {/* Services Cards */}
        <InfoCardsContainer cards={services} />
      </div>
    </div>
  )
}
