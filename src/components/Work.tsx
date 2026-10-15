import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { projects } from '../data/projects'
import { Section } from './ui/Section'
import { SectionHead } from './ui/SectionHead'
import { ProjectStep } from './work/ProjectStep'
import { ProjectStage } from './work/ProjectStage'
import './Work.css'

export function Work() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  const registerRef = (index: number, node: HTMLElement | null) => {
    stepRefs.current[index] = node
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index))
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    stepRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const scrollToProject = (index: number) => {
    stepRefs.current[index]?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
    })
  }

  return (
    <Section id="work">
      <SectionHead
        className="work__head"
        label="Selected work"
        title="Production systems with measurable impact."
        text="From high-traffic product backends to multi-tenant ops and production refactors — reliable APIs with clear business impact across Java/Spring Boot and Laravel."
      />

      <div className="work-split">
        <div className="work-split__list">
          {projects.map((project, index) => (
            <ProjectStep
              key={project.id}
              project={project}
              index={index}
              active={index === active}
              registerRef={registerRef}
            />
          ))}
        </div>

        <div className="work-split__aside">
          <ProjectStage active={active} onSelect={scrollToProject} />
        </div>
      </div>
    </Section>
  )
}
