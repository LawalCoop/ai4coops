'use client'
import { motion } from 'framer-motion'

interface PhaseProps {
  title: string
  description: string
  steps: string[]
  index: number
  isInView: boolean
}

export default function Phase({ title, description, steps, index, isInView }: PhaseProps) {
  return (
    <motion.div
      className="p-8 rounded
        bg-gradient-to-br from-bg/90 to-bg/70 dark:from-darkBg/90 dark:to-darkBg/70
        backdrop-blur-sm border-l-4 border-primary
        transform transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {/* Número de fase con diseño destacado */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl font-black text-primary/20">0{index + 1}</span>
        <div>
          <h3 className="text-2xl font-bold text-primary">{title}</h3>
          <p className="text-lg text-text/80 dark:text-darkText/80 mt-2">
            {description}
          </p>
        </div>
      </div>

      {/* Steps con mejor visualización */}
      <div className="pl-20"> {/* Alineado con el contenido principal */}
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-4 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * i + 0.5 }}
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full
              bg-primary/10 text-primary font-semibold">
              {i + 1}
            </span>
            <p className="text-text dark:text-darkText/90 flex-1">{step}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
