'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify'
import LoadingScreen from '@/components/loadingScreen'
import Header from '@/sections/HeroSection'
import Services from '@/sections/services'
import { useLoading } from '@/contexts/LoadingContext'

const ProjectsShowcase = dynamic(() => import('@/sections/projects'), {
  loading: () => (
    <div className="h-screen flex items-center justify-center">Loading Projects...</div>
  ),
})

const About = dynamic(() => import('@/sections/about'), {
  loading: () => <div className="h-screen flex items-center justify-center">Loading about...</div>,
})

const WhoWeAre = dynamic(() => import('@/sections/whoWeAre'), {
  loading: () => (
    <div className="h-screen flex items-center justify-center">Loading who we are...</div>
  ),
})

const AboutHow = dynamic(() => import('@/sections/aboutHow'), {
  loading: () => <div className="h-screen flex items-center justify-center">Loading how...</div>,
})

interface Section {
  id: string
  component: React.ComponentType
  priority: boolean
}

export default function Home() {
  const { isLoading, setIsLoading } = useLoading()
  const [contentVisible, setContentVisible] = useState(false)

  const sections: Section[] = [
    { id: 'home', component: Header, priority: true },
    { id: 'about', component: About, priority: false },
    { id: 'services', component: Services, priority: false },
    { id: 'aboutHow', component: AboutHow, priority: false },
    { id: 'whoWeAre', component: WhoWeAre, priority: false },
    { id: 'projects', component: ProjectsShowcase, priority: false },
  ]

  useEffect(() => {
    let mounted = true

    const loadInitialContent = async () => {
      try {
        // Only wait for critical above-the-fold images
        const criticalImages = Array.from(document.images).filter(img => {
          const rect = img.getBoundingClientRect()
          return rect.top < window.innerHeight
        })

        await Promise.all([
          // Wait for critical images
          ...criticalImages
            .filter(img => !img.complete)
            .map(
              img =>
                new Promise(resolve => {
                  img.onload = resolve
                  img.onerror = resolve
                })
            ),
          // Small delay for smoother transition
          new Promise(resolve => setTimeout(resolve, 300)),
        ])

        if (mounted) {
          setIsLoading(false)
          setContentVisible(true)
        }
      } catch (error) {
        console.error('Loading error:', error)
        if (mounted) {
          setIsLoading(false)
          setContentVisible(true)
        }
      }
    }

    loadInitialContent()

    return () => {
      mounted = false
    }
  }, [setIsLoading])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div
      className={`min-h-screen ${
        contentVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
    >
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
        {sections.map(({ id, component: Component, priority }) => (
          <section key={id} id={id} className={`scroll-mt-16 ${priority ? '' : 'lazy-section'}`}>
            <Component />
          </section>
        ))}
      </main>
    </div>
  )
}
