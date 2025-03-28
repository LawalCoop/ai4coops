'use client'
import React from 'react'
import { ExternalLink, Github } from 'lucide-react'
import cv1Img from '../media/cv1.jpg'
import agroImg from '../media/agro.png'
import llmImg from '../media/llm.jpg'
import bigDataImg from '../media/bigdata.jpg'
import predictionImg from '../media/prediction.jpg'
import Image, { StaticImageData } from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

// Definimos los tipos para la estructura de los proyectos
interface Project {
  title: string
  description: string
  tech: string[] // Aquí especificamos que tech es un array de strings
  github: string
  live: string
  image: StaticImageData // Tipo para las imágenes importadas
}

const ProjectsShowcase = () => {
  const t = useTranslations('pages.home.projects')

  // Especificamos el tipo Project[] para el array de proyectos
  const projects: Project[] = [
    {
      title: t('projects.0.title'),
      description: t('projects.0.description'),
      tech: t.raw('projects.0.tech') as string[], // Aseguramos el tipo aquí
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
    <div className="w-full p-8 bg-bg dark:bg-darkBg py-[50px] lg:py-[50px]" id="projects">
      <motion.div
        className="w-full bg-bg border-4 border-black dark:bg-darkBg
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                    transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                    transition-all duration-300 p-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText">
          {t('title')}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="group bg-bg p-6 rounded-lg transform transition-transform hover:scale-105 dark:bg-darkBg flex flex-col"
            style={{
              border: '3px solid black',
              boxShadow: '8px 8px 0px 0px #000000',
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Imagen con altura fija más grande */}
            <div className="relative mb-4 overflow-hidden rounded-lg h-56">
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                width={600}
                height={400}
                priority={index < 3} // Prioriza la carga de las primeras imágenes
              />
            </div>

            {/* Título y descripción */}
            <div className="flex-grow">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-text dark:text-darkText mb-4">{project.description}</p>
            </div>

            {/* Tags alineados al fondo */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech: string, techIndex: number) => (
                <motion.span
                  key={techIndex}
                  className="px-3 py-1 text-sm font-semibold bg-yellow-300 dark:text-black"
                  style={{
                    border: '2px solid black',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Botones alineados al fondo */}
            <div className="flex gap-4 mt-auto">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-black font-bold transform transition-transform hover:-translate-y-1 hover:shadow-lg dark:text-black"
                style={{
                  border: '2px solid black',
                  boxShadow: '4px 4px 0px 0px #000000',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github size={20} />
                {t('codeButton')}
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-darkPurple text-black font-bold transform transition-transform hover:-translate-y-1 hover:shadow-lg dark:text-black"
                style={{
                  border: '2px solid black',
                  boxShadow: '4px 4px 0px 0px #000000',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={20} />
                {t('demoButton')}
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsShowcase
