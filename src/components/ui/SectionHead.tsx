import { WaveText } from '../WaveText'

type SectionHeadProps = {
  label: string
  title: string
  text?: string
  className?: string
}

export function SectionHead({ label, title, text, className = '' }: SectionHeadProps) {
  return (
    <div className={`section__head${className ? ` ${className}` : ''}`}>
      <span className="section__label">
        <WaveText text={label} intensity={0.5} revealOnView />
      </span>
      <h2 className="section__title">
        <WaveText text={title} intensity={0.85} revealOnView delay={0.06} />
      </h2>
      {text ? (
        <p className="section__text">
          <WaveText text={text} intensity={0.4} revealOnView delay={0.12} />
        </p>
      ) : null}
    </div>
  )
}
