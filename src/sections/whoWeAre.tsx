'use client'
import Marquee from 'react-fast-marquee'
import FactticImg from '@/media/logos/facttic.png'
import LawalImg from '@/media/logos/lawal.png'
import EryxImg from '@/media/logos/eryx.png'
import AnimusImg from '@/media/logos/animus.png'
import NewDevImg from '@/media/logos/newdev.png'
import ElMaizalImg from '@/media/logos/elMaizal.png'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function WhoWeAre() {
  const titleRef = useRef(null)
  const t = useTranslations('pages.home.whoWeAre')

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-out',
    })
  }, [])

  const coops = [
    {
      name: 'FACTTIC',
      logo: FactticImg,
      link: 'https://www.facttic.org.ar',
      translationKey: 'facttic',
    },
    {
      name: 'Lawal',
      logo: LawalImg,
      link: 'https://www.lawal.coop',
      translationKey: 'lawal',
    },
    {
      name: 'Eryx',
      logo: EryxImg,
      link: 'https://www.eryx.co',
      translationKey: 'eryx',
    },
    {
      name: 'Animus',
      logo: AnimusImg,
      link: 'https://www.animus.coop',
      translationKey: 'animus',
    },
    {
      name: 'New Dev',
      logo: NewDevImg,
      link: 'https://www.newdev.cl',
      translationKey: 'newDev',
    },
    {
      name: 'El Maizal',
      logo: ElMaizalImg,
      link: 'https://elmaizal.coop.ar/',
      translationKey: 'elMaizal',
    },
  ]

  return (
    <div
      className="relative min-h-[80vh] flex py-[20px] lg:py-[30px] w-full flex-col items-center justify-center bg-bg dark:bg-darkBg lg:pt-0"
      id="who"
    >
      <div className="mx-auto w-container max-w-full px-5">
        {/* Header section */}
        <div className="w-full mb-16" ref={titleRef}>
          <div
            className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                  shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                  transform hover:-translate-y-1 hover:shadow-shadow hover:shadow-[12px_12px_0px_0px] dark:hover:shadow-darkShadow
                  transition-all duration-300 p-6 mb-10 overflow-hidden"
            data-aos="fade"
          >
            <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText">
              {t('title')}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden" data-aos="fade-up" data-aos-delay="150">
            <p className="text-lg md:text-xl text-center text-text dark:text-darkText">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Cooperatives Marquee */}
        <div className="w-full mt-10" data-aos="fade-up" data-aos-delay="300">
          <div className="relative w-full">
            <Marquee
              className="dark:bg-darkBg bg-white py-12 sm:py-20 font-base"
              direction="left"
              speed={150}
              loop={0}
            >
              {coops.map((coop, id) => (
                <div
                  key={id}
                  className="mx-24 flex flex-col items-center justify-center"
                  data-aos="zoom-in"
                  data-aos-delay={id * 100}
                >
                  <a
                    href={coop.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={t(`coops.${coop.translationKey}.name`)}
                  >
                    <Image
                      src={coop.logo}
                      alt={t(`coops.${coop.translationKey}.name`)}
                      width={300}
                      height={300}
                      className="filter grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-3 group-hover:brightness-110
                               group-hover:shadow-xl transition-all duration-500 ease-out object-contain"
                    />
                  </a>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  )
}
