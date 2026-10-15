import { experience } from '../data/experience'
import { BriefcaseIcon } from './ui/Icons'
import { Section } from './ui/Section'
import { SectionHead } from './ui/SectionHead'
import { CvTimeline } from './ui/CvTimeline'

export function Experience() {
  return (
    <Section id="experience" soft>
      <SectionHead
        label="Experience"
        title="Where I’ve shipped"
        text="Product teams and agencies — always close to the business problem and the delivery path."
      />
      <CvTimeline
        heading="Work experience"
        icon={<BriefcaseIcon />}
        items={experience.map((job) => ({
          title: job.company,
          period: job.period,
          subtitle: `${job.role} · ${job.type}`,
          points: job.points,
        }))}
      />
    </Section>
  )
}
