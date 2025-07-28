'use client'
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface NoiseBackgroundProps {
  className?: string
}

export interface NoiseBackgroundRef {
  updateMousePosition: (x: number, y: number) => void
  setActive: (active: boolean) => void
}

// Función de ruido simplificada y más compatible
const simpleNoise = `
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
`

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  ${simpleNoise}
  
  uniform float u_time;
  uniform float u_progress;
  uniform float u_aspect;
  uniform vec3 u_color;
  uniform vec2 u_clickPoint;
  
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    vec2 centeredUv = (uv - 0.5) * vec2(u_aspect, 1.0);
    
    // Calcular distancia desde el punto de clic (igual que la demo original)
    vec2 clickPoint = (u_clickPoint - 0.5) * vec2(u_aspect, 1.0);
    float dist = distance(centeredUv, clickPoint);
    
    // Configuración exacta de la demo original
    float radius = 2.5;
    
    // Densidad modulada por distancia (como en el original)
    float density = 1.8 - dist;
    
    // Coordenadas de ruido con escalado exacto del original
    vec2 newUv = centeredUv + u_clickPoint;
    
    // Generar ruido multicapa para manchitas orgánicas
    float baseNoise = fbm(newUv * 40.0 * density + vec2(u_time, 1.0));
    float detailNoise = noise(newUv * 80.0 * density + vec2(u_time * 0.5, 1.0));
    float noiseValue = baseNoise + detailNoise * 0.3;
    
    // Crear puntos facetados más definidos
    float dots = smoothstep(0.15, 0.25, noiseValue);
    
    // Sistema dual-circle EXACTO del original
    float innerProgress = u_progress;
    float outerProgress = u_progress + 0.3;
    
    // Máscaras circulares con los valores exactos del original
    float innerCircle = 1.0 - smoothstep((innerProgress - 0.4) * radius, innerProgress * radius, dist);
    float outerCircle = 1.0 - smoothstep((outerProgress - 0.1) * radius, innerProgress * radius, dist);
    
    // El "displacement" key del efecto original
    float displacement = outerCircle - innerCircle;
    
    // Textura de grano como en el original
    float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233) * 2000.0)) * 43758.5453);
    
    // Mostrar manchitas discretas como en el original
    float finalAlpha = 0.0;
    if (u_progress > 0.0 && displacement > 0.05) {
      // Threshold binario: o se muestra la manchita o no
      float dotThreshold = step(0.3, dots);
      if (dotThreshold > 0.0) {
        finalAlpha = displacement * 0.9;
        // Añadir variación con el grano
        finalAlpha *= (0.7 + grain * 0.3);
      }
    }
    
    // Color final
    gl_FragColor = vec4(u_color, finalAlpha);
  }
`

const NoiseBackground = forwardRef<NoiseBackgroundRef, NoiseBackgroundProps>(({ className = '' }, ref) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const lastMoveTime = useRef<number>(0)

  // Colores violeta del tema (como el título)
  const purpleColors = [
    new THREE.Color(0x673ab7), // Violeta light mode
    new THREE.Color(0x7c4dff), // Violeta dark mode
    new THREE.Color(0x9c27b0), // Violeta intermedio
    new THREE.Color(0x8e24aa), // Violeta alternativo
  ]

  // Función de animación
  const animateToTarget = (targetProgress: number) => {
    const startTime = Date.now()
    const duration = 600 // Transición rápida
    const startProgress = materialRef.current?.uniforms.u_progress.value || 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Interpolación suave hacia el target
      const easeOut = 1 - Math.pow(1 - progress, 2)
      const currentProgress = startProgress + (targetProgress - startProgress) * easeOut

      if (materialRef.current) {
        materialRef.current.uniforms.u_progress.value = currentProgress
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  // Exponer métodos para el control externo
  useImperativeHandle(ref, () => ({
    updateMousePosition: (x: number, y: number) => {
      if (!materialRef.current) return
      
      // Throttle para mejor rendimiento
      const now = Date.now()
      if (now - lastMoveTime.current < 16) return
      lastMoveTime.current = now

      // Actualizar posición del mouse
      materialRef.current.uniforms.u_clickPoint.value.set(x, y)
      
      // Cambiar color ocasionalmente
      if (Math.random() < 0.02) {
        const newColor = purpleColors[Math.floor(Math.random() * purpleColors.length)]
        materialRef.current.uniforms.u_color.value = newColor
        console.log('🎨 Color cambiado')
      }

      // Activar efecto
      setIsAnimating(true)
      materialRef.current.uniforms.u_progress.value = 0.8
    },
    setActive: (active: boolean) => {
      if (!materialRef.current) return
      
      if (active) {
        setIsAnimating(true)
        materialRef.current.uniforms.u_progress.value = 0.8
        console.log('🎯 Efecto ACTIVADO')
      } else {
        animateToTarget(0)
        setTimeout(() => {
          setIsAnimating(false)
        }, 600)
        console.log('🚪 Efecto DESACTIVADO')
      }
    }
  }), [purpleColors, animateToTarget])

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Configurar escena
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Crear material shader
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_progress: { value: 0 },
        u_aspect: { value: width / height },
        u_color: { value: purpleColors[0] },
        u_clickPoint: { value: new THREE.Vector2(0.5, 0.5) }
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    // Crear geometría y mesh
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Referencias
    sceneRef.current = scene
    rendererRef.current = renderer
    materialRef.current = material

    // Loop de animación
    const animate = () => {
      if (material.uniforms.u_time) {
        material.uniforms.u_time.value += 0.01
      }
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // Manejar redimensionamiento
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      
      renderer.setSize(newWidth, newHeight)
      material.uniforms.u_aspect.value = newWidth / newHeight
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [purpleColors])

  return (
    <motion.div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full ${className} pointer-events-none`}
      style={{ 
        minHeight: '100vh'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
})

NoiseBackground.displayName = 'NoiseBackground'

export default NoiseBackground