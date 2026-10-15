import { useEffect, useRef } from 'react'
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { easeOut } from '../lib/motion'

const charVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: easeOut },
  },
}

type WaveTextProps = {
  text: string
  intensity?: number
  delay?: number
  /** Reveal when scrolled into view (for sections below the fold) */
  revealOnView?: boolean
  className?: string
}

export function WaveText({
  text,
  intensity = 1,
  delay = 0,
  revealOnView = false,
  className,
}: WaveTextProps) {
  const reduceMotion = useReducedMotion()
  const controls = useAnimationControls()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const chars = Array.from(text)
  const lift = Math.round(9 * intensity)
  const shouldReveal = !revealOnView || inView

  useEffect(() => {
    if (!shouldReveal) return

    if (reduceMotion) {
      void controls.set('visible')
      return
    }

    const timer = window.setTimeout(() => {
      void controls.start((i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          delay: i * 0.022,
          duration: 0.42,
          ease: easeOut,
        },
      }))
    }, delay * 1000)

    return () => window.clearTimeout(timer)
  }, [controls, delay, reduceMotion, shouldReveal])

  const playWave = () => {
    if (reduceMotion) return
    void controls.start((i: number) => ({
      y: [0, -lift, 0],
      rotate: [0, -1.4 * intensity, 1.4 * intensity, 0],
      transition: {
        delay: i * 0.016,
        duration: 0.58,
        ease: easeOut,
      },
    }))
  }

  if (reduceMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      ref={ref}
      className={['wave-text', className].filter(Boolean).join(' ')}
      aria-label={text}
      role="text"
      onHoverStart={playWave}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          aria-hidden="true"
          className="wave-text__char"
          custom={i}
          initial="hidden"
          animate={controls}
          variants={charVariants}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
