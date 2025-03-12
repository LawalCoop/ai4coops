import React from 'react'
import { ExternalLink, Github } from 'lucide-react'
import cv1Img from '../media/cv1.jpg'
import agroImg from '../media/agro.png'
import llmImg from '../media/llm.jpg'
import bigDataImg from '../media/bigdata.jpg'
import predictionImg from '../media/prediction.jpg'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ProjectsShowcase = () => {
  const t = useTranslations('Sections.Projects')

  const projects = [
    {
      title: 'Optimizing Quality Control in Manufacturing',
      description:
        'We developed an AI-powered system for a manufacturing client to enhance quality control. It processes 16 images per second with 99.99% accuracy, identifying defects in real-time. This solution helps workers reduce errors and minimize waste, ensuring high-quality products.',
      tech: ['TensorFlow', 'OpenCV', 'Python', 'Flask'], // Computer Vision y backend ligero
      github: 'https://github.com/ronitjadhav/digipin-openlayers',
      live: 'https://digipin.maplabs.tech',
      image: cv1Img,
    },
    {
      title: 'Satellite-Based Insights for Agriculture',
      description:
        'We created a system that analyzes satellite imagery and field data across 60,000 hectares. It provides daily insights, enabling smarter decisions for crop management. This tool supports agricultural cooperatives in achieving higher yields and better resource allocation.',
      tech: ['PyTorch', 'GDAL', 'GeoPandas', 'FastAPI'], // Procesamiento de imágenes satelitales y análisis geoespacial
      github: 'https://github.com/qgis/QGIS-Hub-Plugin',
      live: 'https://plugins.qgis.org/plugins/qgis_hub_plugin/',
      image: agroImg,
    },
    {
      title: 'Automating Data Extraction from Printed Documents',
      description:
        'We built an AI solution for a client to automate data extraction from printed documents. The system captures and digitizes key information, reducing manual effort and errors. This ensures seamless integration with the cooperative’s digital systems, enhancing overall productivity.',
      tech: ['LangChain', 'Tesseract OCR', 'Python', 'FastAPI'], // LLM y OCR para extracción de texto
      github: 'https://github.com/openlayers/bench',
      live: 'https://openlayers.org/bench/',
      image: llmImg,
    },
    {
      title: 'Big Data Solution',
      description:
        'We implemented a Big Data platform to analyze large volumes of operational data. The system provides actionable insights, helping staff make informed decisions and optimize resource allocation.',
      tech: ['Apache Spark', 'Hadoop', 'Kafka', 'Python'], // Tecnologías Big Data
      github: 'https://github.com/openlayers/bench',
      live: 'https://openlayers.org/bench/',
      image: bigDataImg,
    },
    {
      title: 'Demand Forecasting for Logistics',
      description:
        'We implemented a predictive AI system for a logistics client to forecast demand and optimize delivery routes. By analyzing historical data and real-time variables, the system helps reduce costs, improve delivery times, and ensure efficient resource allocation.',
      tech: ['Scikit-learn', 'XGBoost', 'Pandas', 'Flask'], // Machine Learning para predicción
      github: 'https://github.com/openlayers/bench',
      live: 'https://openlayers.org/bench/',
      image: predictionImg,
    },
  ]

  return (
    <div className="w-full p-8 bg-bg dark:bg-darkBg py-[50px] lg:py-[50px]">
      <div
        className="w-full bg-bg border-4 border-black dark:bg-darkBg
                          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                          transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                          transition-all duration-300 p-6 mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-black text-black text-center dark:text-darkText">
          {t('title')}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div
            key={project.title}
            className="group bg-bg p-6 rounded-lg transform transition-transform hover:scale-105 dark:bg-darkBg flex flex-col"
            style={{
              border: '3px solid black',
              boxShadow: '8px 8px 0px 0px #000000',
            }}
          >
            {/* Imagen con altura fija más grande */}
            <div className="relative mb-4 overflow-hidden rounded-lg h-56">
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                width={600}
                height={400}
              />
            </div>

            {/* Título y descripción */}
            <div className="flex-grow">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-text dark:text-darkText mb-4">{project.description}</p>
            </div>

            {/* Tags alineados al fondo */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm font-semibold bg-yellow-300 dark:text-black"
                  style={{
                    border: '2px solid black',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Botones alineados al fondo */}
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
                Code
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
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsShowcase
