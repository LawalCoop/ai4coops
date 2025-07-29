'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface MousePulseProps {
  width?: number
  height?: number
  className?: string
  mouseX?: number
  mouseY?: number
  isActive?: boolean
  color?: string
}

const vertexShaderSource = `
  attribute vec4 a_position;
  attribute vec2 a_texcoord;
  varying vec2 v_texcoord;
  
  void main() {
    gl_Position = a_position;
    v_texcoord = a_texcoord;
  }
`

const fragmentShaderSource = `
  precision mediump float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_mouse_influence;
  
  varying vec2 v_texcoord;
  
  // Función de ruido
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // Ruido suave
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  // Ruido fractal
  float fractalNoise(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * smoothNoise(p + u_time * 0.1);
      p *= 2.0;
      amplitude *= 0.4;
    }
    
    return value;
  }
  
  // Patrón hexagonal para efectos digitales
  float hexPattern(vec2 p) {
    vec2 h = vec2(1.0, 0.57735) * 0.5;
    vec2 a = mod(p, h) - h * 0.5;
    vec2 b = mod(p - h * 0.5, h) - h * 0.5;
    return min(dot(a, a), dot(b, b));
  }
  
  // Líneas de circuito/grid digital
  float digitalGrid(vec2 p) {
    vec2 grid = abs(fract(p) - 0.5);
    return min(grid.x, grid.y);
  }
  
  // Efecto de datos binarios
  float binaryData(vec2 p) {
    float n = noise(floor(p * 8.0));
    return step(0.5, n);
  }
  
  // Función para crear patrón de rombos
  float diamondPattern(vec2 uv, float size, float time) {
    // Transformar coordenadas para crear patrón de rombos
    vec2 grid = uv * size;
    vec2 gridId = floor(grid);
    vec2 gridUv = fract(grid) - 0.5;
    
    // Crear forma de rombo usando distancia manhattan
    float diamond = abs(gridUv.x) + abs(gridUv.y);
    
    // Animar los rombos con diferentes fases
    float phase = gridId.x * 0.5 + gridId.y * 0.3 + time * 0.2;
    float animation = sin(phase) * 0.5 + 0.5;
    
    // Crear bordes del rombo con animación sutil
    float edge = 1.0 - smoothstep(0.3, 0.35, diamond);
    float innerGlow = (1.0 - smoothstep(0.2, 0.3, diamond)) * 0.3 * animation;
    
    return edge * 0.15 + innerGlow;
  }
  
  // Función para crear neuronas con iluminación del mouse
  float createTechNeuron(vec2 uv, vec2 pos, float phase, float intensity, float time, float activation, float mouseBoost) {
    vec2 centered = uv - pos;
    float dist = length(centered);
    
    // Pulso suave con ocasional parpadeo digital
    float basePulse = sin(time * 0.8 + phase) * 0.05 + 0.95;
    float digitalFlash = step(0.95, sin(time * 4.0 + phase)) * 0.3;
    float totalIntensity = intensity * (0.6 + activation * 0.4) * (basePulse + digitalFlash) * (1.0 + mouseBoost);
    
    // Núcleo principal más visible - tamaños aumentados para mobile
    float coreSize = 0.028 + mouseBoost * 0.012; // Aumentado de 0.018
    float core = (1.0 - smoothstep(0.0, coreSize, dist)) * totalIntensity;
    
    // Anillo intermedio con pequeño patrón hexagonal
    float angle = atan(centered.y, centered.x);
    float hexDetail = cos(angle * 6.0) * 0.05 + 0.95;
    float ringSize = 0.045 + mouseBoost * 0.02; // Aumentado de 0.032
    float ring = (1.0 - smoothstep(coreSize, ringSize, dist)) * 0.7 * totalIntensity * hexDetail;
    
    // Halo exterior
    float haloSize = 0.07 + mouseBoost * 0.03; // Aumentado de 0.05
    float halo = (1.0 - smoothstep(ringSize, haloSize, dist)) * 0.4 * totalIntensity;
    
    // Detalles tecnológicos muy sutiles
    float techDetail = abs(sin(angle * 8.0)) * (1.0 - smoothstep(0.0, coreSize * 1.5, dist)) * 0.1 * totalIntensity;
    
    // Resplandor de activación
    float activationGlow = (1.0 - smoothstep(0.0, 0.06, dist)) * activation * 0.3;
    
    // Resplandor extra del mouse
    float mouseGlow = (1.0 - smoothstep(0.0, haloSize * 1.5, dist)) * mouseBoost * 0.3;
    
    return core + ring + halo + techDetail + activationGlow + mouseGlow;
  }
  
  // Función para calcular iluminación del mouse
  float calculateMouseIllumination(vec2 neuronPos, vec2 mousePos, float mouseInfluence) {
    if (mouseInfluence > 0.0) {
      float d = distance(mousePos, neuronPos);
      float illuminationRadius = 0.25;
      
      if (d < illuminationRadius) {
        float illuminationStrength = 1.0 - (d / illuminationRadius);
        return smoothstep(0.0, 1.0, illuminationStrength) * 0.8; // Reducido de 2.0 a 0.8
      }
    }
    return 0.0;
  }
  
  // Función para crear sinapsis con toque tecnológico sutil
  float createTechSynapse(vec2 uv, vec2 start, vec2 end, float phase, float thickness, float time, float weight) {
    vec2 pa = uv - start;
    vec2 ba = end - start;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    float dist = length(pa - ba * h);
    
    // Línea base más visible - grosor aumentado para mobile
    float baseLine = (1.0 - smoothstep(0.0, thickness * 1.5, dist)) * 0.7 * weight; // Grosor x1.5 e intensidad aumentada
    
    // Señal principal viajando
    float signalPos = mod(time * 0.4 + phase, 1.0);
    vec2 signalPosition = mix(start, end, signalPos);
    float signalDist = distance(uv, signalPosition);
    float signal = (1.0 - smoothstep(0.0, 0.03, signalDist)) * weight * 1.5; // Aumentado de 0.02
    
    // Paquete de datos adicional (más tecnológico)
    float dataPacketPos = mod(time * 0.6 + phase + 0.5, 1.0);
    vec2 dataPosition = mix(start, end, dataPacketPos);
    float dataDist = distance(uv, dataPosition);
    float dataPacket = (1.0 - smoothstep(0.0, 0.025, dataDist)) * weight * 1.2; // Aumentado de 0.015
    
    // Pulso sutil en la línea
    float transmission = sin(h * 12.0 - time * 1.5 + phase) * 0.2 + 0.8;
    float transmissionEffect = baseLine * transmission;
    
    // Resplandor tecnológico
    float techGlow = (1.0 - smoothstep(0.0, thickness * 2.5, dist)) * 0.3 * weight;
    
    return transmissionEffect + signal + dataPacket + techGlow;
  }
  
  void main() {
    vec2 uv = v_texcoord;
    vec2 mousePos = u_mouse;
    
    // CALCULAR DISTORSIÓN DE ESQUIVA DEL MOUSE
    vec2 avoidanceUV = uv;
    
    if (u_mouse_influence > 0.0) {
      float distToMouse = distance(uv, mousePos);
      float avoidanceRadius = 0.4; // Radio de influencia para esquivar
      
      if (distToMouse < avoidanceRadius) {
        float avoidanceStrength = 1.0 - (distToMouse / avoidanceRadius);
        avoidanceStrength = smoothstep(0.0, 1.0, avoidanceStrength);
        
        // Dirección para esquivar (alejarse del mouse)
        vec2 avoidDirection = normalize(uv - mousePos);
        
        // Crear movimiento de esquiva orgánico con ondas
        float wavePattern = sin(u_time * 2.0 + distToMouse * 8.0) * 0.5 + 0.5;
        
        // Las nubes se "retuercen" para esquivar
        vec2 avoidanceOffset = avoidDirection * avoidanceStrength * 0.12 * wavePattern;
        
        // Agregar rotación/torsión para que se vea más orgánico
        float angle = atan(avoidDirection.y, avoidDirection.x);
        float torsion = sin(angle * 3.0 + u_time * 1.5) * avoidanceStrength * 0.08;
        vec2 torsionOffset = vec2(-sin(angle + torsion), cos(angle + torsion)) * avoidanceStrength * 0.06;
        
        avoidanceUV += avoidanceOffset + torsionOffset;
      }
    }
    
    // Crear múltiples "nubes digitales" que esquivan el mouse
    float cloudIntensity = 0.0;
    
    // Nube Digital 1 - Con patrones hexagonales
    vec2 cloud1Center = vec2(0.2 + sin(u_time * 0.3) * 0.1, 0.8 + cos(u_time * 0.2) * 0.1);
    vec2 cloud1Pos = avoidanceUV * 6.0 + u_time * 0.8;
    float cloud1Noise = fractalNoise(cloud1Pos);
    float cloud1Dist = distance(avoidanceUV, cloud1Center);
    float cloud1Base = smoothstep(0.6, 0.2, cloud1Dist);
    
    // Agregar patrón hexagonal
    float hexGrid1 = 1.0 - smoothstep(0.02, 0.08, hexPattern(avoidanceUV * 12.0 + u_time * 0.5));
    cloud1Noise = mix(cloud1Noise, hexGrid1, 0.4);
    
    cloudIntensity += cloud1Noise * cloud1Base * 0.8;
    
    // Nube Digital 2 - Con líneas de circuito
    vec2 cloud2Center = vec2(0.8 + sin(u_time * 0.4) * 0.08, 0.5 + cos(u_time * 0.35) * 0.12);
    vec2 cloud2Pos = avoidanceUV * 5.0 + u_time * 0.6;
    float cloud2Noise = fractalNoise(cloud2Pos);
    float cloud2Dist = distance(avoidanceUV, cloud2Center);
    float cloud2Base = smoothstep(0.5, 0.15, cloud2Dist);
    
    // Agregar líneas de circuito
    float circuitLines = 1.0 - smoothstep(0.01, 0.03, digitalGrid(avoidanceUV * 15.0 + u_time * 0.3));
    cloud2Noise = mix(cloud2Noise, circuitLines, 0.3);
    
    cloudIntensity += cloud2Noise * cloud2Base * 0.7;
    
    // Nube Digital 3 - Con datos binarios
    vec2 cloud3Center = vec2(0.4 + sin(u_time * 0.25) * 0.15, 0.1 + cos(u_time * 0.3) * 0.05);
    vec2 cloud3Pos = avoidanceUV * 7.0 + u_time * 0.4;
    float cloud3Noise = fractalNoise(cloud3Pos);
    float cloud3Dist = distance(avoidanceUV, cloud3Center);
    float cloud3Base = smoothstep(0.7, 0.25, cloud3Dist);
    
    // Agregar efecto de datos binarios
    float binaryPattern = binaryData(avoidanceUV * 20.0 + u_time * 2.0);
    cloud3Noise = mix(cloud3Noise, binaryPattern, 0.25);
    
    cloudIntensity += cloud3Noise * cloud3Base * 0.6;
    
    // Fondo digital general con grid tecnológico
    vec2 backgroundPos = avoidanceUV * 4.0 + u_time * 0.3;
    float backgroundNoise = fractalNoise(backgroundPos);
    
    // Agregar grid sutil de fondo
    float subtleGrid = 1.0 - smoothstep(0.005, 0.02, digitalGrid(avoidanceUV * 25.0));
    backgroundNoise = mix(backgroundNoise, subtleGrid, 0.15);
    
    cloudIntensity += backgroundNoise * 0.2;

    // CONSTELACIÓN DE IA - Puntos brillantes conectados con patrones geométricos
    float constellationIntensity = 0.0;
    
    // Detectar si es una pantalla móvil basándose en la resolución
    float isMobile = step(u_resolution.x, 768.0); // Si ancho < 768px es mobile
    
    // Solo mostrar la red neuronal en desktop
    if (isMobile < 0.5) {
      // Red neuronal distribuida por toda la sección incluyendo márgenes y centro (6 nodos)
    
    // Posiciones distribuidas cubriendo toda el área incluyendo márgenes
    vec2 node1Base = vec2(0.05, 0.75);  // Margen izquierdo superior
    vec2 node2Base = vec2(0.5, 0.9);    // Centro superior (margen top)
    vec2 node3Base = vec2(0.95, 0.6);   // Margen derecho medio
    vec2 node4Base = vec2(0.65, 0.3);   // Centro-derecha inferior
    vec2 node5Base = vec2(0.25, 0.05);  // Centro-izquierda (margen bottom)
    vec2 node6Base = vec2(0.45, 0.45);  // Centro absoluto
    
    // Aplicar movimiento más notorio pero suave
    vec2 node1 = node1Base + vec2(sin(u_time * 0.25) * 0.045, cos(u_time * 0.2) * 0.035);
    vec2 node2 = node2Base + vec2(sin(u_time * 0.28 + 1.0) * 0.035, cos(u_time * 0.24 + 1.0) * 0.045);
    vec2 node3 = node3Base + vec2(sin(u_time * 0.26 + 2.0) * 0.04, cos(u_time * 0.23 + 2.0) * 0.032);
    vec2 node4 = node4Base + vec2(sin(u_time * 0.24 + 3.0) * 0.033, cos(u_time * 0.27 + 3.0) * 0.042);
    vec2 node5 = node5Base + vec2(sin(u_time * 0.29 + 4.0) * 0.043, cos(u_time * 0.25 + 4.0) * 0.034);
    vec2 node6 = node6Base + vec2(sin(u_time * 0.27 + 5.0) * 0.038, cos(u_time * 0.26 + 5.0) * 0.04);
    
    // Activaciones neuronales dinámicas más lentas
    float act1 = sin(u_time * 0.6 + 0.0) * 0.3 + 0.7;
    float act2 = sin(u_time * 0.6 + 1.0) * 0.3 + 0.7;
    float act3 = sin(u_time * 0.6 + 2.0) * 0.3 + 0.7;
    float act4 = sin(u_time * 0.6 + 3.0) * 0.3 + 0.7;
    float act5 = sin(u_time * 0.6 + 4.0) * 0.3 + 0.7;
    float act6 = sin(u_time * 0.6 + 5.0) * 0.3 + 0.7;
    
    // Crear todas las neuronas con iluminación del mouse
    float mouseBoost1 = calculateMouseIllumination(node1, mousePos, u_mouse_influence);
    float mouseBoost2 = calculateMouseIllumination(node2, mousePos, u_mouse_influence);
    float mouseBoost3 = calculateMouseIllumination(node3, mousePos, u_mouse_influence);
    float mouseBoost4 = calculateMouseIllumination(node4, mousePos, u_mouse_influence);
    float mouseBoost5 = calculateMouseIllumination(node5, mousePos, u_mouse_influence);
    float mouseBoost6 = calculateMouseIllumination(node6, mousePos, u_mouse_influence);
    
    constellationIntensity += createTechNeuron(uv, node1, 0.0, 0.9, u_time, act1, mouseBoost1);
    constellationIntensity += createTechNeuron(uv, node2, 1.0, 0.9, u_time, act2, mouseBoost2);
    constellationIntensity += createTechNeuron(uv, node3, 2.0, 0.9, u_time, act3, mouseBoost3);
    constellationIntensity += createTechNeuron(uv, node4, 3.0, 0.9, u_time, act4, mouseBoost4);
    constellationIntensity += createTechNeuron(uv, node5, 4.0, 0.9, u_time, act5, mouseBoost5);
    constellationIntensity += createTechNeuron(uv, node6, 5.0, 0.9, u_time, act6, mouseBoost6);
    
    // Crear conexiones formando una red distribuida natural
    
    // Conexiones radiales desde el centro hacia los márgenes
    constellationIntensity += createTechSynapse(uv, node6, node1, 0.0, 0.0025, u_time, 0.9);  // Centro a margen izq-sup
    constellationIntensity += createTechSynapse(uv, node6, node2, 1.0, 0.0025, u_time, 0.8);  // Centro a margen sup
    constellationIntensity += createTechSynapse(uv, node6, node3, 2.0, 0.0025, u_time, 0.9);  // Centro a margen derecho
    constellationIntensity += createTechSynapse(uv, node6, node4, 3.0, 0.0025, u_time, 0.7);  // Centro a centro-der-inf
    constellationIntensity += createTechSynapse(uv, node6, node5, 4.0, 0.0025, u_time, 0.8);  // Centro a margen inf
    
    // Conexiones perimetrales conectando los márgenes
    constellationIntensity += createTechSynapse(uv, node1, node2, 5.0, 0.0025, u_time, 0.6);  // Margen izq-sup a sup
    constellationIntensity += createTechSynapse(uv, node2, node3, 6.0, 0.0025, u_time, 0.7);  // Margen sup a derecho
    constellationIntensity += createTechSynapse(uv, node3, node4, 7.0, 0.0025, u_time, 0.6);  // Margen der a centro-der-inf
    constellationIntensity += createTechSynapse(uv, node4, node5, 8.0, 0.0025, u_time, 0.7);  // Centro-der-inf a margen inf
    constellationIntensity += createTechSynapse(uv, node5, node1, 9.0, 0.0025, u_time, 0.5);  // Margen inf a izq-sup (cierra el círculo)
    
    // Conexión diagonal adicional para mayor conectividad
    constellationIntensity += createTechSynapse(uv, node1, node4, 10.0, 0.0025, u_time, 0.5); // Diagonal larga
    
    } // Fin del if para desktop
    
    // Combinar constelación con las nubes
    cloudIntensity = max(cloudIntensity, constellationIntensity * 0.8);
    
    // Efecto adicional: reducir ligeramente la densidad cerca del mouse
    if (u_mouse_influence > 0.0) {
      float distToMouse = distance(uv, mousePos);
      float reductionRadius = 0.25;
      
      if (distToMouse < reductionRadius) {
        float reduction = 1.0 - (distToMouse / reductionRadius);
        cloudIntensity *= (1.0 - reduction * 0.3); // Reducción sutil
      }
    }
    
    // COLORES DINÁMICOS usando la paleta cooperativa de la web
    // Rojo cooperativo: #ff0000 (1.0, 0.0, 0.0)
    // Azul cooperativo: #0077b6 (0.0, 0.467, 0.714) 
    // Verde cooperativo: #4caf50 (0.298, 0.686, 0.314)
    // Púrpura tecnológico: #7C4DFF (0.486, 0.302, 1.0)
    
    vec3 redCoop = vec3(1.0, 0.0, 0.0);
    vec3 blueCoop = vec3(0.0, 0.467, 0.714);
    vec3 greenCoop = vec3(0.298, 0.686, 0.314);
    vec3 purpleTech = vec3(0.486, 0.302, 1.0);
    
    // Cambio de color lento y orgánico
    float colorCycle = u_time * 0.3;
    float colorMix1 = sin(colorCycle) * 0.5 + 0.5;
    float colorMix2 = sin(colorCycle + 2.094) * 0.5 + 0.5; // +120 grados
    float colorMix3 = sin(colorCycle + 4.188) * 0.5 + 0.5; // +240 grados
    
    // Mezclar entre los cuatro colores de forma cíclica
    vec3 color1 = mix(redCoop, blueCoop, colorMix1);
    vec3 color2 = mix(greenCoop, purpleTech, colorMix2);
    vec3 finalColor = mix(color1, color2, colorMix3);
    
    gl_FragColor = vec4(finalColor, cloudIntensity * 0.25);
  }
`

export default function MousePulse({
  width = 800,
  height = 600,
  className = '',
  mouseX = 0.5,
  mouseY = 0.5,
  isActive = false,
  color = '#ff6b35'
}: MousePulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const uniformsRef = useRef<{
    u_resolution: WebGLUniformLocation | null
    u_time: WebGLUniformLocation | null
    u_mouse: WebGLUniformLocation | null
    u_mouse_influence: WebGLUniformLocation | null
  }>({
    u_resolution: null,
    u_time: null,
    u_mouse: null,
    u_mouse_influence: null
  })

  // Usar refs para capturar valores actuales del mouse
  const mouseRef = useRef({ x: mouseX, y: mouseY, active: isActive })

  // Actualizar ref cuando cambien los props
  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY, active: isActive }
  }, [mouseX, mouseY, isActive])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.log('❌ Canvas no existe')
      return
    }

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.log('❌ WebGL no soportado')
      return
    }
    
    console.log('✅ WebGL inicializado')
    glRef.current = gl

    // Función para obtener dimensiones de forma segura
    const getDimensions = () => {
      if (typeof window === 'undefined') return { width: 1920, height: 1080 }
      const parent = canvas.parentElement
      return {
        width: parent?.clientWidth || window.innerWidth || 1920,
        height: parent?.clientHeight || window.innerHeight || 1080
      }
    }

    const { width: containerWidth, height: containerHeight } = getDimensions()
    
    canvas.width = containerWidth
    canvas.height = containerHeight
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    
    gl.viewport(0, 0, containerWidth, containerHeight)

    // Función para crear shader
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      
      return shader
    }

    // Crear shaders
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    if (!vertexShader || !fragmentShader) return

    // Crear programa
    const program = gl.createProgram()
    if (!program) return
    
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Error linking program:', gl.getProgramInfoLog(program))
      return
    }
    
    console.log('✅ Shaders compilados y programa linkeado')
    programRef.current = program
    gl.useProgram(program)

    // Obtener locations de uniforms
    uniformsRef.current = {
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_mouse: gl.getUniformLocation(program, 'u_mouse'),
      u_mouse_influence: gl.getUniformLocation(program, 'u_mouse_influence')
    }

    // Crear geometría (quad que cubre toda la pantalla)
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW)

    const texcoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1,
    ]), gl.STATIC_DRAW)

    // Configurar atributos
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord')

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
    gl.enableVertexAttribArray(texcoordLocation)
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0)

    // Configurar blending para transparencia
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Establecer resolución
    gl.uniform2f(uniformsRef.current.u_resolution, containerWidth, containerHeight)

    let frameCount = 0
    let lastTime = performance.now()
    const animate = (time: number) => {
      if (!gl || !programRef.current) return

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      // Actualizar uniforms usando los valores actuales del ref
      const currentMouse = mouseRef.current
      gl.uniform1f(uniformsRef.current.u_time, time * 0.001)
      gl.uniform2f(uniformsRef.current.u_mouse, currentMouse.x, currentMouse.y)
      gl.uniform1f(uniformsRef.current.u_mouse_influence, currentMouse.active ? 1.0 : 0.0)

      // Verificar rendimiento cada 60 frames
      if (frameCount % 60 === 0) {
        const fps = 60 / ((performance.now() - lastTime) / 1000)
        console.log('🎬 Frame:', frameCount, 'FPS:', fps.toFixed(1), 'Mouse:', currentMouse)
        
        // Verificar si hay errores de WebGL
        const error = gl.getError()
        if (error !== gl.NO_ERROR) {
          console.error('❌ WebGL Error:', error)
        }
        
        lastTime = performance.now()
      }
      frameCount++

      // Dibujar
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Ya no necesitamos este useEffect porque ahora usamos refs


  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  )
}