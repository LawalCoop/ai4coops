'use client'

import React, { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion, useInView } from 'framer-motion'

const InDepth = () => {
  const [lottieLoaded, setLottieLoaded] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false) // Estado para asegurarnos que la animación se reproduce solo una vez
  const sectionRef = React.useRef(null)
  const isInView = useInView(sectionRef, { once: true }) // Se reproduce una vez al estar en vista

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
      animation: '/animations/exploration.lottie', // Ruta local
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
      animation: '/animations/mvp.lottie', // Ruta local
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
      animation: '/animations/production.lottie', // Ruta local
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
        <motion.div
          className="dark:border-darkBorder bg-bg/80 backdrop-blur-sm border-4 border-border dark:bg-darkBg/80 shadow-lg transform transition-all duration-300 p-6 mb-10"
          whileHover={{ scale: 1.02 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-darkText text-center">
            Fases del Proyecto
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-16 mt-20 items-center w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className={`w-full max-w-7xl bg-white dark:bg-darkBg border border-border dark:border-darkBorder rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Animación de cada fase */}
              <div
                id={phase.title}
                className="md:w-1/2 min-h-full flex justify-center items-center p-6" // Agregado el padding
                style={{ height: 'auto' }} // Asegura que el contenedor ocupe todo el espacio
              >
                {lottieLoaded && isInView && !hasPlayed && (
                  <DotLottieReact
                    src={phase.animation} // Ruta local de la animación .lottie
                    loop // Solo se reproduce una vez
                    autoplay
                    style={{
                      width: '80%', // Reducido al 80% del tamaño original
                      height: '80%', // Reducido al 80% del tamaño original
                      objectFit: 'contain', // Mantener la proporción y ajustarla dentro del contenedor
                    }} // Marca como reproducido
                  />
                )}
              </div>

              {/* Contenido de la fase */}
              <div className="p-10 md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-black dark:text-darkText">{phase.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg line-clamp-3">
                  {phase.description}
                </p>{' '}
                {/* Agregado line-clamp */}
                <ul className="list-none pl-0 text-gray-600 dark:text-gray-400 space-y-4">
                  {phase.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-4 text-lg">
                      <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default InDepth
