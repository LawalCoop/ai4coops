'use client'

import React from 'react'
import { InfoCardsContainer, type InfoCardProps } from './info-card'
import { useTranslations } from 'next-intl'
import ComputerVision from '@/media/computervision.png'
import Prediction from '@/media/prediction.png'
import LLMs from '@/media/llms.png'
import BigData from '@/media/bigdata.png'

export default function Services() {
  const t = useTranslations('Sections.Services')

  const services: InfoCardProps[] = [
    {
      title: t('service1.title'),
      description: t('service1.description'),
      imageSrc: ComputerVision,
      imageAlt: 'Service 1',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'right',
    },
    {
      title: t('service2.title'),
      description: t('service2.description'),
      imageSrc: Prediction,
      imageAlt: 'Service 2',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'left',
    },
    {
      title: t('service3.title'),
      description: t('service3.description'),
      imageSrc: LLMs,
      imageAlt: 'Service 3',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'right',
    },
    {
      title: t('service4.title'),
      description: t('service4.description'),
      imageSrc: BigData,
      imageAlt: 'Service 4',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'left',
    },
  ]

  return (
    <div className="w-full min-h-screen bg-bg dark:bg-darkBg py-[110px] lg:py-[120px]">
      <div className="mx-auto w-container max-w-full px-5">
        {/* Header section */}
        <div className="w-full mb-16">
          <div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
              shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
              transform hover:-translate-y-1 hover:shadow-primary hover:shadow-[12px_12px_0px_0px] dark:hover:shadow-primary
              transition-all duration-300 p-6 mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText">
              {t('title')} 🚀
            </h1>
          </div>

          {/* Subtitle/Description */}
          <div className="">
            <p className="text-lg md:text-xl text-center text-text dark:text-darkText">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Services Cards */}
        <InfoCardsContainer cards={services} />
      </div>
    </div>
  )
}
