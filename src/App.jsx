import { Suspense, lazy, useEffect } from 'react'
import Footer from './components/layout/Footer'
import Nav from './components/layout/Nav'
import SmoothScroll from './components/layout/SmoothScroll'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Experience from './components/sections/Experience'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import { site } from './data/site'
import { useScrollProgressDriver } from './hooks/useScrollProgress'
import { ScrollTrigger } from './lib/gsapConfig'
import { initPointerTracking } from './lib/motionState'

// The WebGL stack is the heaviest thing here and nothing above the fold needs
// it to render, so it loads on its own.
const Scene = lazy(() => import('./components/three/Scene'))

export default function App() {
  useScrollProgressDriver()

  useEffect(() => initPointerTracking(), [])

  // The load sequence only makes sense from the top of the page.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Late-arriving fonts and images change section heights, which moves every
  // trigger point with them.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <SmoothScroll>
      <ScrollProgress />

      <a
        href="#about"
        className="sr-only left-4 top-4 z-[60] rounded-md border border-edge bg-surface px-4 py-2 text-sm text-ink focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      <Suspense fallback={null}>
        <Scene initials={site.initials} />
      </Suspense>

      <CustomCursor />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  )
}
