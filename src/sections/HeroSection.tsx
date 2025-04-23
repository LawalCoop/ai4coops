'use client'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import Marquee from 'react-fast-marquee'
import { motion } from 'framer-motion'
import homeImageEs from '@/media/home_es.svg'
import homeImageEn from '@/media/home_en.svg'
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiApachespark,
  SiKeras,
  SiScikitlearn,
  SiDocker,
  SiGit,
  SiHuggingface,
  SiJupyter,
  SiPandas,
  SiNumpy,
} from 'react-icons/si'
import { FaRobot } from 'react-icons/fa'
import Image from 'next/image'
import { DialogComponent } from '@/components/getInTouchDialog'
import { useLocale, useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('pages.home.heroSection')
  const locale = useLocale()

  const HomeImage = locale === 'es' ? homeImageEs : homeImageEn

  const commonT = useTranslations('common')

  const skills = [
    { text: 'Python', Icon: SiPython },
    { text: 'PyTorch', Icon: SiPytorch },
    { text: 'TensorFlow', Icon: SiTensorflow },
    { text: 'OpenCV', Icon: SiOpencv },
    { text: 'Apache Spark', Icon: SiApachespark },
    { text: 'Keras', Icon: SiKeras },
    { text: 'Scikit-learn', Icon: SiScikitlearn },
    { text: 'Jupyter Notebooks', Icon: SiJupyter },
    { text: 'Pandas', Icon: SiPandas },
    { text: 'NumPy', Icon: SiNumpy },
    { text: 'PostgreSQL', Icon: BiLogoPostgresql },
    { text: 'Hugging Face', Icon: SiHuggingface },
    { text: 'Llama', Icon: FaRobot },
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

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1.5,
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
                t('animationTexts.0'),
                1000,
                t('animationTexts.1'),
                1000,
                t('animationTexts.2'),
                1000,
              ]}
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-text dark:text-darkText text-3xl font-heading md:text-4xl lg:text-5xl mt-5"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          <div className="flex flex-col items-center lg:items-start mb-8">
            <motion.div className="flex space-x-6 mb-6" variants={itemVariants}>
              <motion.a
                href="https://github.com/LawalCoop/"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FaGithub className="text-4xl text-text dark:text-white hover:text-primary dark:hover:text-darkPurple transition-colors duration-300" />
              </motion.a>
            </motion.div>

            <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileTap="tap">
              <DialogComponent
                triggerButtonText={commonT('contactButton')}
                dialogTitle={commonT('contactDialog.title')}
                dialogDescription={commonT('contactDialog.description')}
                inputLabels={{
                  name: commonT('contactDialog.name'),
                  email: commonT('contactDialog.email'),
                  message: commonT('contactDialog.message'),
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
            src={HomeImage}
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
