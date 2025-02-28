'use client'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import Marquee from 'react-fast-marquee'
import { motion } from 'framer-motion'
import coopImage from '@/media/ai4coopsHome.png'
import {
  SiAngular,
  SiArcgis,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLeaflet,
  SiOpenlayers,
  SiPython,
  SiQgis,
  SiTypescript,
} from 'react-icons/si'
import Image from 'next/image'
import { DialogComponent } from '@/components/getInTouchDialog'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('Sections')
  const skills = [
    { text: 'ArcGIS', Icon: SiArcgis },
    { text: 'QGIS', Icon: SiQgis },
    { text: 'OpenLayers', Icon: SiOpenlayers },
    { text: 'Leaflet', Icon: SiLeaflet },
    { text: 'Python', Icon: SiPython },
    { text: 'JavaScript', Icon: SiJavascript },
    { text: 'HTML', Icon: SiHtml5 },
    { text: 'TypeScript', Icon: SiTypescript },
    { text: 'Angular', Icon: SiAngular },
    { text: 'PostGIS', Icon: BiLogoPostgresql },
    { text: 'Version Control', Icon: SiGit },
    { text: 'Docker', Icon: SiDocker },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.4,
      },
    },
  }

  // Adjust buttonVariants to remove hover effects and delay appearance
  const buttonVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1.5, // Delay the button's appearance after marquee
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  const marqueeContainerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 1.2,
      },
    },
  }

  return (
    <header className="relative flex min-h-[100vh] w-full flex-col items-center justify-center bg-bg dark:bg-darkBg bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] pt-16 lg:pt-0">
      <motion.div
        className="mx-auto w-container max-w-full px-5 py-[110px] text-left lg:py-[120px] flex flex-col lg:flex-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:ml-8">
          <motion.div variants={itemVariants}>
            <TypeAnimation
              className="text-3xl lg:text-3xl font-bold text-info dark:text-darkPurple relative z-10"
              sequence={[
                t('HeroSection.firstAnimationText'),
                1000,
                t('HeroSection.secondAnimationText'),
                1000,
                t('HeroSection.thirdAnimationText'),
                1000,
              ]}
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-text dark:text-darkText text-3xl font-heading md:text-4xl lg:text-5xl mt-5"
          >
            {t('HeroSection.title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed"
          >
            {t('HeroSection.subtitle')}
          </motion.p>

          <div className="flex flex-col items-center lg:items-start mb-8">
            <motion.div className="flex space-x-6 mb-6" variants={itemVariants}>
              <motion.a
                href="https://lawal.coop"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FaGithub className="text-4xl text-text dark:text-white hover:text-primary dark:hover:text-darkPurple transition-colors duration-300" />
              </motion.a>
              <motion.a
                href="https://lawal.coop"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FaLinkedin className="text-4xl text-text dark:text-white hover:text-primary dark:hover:text-darkPurple transition-colors duration-300" />
              </motion.a>
            </motion.div>

            <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileTap="tap">
              <DialogComponent
                triggerButtonText="Get in Touch!"
                dialogTitle="Get in Touch"
                dialogDescription="Please fill out the form below to get in touch with me."
                inputLabels={{
                  name: 'Name',
                  email: 'Email',
                  message: 'Message',
                }}
                buttonClassName="dark:border-darkBorder border-4 dark:text-text font-bold dark:shadow-darkShadow dark:bg-darkPrimary"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center"
          variants={itemVariants}
        >
          <Image
            src={coopImage}
            alt="cooperativism flag"
            loading="lazy"
            className="mt-[-40px] lg:ml-28"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-full"
        variants={marqueeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <Marquee
          className="border-t-primary dark:border-t-darkPrimary dark:bg-darkBg border-t-2 border-b-2 border-b-primary dark:border-b-darkPrimary bg-white py-3 sm:py-5 font-base"
          direction="left"
          speed={90}
          loop={0}
        >
          {skills.map((skill, id) => (
            <motion.div
              className="flex items-center mx-8"
              key={id}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              <skill.Icon className="text-primary dark:text-darkPrimary text-5xl mr-4" />
              <span className="text-xl font-heading sm:text-2xl lg:text-4xl">{skill.text}</span>
            </motion.div>
          ))}
        </Marquee>
      </motion.div>
    </header>
  )
}
