'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Opción 1: Cursor con partícula seguidora
export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check if device supports touch
    const checkTouchDevice = () => {
      const hasTouchSupport = 'ontouchstart' in window || 
                            navigator.maxTouchPoints > 0 || 
                            window.matchMedia('(pointer: coarse)').matches
      setIsTouchDevice(hasTouchSupport)
    }

    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)

    return () => {
      window.removeEventListener('resize', checkTouchDevice)
    }
  }, [])

  useEffect(() => {
    // Don't add mouse listeners on touch devices
    if (isTouchDevice) return
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(
        target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('[data-hover]') !== null
      )
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isTouchDevice])

  // Don't render cursor on touch devices
  if (isTouchDevice) return null

  return (
    <>
      {/* Cursor principal */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-red-500 pointer-events-none z-[9999]"
        style={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: {
            type: 'spring',
            stiffness: 300,
            damping: 25,
          },
        }}
      />
      {/* Partícula seguidora */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-red-500/50 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
    </>
  )
}
