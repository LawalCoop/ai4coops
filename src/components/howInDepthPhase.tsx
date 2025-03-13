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
      className="dark:border-darkBorder bg-bg/80 backdrop-blur-sm border-2 border-border
        dark:bg-darkBg/80 shadow-[4px_4px_0px_0px] shadow-shadow dark:shadow-darkShadow
        transform hover:translate-y-[-4px] hover:translate-x-[4px]
        transition-all duration-300 p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
    >
      {/* Header con número y título */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-3xl font-bold text-purple dark:text-darkPurple">
          {(index + 1).toString().padStart(2, '0')}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-primary dark:text-darkPrimary">{title}</h3>
          <motion.div
            className="h-0.5 bg-purple dark:bg-darkPurple w-0"
            whileInView={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Descripción */}
      <p className="text-lg text-text dark:text-darkText mb-6 pl-14">
        {description}
      </p>

      {/* Pasos */}
      <div className="pl-14 space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 * i }}
          >
            <span className="w-6 h-6 flex items-center justify-center
              border-2 border-purple dark:border-darkPurple rounded-full
              text-sm font-bold text-purple dark:text-darkPurple">
              {i + 1}
            </span>
            <p className="text-text/90 dark:text-darkText/90">{step}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
