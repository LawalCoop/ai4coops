'use client'
import React, { useEffect } from 'react'
// import { ExternalLink, Github } from 'lucide-react' // Commented out while buttons are hidden
import cv1Img from '../media/cv1.jpg'
import agroImg from '../media/agro.png'
import llmImg from '../media/llm.jpg'
import bigDataImg from '../media/bigdata.jpg'
import predictionImg from '../media/prediction.jpg'
import Image, { StaticImageData } from 'next/image'
import { useTranslations } from 'next-intl'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  live: string
  image: StaticImageData
}

const ProjectsShowcase = () => {
  const t = useTranslations('pages.home.projects')

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-out',
    })
  }, [])

  const projects: Project[] = [
    {
      title: t('projects.0.title'),
      description: t('projects.0.description'),
      tech: t.raw('projects.0.tech') as string[],
      github: 'https://github.com/ronitjadhav/digipin-openlayers',
      live: 'https://digipin.maplabs.tech',
      image: cv1Img,
    },
    {
      title: t('projects.1.title'),
      description: t('projects.1.description'),
      tech: t.raw('projects.1.tech') as string[],
      github: 'https://github.com/qgis/QGIS-Hub-Plugin',
      live: 'https://plugins.qgis.org/plugins/qgis_hub_plugin/',
      image: agroImg,
    },
    {
      title: t('projects.2.title'),
      description: t('projects.2.description'),
      tech: t.raw('projects.2.tech') as string[],
      github: 'https://github.com/openlayers/bench',
      live: 'https://openlayers.org/bench/',
      image: llmImg,
    },
    {
      title: t('projects.3.title'),
      description: t('projects.3.description'),
      tech: t.raw('projects.3.tech') as string[],
      github: 'https://github.com/openlayers/bench',
      live: 'https://openlayers.org/bench/',
      image: bigDataImg,
    },
    {
      title: t('projects.4.title'),
      description: t('projects.4.description'),
      tech: t.raw('projects.4.tech') as string[],
      github: 'https://github.com/openlayers/bench',
      live: 'https://openlayers.org/bench/',
      image: predictionImg,
    },
  ]

  return (
    <div className="w-full bg-bg dark:bg-darkBg py-[30px] lg:py-[40px]" id="projects">
      <div className="mx-auto w-container max-w-full px-4 sm:px-6">
      <div
        className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                   shadow-[8px_8px_0px_0px] dark:shadow-darkShadow shadow-shadow
                   transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                   transition-all duration-300 p-6 mb-8"
        data-aos="fade"
      >
        <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText uppercase">
          {t('title')}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="group bg-bg p-6 rounded-lg transform transition-transform hover:scale-105 dark:bg-darkBg flex flex-col"
            style={{
              border: '3px solid black',
              boxShadow: '8px 8px 0px 0px #000000',
            }}
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            {/* Imagen */}
            <div className="relative mb-4 overflow-hidden rounded-lg h-40 sm:h-48 md:h-56">
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                width={600}
                height={400}
                priority={index < 3}
              />
            </div>

            {/* Título y descripción */}
            <div className="flex-grow">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-text dark:text-darkText mb-4">{project.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech: string, techIndex: number) => (
                <span
                  key={techIndex}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold bg-yellow-300 dark:text-black"
                  style={{
                    border: '2px solid black',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Botones */}
            {/* 
            <div className="flex gap-4 mt-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-black font-bold transform transition-transform hover:-translate-y-1 hover:shadow-lg dark:text-black"
                style={{
                  border: '2px solid black',
                  boxShadow: '4px 4px 0px 0px #000000',
                }}
              >
                <Github size={20} />
                {t('codeButton')}
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-darkPurple text-black font-bold transform transition-transform hover:-translate-y-1 hover:shadow-lg dark:text-black"
                style={{
                  border: '2px solid black',
                  boxShadow: '4px 4px 0px 0px #000000',
                }}
              >
                <ExternalLink size={20} />
                {t('demoButton')}
              </a>
            </div>
            */}
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default ProjectsShowcase
