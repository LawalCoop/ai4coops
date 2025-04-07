'use client'

import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { faEye, faChartLine, faLanguage, faDatabase } from '@fortawesome/free-solid-svg-icons'
import ComputerVision from '@/media/computervision.png'
import Prediction from '@/media/prediction.png'
import LLMs from '@/media/llms.png'
import BigData from '@/media/bigdata.png'
import Image from 'next/image'

const InDepth = () => {
  const [lottieLoaded, setLottieLoaded] = useState(false)
  const sectionRef = React.useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  const phases = [
    {
      title: 'Fase de Exploración: Entendemos y Planificamos',
      description:
        'Nos sumergimos en el funcionamiento diario de la cooperativa para analizar sus operaciones y detectar oportunidades de optimización mediante IA. Entendemos las necesidades, identificamos áreas críticas y diseñamos una estrategia clara para la implementación.',
      steps: [
        'Realizamos entrevistas con los equipos clave para conocer sus procesos y desafíos.',
        'Analizamos flujos de trabajo para detectar ineficiencias y puntos de mejora.',
        'Investigamos posibles soluciones de IA que se adapten al contexto de la cooperativa.',
        'Definimos objetivos claros y medibles con KPIs específicos para evaluar el impacto.',
        'Elaboramos un informe detallado con hallazgos, oportunidades y plan de acción.',
      ],
      image: ComputerVision,
      icon: faEye,
    },
    {
      title: 'Fase MVP: Probamos la Solución',
      description:
        'Desarrollamos un Producto Mínimo Viable (MVP) para validar la eficacia de la solución IA. Probamos su funcionamiento en un entorno controlado y analizamos los resultados antes de una implementación a gran escala.',
      steps: [
        'Definimos el alcance del MVP, seleccionando las funcionalidades más críticas.',
        'Desarrollamos un prototipo funcional con las capacidades esenciales de la IA.',
        'Realizamos pruebas piloto con datos reales para evaluar la efectividad.',
        'Analizamos los resultados y ajustamos la solución según los aprendizajes.',
        'Preparamos un informe con métricas de desempeño y recomendaciones.',
      ],
      image: Prediction,
      icon: faChartLine,
    },
    {
      title: 'Fase de Producción: Lo Hacemos Realidad',
      description:
        'Escalamos la solución IA y la integramos completamente en la cooperativa, asegurando su estabilidad, funcionalidad y beneficios a largo plazo. Realizamos un monitoreo continuo para garantizar el éxito.',
      steps: [
        'Desarrollamos la versión final, optimizada y lista para producción.',
        'Integramos la solución con los sistemas existentes de la cooperativa.',
        'Capacitamos al equipo en el uso de la nueva tecnología y buenas prácticas.',
        'Monitoreamos el rendimiento y recopilamos métricas de mejora.',
        'Planificamos futuras optimizaciones basadas en los resultados obtenidos.',
      ],
      image: BigData,
      icon: faDatabase,
    },
  ]

  useEffect(() => {
    setLottieLoaded(true)
  }, [])

  return (
    <motion.div
      ref={sectionRef}
      className="w-full pt-[150px] pb-[100px] min-h-screen bg-bg dark:bg-darkBg relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 relative z-10">
        {/* Encabezado con el nuevo estilo */}
        <motion.div
          className="dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                    shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                    transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px] hover:shadow-shadow dark:hover:shadow-darkShadow
                    transition-all duration-300 p-6 mb-10 mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-darkText">
            Fases del Proyecto
          </h1>
        </motion.div>

        {/* Fases con el nuevo estilo de tarjetas */}
        <motion.div
          className="flex flex-col gap-8 mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div
                className={`
                dark:border-darkBorder bg-bg border-4 border-border dark:bg-darkBg
                shadow-[8px_8px_0px_0px] shadow-shadow dark:shadow-darkShadow
                transform group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px] group-hover:shadow-shadow dark:group-hover:shadow-darkShadow
                transition-all duration-300 p-6 rounded-lg
                flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6
              `}
              >
                <div className="md:w-1/4 flex-shrink-0 flex items-center justify-center">
                  <div className="w-full h-32 md:h-full relative rounded-lg overflow-hidden">
                    <Image
                      src={phase.image}
                      alt={`Imagen de ${phase.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Contenido de la fase */}
                <div className="md:w-3/4 flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-black dark:text-darkText">
                      {phase.title}
                    </h2>
                  </div>

                  <p className="text-text dark:text-darkText text-base md:text-lg mb-6">
                    {phase.description}
                  </p>

                  <ul className="space-y-3">
                    {phase.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="bg-primary dark:bg-darkPrimary text-white px-3 py-1 rounded-full text-md font-bold mt-1 flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-text dark:text-darkText text-base">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default InDepth
