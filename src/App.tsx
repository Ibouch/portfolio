import { useState } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/hero/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Metrics from './components/Metrics'
import Capabilities from './components/Capabilities'
import Stack from './components/Stack'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Recommendations from './components/Recommendations'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  useSmoothScroll()

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Metrics />
        <Capabilities />
        <Stack />
        <Experience />
        <Projects />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
