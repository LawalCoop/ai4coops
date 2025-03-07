'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const CompactModernParallax = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Transformaciones para el parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]) // Movimiento lento
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]) // Movimiento medio
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]) // Movimiento rápido
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]) // Desvanecimiento

  return (
    <div
      ref={ref}
      className="h-[50vh] relative overflow-hidden flex justify-center items-center bg-transparent"
    >
      {/* Capa 1: Formas geométricas grandes (movimiento lento) */}
      <motion.div
        className="w-32 h-32 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] rounded-full absolute top-1/4 left-1/4 blur-xl opacity-50"
        style={{
          y: y1,
          opacity,
        }}
      />

      {/* Capa 2: Formas geométricas medianas (movimiento medio) */}
      <motion.div
        className="w-24 h-24 bg-gradient-to-r from-[#F472B6] to-[#F59E0B] rounded-lg absolute top-1/2 left-1/2 blur-lg opacity-70"
        style={{
          y: y2,
          opacity,
        }}
      />

      {/* Capa 3: Formas geométricas pequeñas (movimiento rápido) */}
      <motion.div
        className="w-16 h-16 bg-gradient-to-r from-[#A78BFA] to-[#F472B6] rounded-t-full absolute bottom-1/4 right-1/4 blur-md opacity-90"
        style={{
          y: y3,
          opacity,
        }}
      />

      {/* Efecto de luz central */}
      <motion.div
        className="w-48 h-48 bg-gradient-to-r from-[#38BDF8] to-[#A78BFA] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl opacity-30"
        style={{
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          opacity,
        }}
      />
    </div>
  )
}
