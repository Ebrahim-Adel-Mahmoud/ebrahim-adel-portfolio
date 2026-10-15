import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { easeOut } from '../../lib/motion'

type TimelineItem = {
  title: string
  period: string
  subtitle: string
  points?: string[]
}

type CvTimelineProps = {
  heading: string
  icon: ReactNode
  items: TimelineItem[]
}

export function CvTimeline({ heading, icon, items }: CvTimelineProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="cv-timeline">
      <div className="cv-timeline__section-head">
        <span className="cv-timeline__icon" aria-hidden="true">
          {icon}
        </span>
        <h3 className="cv-timeline__heading">{heading}</h3>
        <span className="cv-timeline__rule" aria-hidden="true" />
      </div>

      <ol className="cv-timeline__list">
        {items.map((item, index) => (
          <motion.li
            key={`${item.title}-${item.period}`}
            className="cv-timeline__item"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              delay: reduceMotion ? 0 : index * 0.04,
              duration: 0.45,
              ease: easeOut,
            }}
          >
            <span className="cv-timeline__dot" aria-hidden="true" />

            <div className="cv-timeline__row">
              <h4 className="cv-timeline__company">{item.title}</h4>
              <time className="cv-timeline__period">{item.period}</time>
            </div>

            <p className="cv-timeline__role">{item.subtitle}</p>

            {item.points && item.points.length > 0 ? (
              <ul className="cv-timeline__bullets">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
