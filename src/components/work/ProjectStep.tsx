import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { easeOut } from '../../lib/motion'
import { ProjectVisual } from './ProjectVisual'
import {
  getHighlights,
  getImpact,
  getLinks,
  getUrl,
  indexLabel,
  PREVIEW_HIGHLIGHTS,
  type Project,
} from './types'

export function ProjectStep({
  project,
  index,
  active,
  registerRef,
}: {
  project: Project
  index: number
  active: boolean
  registerRef: (index: number, node: HTMLElement | null) => void
}) {
  const reduceMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const url = getUrl(project)
  const extraLinks = getLinks(project)
    .filter((link) => link.href !== url)
    .slice(0, 6)
  const impact = getImpact(project)
  const highlights = getHighlights(project)
  const visible = highlights.slice(0, PREVIEW_HIGHLIGHTS)
  const hidden = highlights.slice(PREVIEW_HIGHLIGHTS)

  return (
    <article
      id={`project-${project.id}`}
      ref={(node) => registerRef(index, node)}
      data-index={index}
      className={`work-step${active ? ' is-active' : ''}`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="work-step__visual">
        <ProjectVisual project={project} playing={active} />
      </div>

      <div className="work-step__head">
        <span className="work-step__index">{indexLabel(index)}</span>
        <span className="work-step__meta">
          {project.category} · {project.period}
        </span>
      </div>

      <h3 id={`project-${project.id}-title`} className="work-step__title">
        {project.title}
      </h3>
      <p className="work-step__role">{project.role}</p>
      <p className="work-step__desc">{project.description}</p>

      {impact.length > 0 ? (
        <dl className="work-step__stats">
          {impact.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {highlights.length > 0 ? (
        <div className="work-step__built">
          <span className="work-step__label">What I built</span>
          <ul>
            {visible.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <AnimatePresence initial={false}>
            {expanded && hidden.length > 0 ? (
              <motion.ul
                key="more"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="work-step__more"
              >
                {hidden.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>
          {hidden.length > 0 ? (
            <button
              type="button"
              className="work-link work-link--quiet"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? 'Show less' : `Show all ${highlights.length}`}
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="work-step__tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {url || extraLinks.length > 0 ? (
        <div className="work-step__actions">
          {url ? (
            <a className="work-link work-link--primary" href={url} target="_blank" rel="noreferrer">
              Live project <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {extraLinks.map((link) => (
            <a key={link.href} className="work-link" href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  )
}
