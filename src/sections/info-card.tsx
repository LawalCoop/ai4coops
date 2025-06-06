'use client'

import Image, { StaticImageData } from 'next/image'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { motion, AnimatePresence, useInView } from 'framer-motion' // Añade useInView
import { H3, P } from '@/components/ui/typography'
import { useRef } from 'react' // Añade useRef

export type InfoCardProps = {
  title: string
  description: string
  imageSrc: string | StaticImageData
  imageAlt: string
  bgColor: string
  imagePosition: 'left' | 'right'
}

export function InfoCardsContainer({ cards }: { cards: InfoCardProps[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, {
    margin: '0px 0px -200px 0px',
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5, // Esto crea un efecto escalonado entre cards
      },
    },
  }
  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full py-10 auto-rows-fr"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="relative h-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                className="absolute inset-0 -m-4 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 dark:from-green-500/10 dark:via-blue-500/10 dark:to-purple-500/10 rounded-2xl blur-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>
          <InfoCard {...card} isHovered={hoveredIndex === idx} />
        </div>
      ))}
    </motion.div>
  )
}

function InfoCard(props: InfoCardProps & { isHovered: boolean }) {
  const { title, description, imageSrc, imageAlt, bgColor, imagePosition } = props
  const ref = useRef(null) // Añade ref
  const isInView = useInView(ref, {
    margin: '0px 0px -200px 0px', // Ajusta este valor para controlar cuándo se dispara la animación
  })
  const infoCardClass = twMerge(
    'relative flex flex-col-reverse md:flex-row w-full h-full items-center gap-12 md:gap-12 rounded-lg border-2 border-slate-900 px-6 py-8 shadow-light dark:shadow-gray-500 dark:border-gray-500 z-10',
    imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row',
    bgColor
  )

  const infoTextContainerClass = 'flex-grow w-full flex flex-col justify-center'
  const imageContainerClass = twMerge(
    'md:w-2/5 w-full flex-shrink-0 flex justify-center items-center',
    imagePosition === 'left' ? 'md:ml-6' : 'md:mr-6'
  )

  const cardVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  }

  const imageVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, -2, 0],
      transition: {
        scale: { duration: 0.3, ease: 'easeOut' },
        rotate: {
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      },
    },
  }

  const textVariants = {
    initial: { x: imagePosition === 'left' ? -20 : 20, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { delay: 0.3 } },
    hover: {
      x: imagePosition === 'left' ? -5 : 5,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={infoCardClass}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Text Section */}
      <motion.div className={infoTextContainerClass} variants={textVariants}>
        <H3>{title}</H3>
        <P>{description}</P>
      </motion.div>

      {/* Image Section */}
      <motion.div className={imageContainerClass} variants={imageVariants}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="object-contain w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
          width={256}
          height={256}
        />
      </motion.div>
    </motion.div>
  )
}
