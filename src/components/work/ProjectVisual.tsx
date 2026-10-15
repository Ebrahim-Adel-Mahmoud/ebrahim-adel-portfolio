import { useState } from 'react'
import { ScrollingVisual } from './ScrollingVisual'
import { getImpact, getProjectImage, getScrollImage, type Project } from './types'

export function ProjectVisual({
  project,
  playing = true,
}: {
  project: Project
  playing?: boolean
}) {
  const scrollImage = getScrollImage(project)
  const [mode, setMode] = useState<'scroll' | 'static' | 'overview'>(
    scrollImage ? 'scroll' : 'static',
  )

  if (mode === 'scroll' && scrollImage) {
    return (
      <ScrollingVisual
        project={project}
        src={scrollImage}
        playing={playing}
        onError={() => setMode('static')}
      />
    )
  }

  if (mode === 'overview') {
    const impact = getImpact(project)
    return (
      <div className="project-visual project-visual--overview" data-accent={project.accent}>
        <span className="project-visual__eyebrow">Project overview</span>
        <div className="project-visual__overview">
          <span className="project-visual__category">{project.category}</span>
          <strong className="project-visual__title">{project.title}</strong>
          {impact.length > 0 ? (
            <div className="project-visual__stats">
              {impact.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="project-visual__stack">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const image = getProjectImage(project)

  return (
    <div className="project-visual">
      <img
        src={image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        onError={() => setMode('overview')}
      />
    </div>
  )
}
