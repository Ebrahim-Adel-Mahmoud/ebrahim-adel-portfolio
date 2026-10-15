import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { easeOut } from '../lib/motion'
import { CanvasScene } from './CanvasScene'
import { WaveText } from './WaveText'

export function Hero() {
  const reduceMotion = useReducedMotion()
  const supportText = `${profile.role} (${profile.stack}) based in ${profile.location}.`

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__copy">
            <h1 className="hero__brand">
              <WaveText text={profile.name} intensity={1.4} delay={0.08} />
            </h1>

            <p className="hero__headline">
              <WaveText text={profile.heroLine} intensity={0.9} delay={0.28} />
            </p>

            <p className="hero__support">
              <WaveText text={supportText} intensity={0.55} delay={0.42} />
            </p>

            <p className="hero__targeting">
              <WaveText text={profile.targeting} intensity={0.55} delay={0.52} />
            </p>

            <motion.div
              className="hero__actions"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.55, ease: easeOut }}
            >
              <motion.a
                className="btn btn--primary"
                href="#work"
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              >
                View selected work
              </motion.a>
              <motion.a
                className="btn btn--ghost"
                href={profile.cv}
                download="Ebrahim-Adel-CV.pdf"
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              >
                Download CV
              </motion.a>
            </motion.div>

            <div className="hero__meta">
              <span>
                <WaveText
                  text={`${profile.years} years experience`}
                  intensity={0.5}
                  delay={0.95}
                />
              </span>
              <span>
                <WaveText
                  text="Java · Spring Boot · Laravel · React.js"
                  intensity={0.5}
                  delay={1.05}
                />
              </span>
              <span>
                <WaveText text={profile.availability} intensity={0.5} delay={1.15} />
              </span>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <CanvasScene />
          </div>
        </div>
      </div>
    </section>
  )
}
