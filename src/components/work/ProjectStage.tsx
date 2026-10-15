import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/projects'
import { easeOut } from '../../lib/motion'
import { ProjectVisual } from './ProjectVisual'
import { indexLabel } from './types'

export function ProjectStage({
  active,
  onSelect,
}: {
  active: number
  onSelect: (index: number) => void
}) {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const stageInView = useInView(stageRef, { amount: 0.35 })
  const current = projects[active]

  return (
    <div className="work-stage" ref={stageRef}>
      <div className="work-stage__frame">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="work-stage__layer"
            initial={false}
            animate={{
              opacity: index === active ? 1 : 0,
              scale: index === active || reduceMotion ? 1 : 1.03,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: easeOut }}
            aria-hidden={index !== active}
          >
            <ProjectVisual
              project={project}
              playing={index === active && stageInView}
            />
          </motion.div>
        ))}
      </div>

      <div className="work-stage__footer">
        <div className="work-stage__now">
          <span className="work-stage__count">
            {indexLabel(active)} <span>/ {indexLabel(projects.length - 1)}</span>
          </span>
          <span className="work-stage__name">{current.title}</span>
        </div>
        <div className="work-stage__progress" role="tablist" aria-label="Jump to project">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Go to ${project.title}`}
              className={index === active ? 'is-active' : ''}
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
