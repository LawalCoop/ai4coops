'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const MovingText = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -600])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 600])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-10">
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg dark:from-darkBg dark:to-darkBg z-10" />
      <motion.div
        className="whitespace-nowrap flex gap-8 text-[150px] md:text-[200px] font-black text-primary/10 dark:text-darkPrimary/10"
        style={{ x: x1 }}
      >
        <span>IA PARA COOPERATIVAS</span>
        <span>IA PARA COOPERATIVAS</span>
        <span>IA PARA COOPERATIVAS</span>
      </motion.div>
      <motion.div
        className="whitespace-nowrap flex gap-8 text-[150px] md:text-[200px] font-black text-primary/10 dark:text-darkPrimary/10 mt-4"
        style={{ x: x2 }}
      >
        <span>COOPERATIVAS PARA IA</span>
        <span>COOPERATIVAS PARA IA</span>
        <span>COOPERATIVAS PARA IA</span>
      </motion.div>
    </div>
  )
}
