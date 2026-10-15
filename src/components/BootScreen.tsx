import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './BootScreen.css'

type Line =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; text: string }
  | { kind: 'ok'; text: string }

const SCRIPT: Line[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'ebrahim-adel — full-stack developer' },
  { kind: 'cmd', text: 'ls ./stack' },
  { kind: 'out', text: 'laravel/  react/  java/  spring-boot/' },
  { kind: 'cmd', text: 'boot portfolio --mode=production' },
  { kind: 'ok', text: 'APIs ready' },
  { kind: 'ok', text: 'interfaces ready' },
  { kind: 'ok', text: 'portfolio online' },
]

const CHAR_MS = 28
const LINE_PAUSE_MS = 220
const HOLD_MS = 480

export function BootScreen({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion()
  const doneRef = useRef(false)
  const [visible, setVisible] = useState(() => !reduceMotion)
  const [lines, setLines] = useState<{ kind: Line['kind']; text: string }[]>([])
  const [typing, setTyping] = useState('')
  const [promptActive, setPromptActive] = useState(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    document.body.style.overflow = ''
    onDone()
  }

  useEffect(() => {
    if (!visible) {
      finish()
      return
    }

    document.body.style.overflow = 'hidden'
    let cancelled = false
    let timer = 0

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms)
      })

    const typeText = async (text: string) => {
      setPromptActive(true)
      setTyping('')
      for (let i = 1; i <= text.length; i += 1) {
        if (cancelled) return
        setTyping(text.slice(0, i))
        await wait(CHAR_MS)
      }
      if (cancelled) return
      setPromptActive(false)
      setTyping('')
      setLines((prev) => [...prev, { kind: 'cmd', text }])
      await wait(LINE_PAUSE_MS)
    }

    const run = async () => {
      await wait(280)

      for (const line of SCRIPT) {
        if (cancelled) return

        if (line.kind === 'cmd') {
          await typeText(line.text)
        } else {
          setLines((prev) => [...prev, line])
          await wait(LINE_PAUSE_MS + 80)
        }
      }

      await wait(HOLD_MS)
      if (cancelled) return
      setVisible(false)
    }

    void run()

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once while visible
  }, [visible])

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible ? (
        <motion.div
          className="boot"
          role="status"
          aria-live="polite"
          aria-label="Booting portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="boot__window">
            <div className="boot__bar" aria-hidden="true">
              <span className="boot__dot boot__dot--r" />
              <span className="boot__dot boot__dot--y" />
              <span className="boot__dot boot__dot--g" />
              <span className="boot__title">ebrahim@portfolio:~</span>
            </div>

            <div className="boot__body">
              <p className="boot__hint" aria-hidden="true">
                # initializing full-stack environment
              </p>

              {lines.map((line, index) => (
                <p
                  key={`${line.kind}-${index}`}
                  className={`boot__line boot__line--${line.kind}`}
                >
                  {line.kind === 'cmd' ? (
                    <>
                      <span className="boot__prompt">$</span> {line.text}
                    </>
                  ) : line.kind === 'ok' ? (
                    <>
                      <span className="boot__ok">✓</span> {line.text}
                    </>
                  ) : (
                    line.text
                  )}
                </p>
              ))}

              {promptActive ? (
                <p className="boot__line boot__line--cmd">
                  <span className="boot__prompt">$</span> {typing}
                  <span className="boot__caret" aria-hidden="true" />
                </p>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
