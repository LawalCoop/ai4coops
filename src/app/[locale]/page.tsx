'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify'
import LoadingScreen from '@/components/loadingScreen'
import Header from '@/sections/HeroSection'
import Services from '@/sections/services'
import { useLoading } from '@/contexts/LoadingContext'

// Componentes dinámicos
const ProjectsShowcase = dynamic(() => import('@/sections/projects'), {
  loading: () => <LoadingPlaceholder text="Loading Projects..." />,
  ssr: false
})

const About = dynamic(() => import('@/sections/about'), {
  loading: () => <LoadingPlaceholder text="Loading About..." />,
  ssr: false
})

const WhoWeAre = dynamic(() => import('@/sections/whoWeAre'), {
  loading: () => <LoadingPlaceholder text="Loading Team..." />,
  ssr: false
})

const AboutHow = dynamic(() => import('@/sections/aboutHow'), {
  loading: () => <LoadingPlaceholder text="Loading Methodology..." />,
  ssr: false
})

// Componente auxiliar para placeholders
const LoadingPlaceholder = ({ text }: { text: string }) => (
  <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-darkBg">
    <p className="text-xl font-bold">{text}</p>
  </div>
)

interface Section {
  id: string
  component: React.ComponentType
  priority: boolean
}

export default function Home() {
  const { isLoading, setIsLoading } = useLoading()
  const [contentVisible, setContentVisible] = useState(false)
  const [hasHandledHash, setHasHandledHash] = useState(false)

  // Definición de secciones (asegúrate que los IDs coincidan con los paths en navigation.ts)
  const sections: Section[] = [
    { id: 'home', component: Header, priority: true },
    { id: 'about', component: About, priority: false },
    { id: 'services', component: Services, priority: false },
    { id: 'how', component: AboutHow, priority: false },
    { id: 'who', component: WhoWeAre, priority: false },
    { id: 'projects', component: ProjectsShowcase, priority: false },
  ]

  // Efecto para manejar la carga inicial
  useEffect(() => {
    const loadInitialContent = async () => {
      try {
        // Simulamos carga mínima para la transición
        await new Promise(resolve => setTimeout(resolve, 800))

        setIsLoading(false)
        setContentVisible(true)
      } catch (error) {
        console.error('Loading error:', error)
        setIsLoading(false)
        setContentVisible(true)
      }
    }

    loadInitialContent()

    return () => {
      setIsLoading(true) // Reset al desmontar
    }
  }, [setIsLoading])

  // Efecto para manejar el hash cuando el contenido está listo
  useEffect(() => {
    if (!contentVisible || hasHandledHash) return

    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1)
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setHasHandledHash(true)
          }, 300)
        }
      }
    }

    handleHashNavigation()

    const hashChangeHandler = () => {
      setHasHandledHash(false)
      handleHashNavigation()
    }

    window.addEventListener('hashchange', hashChangeHandler)
    return () => window.removeEventListener('hashchange', hashChangeHandler)
  }, [contentVisible, hasHandledHash])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className={`min-h-screen ${contentVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <main className="relative">
        {sections.map(({ id, component: Component }) => (
          <section
            key={id}
            id={id}
            className="scroll-mt-20" // Ajusta según la altura de tu navbar
          >
            <Component />
          </section>
        ))}
      </main>
    </div>
  )
}
