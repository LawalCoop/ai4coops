'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

export const Waves = () => {
  const ref = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = event => {
    const { clientX, clientY } = event
    setMousePosition({ x: clientX, y: clientY })
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="relative bg-transparent">
      {/* Olas animadas en la parte superior */}
      <div className="absolute top-0 left-0 bottom-10 w-full h-[5vh] overflow-hidden leading-none rotate-180">
        <svg
          className="absolute w-full h-full"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <motion.use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(220, 20, 60, 0.7)"
              animate={{ x: [0, -90, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255, 69, 0, 0.5)"
              animate={{ x: [0, -90, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(178, 34, 34, 0.3)"
              animate={{ x: [0, -90, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="#B22222"
              animate={{ x: [0, -90, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
