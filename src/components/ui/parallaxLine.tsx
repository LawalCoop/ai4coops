'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const ParallaxLines = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 300])

  return (
    <div ref={ref} className="h-[30vh] relative overflow-hidden">
      <div className="absolute inset-0 flex justify-around">
        {[y1, y2, y3, y2, y1].map((y, index) => (
          <motion.div
            key={index}
            className="w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
            style={{ y }}
          />
        ))}
      </div>
    </div>
  )
}
