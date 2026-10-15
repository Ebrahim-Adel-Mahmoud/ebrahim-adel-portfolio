import { WaveText } from './WaveText'
import { Section } from './ui/Section'
import { SkillMap } from './skills/SkillMap'
import './Skills.css'

export function Skills() {
  return (
    <Section id="skills" className="skills-section">
      <div className="section__head">
        <span className="section__label">
          <WaveText text="Skills" intensity={0.5} revealOnView />
        </span>
        <h2 className="section__title">
          <WaveText text="Stack & craft" intensity={0.7} revealOnView />
        </h2>
        <p className="section__text">
          <WaveText
            text="Practical tools I use to design systems, ship features, and keep products maintainable under real traffic."
            intensity={0.35}
            revealOnView
          />
        </p>
      </div>

      <SkillMap />
    </Section>
  )
}
