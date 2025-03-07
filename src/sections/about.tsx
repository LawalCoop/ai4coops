import React, { useRef } from 'react'
import Image from 'next/image'
import AI4CoopsAbout from '@/media/ai4coopsAbout.png'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ParallaxLine } from '@/components/ui/parallaxLine'

export default function About() {
  const t = useTranslations('Sections.About')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const keyPoints = [
    { title: t('keyPoint1Title'), description: t('keyPoint1Description') },
    { title: t('keyPoint2Title'), description: t('keyPoint2Description') },
    { title: t('keyPoint3Title'), description: t('keyPoint3Description') },
  ]

  return (
    <motion.div
      ref={sectionRef}
      className="w-full min-h-screen bg-bg dark:bg-darkBg relative overflow-hidden py-[50px] lg:py-[50px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParallaxLine />

      <div className="mx-auto w-container max-w-full px-5 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Imagen con efectos */}
          <motion.div
            className="lg:w-1/2"
            style={{ y: imageY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={AI4CoopsAbout}
              alt="Illustration"
              width={800}
              className="w-full h-auto rounded-lg"
            />
          </motion.div>

          {/* Contenido principal */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="dark:border-darkBorder bg-bg/80 backdrop-blur-sm border-4 border-border
                        dark:bg-darkBg/80 shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                        transform hover:translate-y-[-8px] hover:translate-x-[8px]
                        hover:shadow-shadow hover:shadow-[12px_12px_0px_0px]
                        dark:hover:shadow-darkShadow transition-all duration-300 p-6 mb-10"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-4xl md:text-5xl font-black text-black dark:text-darkText text-center">
                {t('title')}
              </h1>
            </motion.div>
            <motion.p
              className="text-lg md:text-xl text-left text-text dark:text-darkText"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              {t('main_text')}
            </motion.p>
          </motion.div>
        </div>

        {/* Key Points */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {keyPoints.map((point, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg backdrop-blur-sm  pl-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="relative">
                <h3 className="text-2xl font-semibold text-primary mb-4">{point.title}</h3>
                <motion.div
                  className="h-0.5 bg-primary w-0"
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
