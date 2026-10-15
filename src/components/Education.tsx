import { education } from '../data/education'
import { GradIcon } from './ui/Icons'
import { Section } from './ui/Section'
import { SectionHead } from './ui/SectionHead'
import { CvTimeline } from './ui/CvTimeline'

export function Education() {
  return (
    <Section id="education">
      <SectionHead label="Education" title="Academic background" />
      <CvTimeline
        heading="Education"
        icon={<GradIcon />}
        items={[
          {
            title: education.degree,
            period: education.period,
            subtitle: education.school,
          },
        ]}
      />
    </Section>
  )
}
