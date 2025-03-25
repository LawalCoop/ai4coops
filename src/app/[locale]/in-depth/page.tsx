'use client'
import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import Phase from '@/components/howInDepthPhase'

export default function InDepth() {
  const t = useTranslations('Sections.Services')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false })

  const phases = [
    {
      title: 'Fase de Exploración: Entendemos y Planificamos',
      description:
        'En esta primera etapa, nos sumergimos en el día a día de la cooperativa para identificar oportunidades reales de mejora con IA.',
      steps: [
        'Consultoría: Conversamos con el equipo, observamos procesos y escuchamos sus desafíos.',
        'Búsqueda de cuellos de botella: Analizamos dónde están los puntos débiles (tiempos muertos, costos altos, tareas repetitivas, etc.).',
        'Propuesta de mejoras con IA: Sugerimos soluciones concretas, como automatizar tareas o predecir demandas, basadas en lo que encontramos.',
        'Selección y priorización en conjunto: Trabajamos intercooperativamente para elegir las mejoras más urgentes o con mayor impacto.',
        'Definición de métricas y KPIs: Acordamos cómo mediremos el éxito (ej. reducción de costos en 15%, aumento de producción en X%, aceleración de tareas).',
        'Entrega: Un documento claro con el análisis de cuellos de botella, las propuestas priorizadas y las métricas que guiarán el proyecto.',
      ],
    },
    {
      title: 'Fase MVP: Probamos la Solución',
      description:
        'Aquí comenzamos a trabajar en una versión inicial para validar que la IA funciona en la cooperativa.',
      steps: [
        'Presupuesto del MVP: Les presentamos un plan económico para desarrollar esta primera versión.',
        'Desarrollo del MVP: Creamos una solución funcional, sencilla pero efectiva, adaptada a lo priorizado.',
        'Validación y análisis: Probamos el MVP en un entorno controlado y revisamos cómo se comporta según las métricas definidas.',
        'Entrega: Un MVP funcional que ya empieza a mostrar resultados.',
      ],
    },
    {
      title: 'Fase de Producción: Lo Hacemos Realidad',
      description:
        'Llevamos la solución al siguiente nivel, integrándola completamente en las operaciones de la cooperativa.',
      steps: [
        'Presupuesto final: Les presentamos el costo de la implementación completa, ajustado a lo aprendido en el MVP.',
        'Desarrollo del producto final: Construimos la versión definitiva, robusta y lista para producción.',
        'Pruebas en producción: Lo testeamos en el entorno real para asegurar que funciona correctamente y aporta valor.',
        'Lanzamiento: Ponemos la IA en marcha oficialmente.',
        'Comparación de métricas: Miramos los números antes y después para medir el impacto (ej. tiempo ahorrado, ingresos generados).',
        'Planificación del próximo paso: Juntos, elegimos qué otro desafío queremos resolver con IA.',
        'Entrega: Una solución de IA totalmente operativa, integrada en la cooperativa.',
      ],
    },
  ]

  return (
    <motion.div
      ref={sectionRef}
      className="w-full pt-[150px] pb-[100px] min-h-screen bg-bg dark:bg-darkBg relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-auto w-container max-w-full px-5 relative z-10">
        {/* Título con el estilo del box */}
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

        {/* Grid de fases */}
        <motion.div
          className="grid grid-cols-1 gap-8 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {phases.map((phase, index) => (
            <Phase
              key={index}
              title={phase.title}
              description={phase.description}
              steps={phase.steps}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
