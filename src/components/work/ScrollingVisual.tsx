import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import {
  getUrl,
  SCROLL_PX_PER_SECOND,
  type Project,
} from './types'

export function ScrollingVisual({
  project,
  src,
  playing,
  onError,
}: {
  project: Project
  src: string
  playing: boolean
  onError: () => void
}) {
  const reduceMotion = useReducedMotion()
  const viewportRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const wasRunning = useRef(false)
  const inView = useInView(viewportRef, { amount: 0.35 })
  const [distance, setDistance] = useState(0)
  const [cycle, setCycle] = useState(0)
  const url = getUrl(project)
  const host = (() => {
    if (!url) return project.title
    const hostname = new URL(url).hostname.replace(/^www\./, '')
    if (hostname.includes('play.google.com')) return `${project.title} · Google Play`
    if (hostname.includes('apps.apple.com')) return `${project.title} · App Store`
    if (hostname.includes('figma.com')) return `${project.title} · Figma`
    return hostname
  })()

  const running = Boolean(playing && inView && !reduceMotion && distance > 0)

  useEffect(() => {
    if (running && !wasRunning.current) {
      // Restart from the top whenever this preview becomes active again.
      setCycle((value) => value + 1)
    }
    wasRunning.current = running
  }, [running])

  useEffect(() => {
    const viewport = viewportRef.current
    const img = imgRef.current
    if (!viewport || !img) return
    const measure = () =>
      setDistance(Math.max(0, img.offsetHeight - viewport.offsetHeight))
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(img)
    measure()
    return () => observer.disconnect()
  }, [cycle, src])

  const style = {
    '--scroll-distance': `-${distance}px`,
    '--scroll-duration': `${Math.max(10, distance / SCROLL_PX_PER_SECOND)}s`,
  } as CSSProperties

  return (
    <div className="project-visual project-visual--browser">
      <div className="project-visual__bar" aria-hidden="true">
        <span className="project-visual__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="project-visual__url">{host}</span>
      </div>
      <div
        ref={viewportRef}
        className={`project-visual__viewport${running ? ' is-playing' : ''}`}
        style={style}
      >
        <img
          key={cycle}
          ref={imgRef}
          src={src}
          alt={`${project.title} website, full page`}
          loading="lazy"
          onLoad={() => {
            const viewport = viewportRef.current
            const img = imgRef.current
            if (viewport && img) {
              setDistance(Math.max(0, img.offsetHeight - viewport.offsetHeight))
            }
          }}
          onError={onError}
        />
      </div>
    </div>
  )
}
