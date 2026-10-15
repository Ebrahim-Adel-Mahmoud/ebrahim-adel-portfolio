import { useCallback, useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Work } from './components/Work'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { BootScreen } from './components/BootScreen'
import { ThemeProvider } from './theme/ThemeProvider'

function App() {
  const [booting, setBooting] = useState(true)
  const finishBoot = useCallback(() => setBooting(false), [])

  return (
    <ThemeProvider>
      <BootScreen onDone={finishBoot} />
      <div className={`page${booting ? ' page--booting' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <Work />
          <Experience />
          <Education />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
