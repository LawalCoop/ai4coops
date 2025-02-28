'use client'

import React from 'react'
import Image from 'next/image'
import AI4CoopsAbout from '@/media/ai4coopsAbout.png'
import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('Sections.About')

  const keyPoints = [
    { title: t('keyPoint1Title'), description: t('keyPoint1Description') },
    { title: t('keyPoint2Title'), description: t('keyPoint2Description') },
    { title: t('keyPoint3Title'), description: t('keyPoint3Description') },
  ]

  return (
    <div className="w-full min-h-screen bg-bg dark:bg-darkBg py-[110px] lg:py-[120px]">
      <div className="mx-auto w-container max-w-full px-5 text-left flex flex-col lg:flex-col items-center gap-10">
        <div className="w-full flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 flex justify-start">
            <Image src={AI4CoopsAbout} alt="Illustration" width={800} />
          </div>
          <div className="lg:w-1/2 text-right">
            <div
              className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                          shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                          transform hover:-translate-y-1  hover:shadow-primary hover:shadow-[12px_12px_0px_0px] dark:hover:shadow-primary
                          transition-all duration-300 p-6 mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText">
                {t('title')} 🚀
              </h1>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{t('main_text')}</p>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-between gap-12 text-left mt-10">
          {keyPoints.map((point, index) => (
            <div key={index} className="w-full lg:w-1/3">
              <h3 className="text-2xl font-semibold text-primary border-b-4 border-primary inline-block pb-2 mb-4">
                {point.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
