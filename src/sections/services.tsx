'use client'

import React from 'react'
import { InfoCardsContainer, type InfoCardProps } from './info-card'
import { useTranslations } from 'next-intl'
import Character1 from '@/media/svgs/Character1.svg'
import Character2 from '@/media/svgs/Character2.svg'
import Character3 from '@/media/svgs/Character3.svg'
import Character4 from '@/media/svgs/Character4.svg'

export default function Services() {
  const t = useTranslations('Sections.Services')

  const services: InfoCardProps[] = [
    {
      title: t('service1.title'),
      description: t('service1.description'),
      imageSrc: Character1,
      imageAlt: 'Service 1',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'right',
    },
    {
      title: t('service2.title'),
      description: t('service2.description'),
      imageSrc: Character2,
      imageAlt: 'Service 2',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'left',
    },
    {
      title: t('service3.title'),
      description: t('service3.description'),
      imageSrc: Character3,
      imageAlt: 'Service 3',
      bgColor: 'bg-bg dark:bg-darkBg',
      imagePosition: 'right',
    },
    {
      title: t('service4.title'),
      description: t('service4.description'),
      imageSrc: Character4,
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
          <div
            className=""
          >
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
