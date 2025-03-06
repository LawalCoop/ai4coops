'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const ParallaxLine = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.5])

  return (
    <div ref={ref} className="h-[30vh] relative overflow-hidden flex justify-center items-center">
      <motion.div
        className="relative h-full flex justify-center"
        style={{
          y,
          opacity,
        }}
      >
        {/* Línea principal más gruesa */}
        <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-primary to-transparent" />

        {/* Efecto de brillo */}
        <motion.div
          className="absolute inset-0 w-[4px] blur-md bg-gradient-to-b from-transparent via-primary/50 to-transparent"
          style={{ scale }}
        />
      </motion.div>
    </div>
  )
}
