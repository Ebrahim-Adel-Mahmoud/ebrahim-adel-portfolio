import type { SkillLevel } from '../../data/skills'
import { LEVEL_H } from './geometry'

export function LegendCube({ level }: { level: SkillLevel }) {
  const h = LEVEL_H[level]
  const w = 14
  const hh = 8
  const top =
    level === 'novice' ? '#3a4558' : level === 'competent' ? '#1a6b66' : '#3ef0e0'
  const left =
    level === 'novice' ? '#252b38' : level === 'competent' ? '#0f4542' : '#149e92'
  const right =
    level === 'novice' ? '#2e3646' : level === 'competent' ? '#147a72' : '#26c9b8'

  return (
    <svg className="skills-legend__cube" width="36" height={h + 20} viewBox={`0 0 36 ${h + 20}`} aria-hidden="true">
      <g transform={`translate(18, ${h + 8})`}>
        <path fill={left} d={`M ${-w} ${-h + hh} L 0 ${-h + hh * 2} L 0 ${hh} L ${-w} 0 Z`} />
        <path fill={right} d={`M ${w} ${-h + hh} L 0 ${-h + hh * 2} L 0 ${hh} L ${w} 0 Z`} />
        <path fill={top} d={`M 0 ${-h} L ${w} ${-h + hh} L 0 ${-h + hh * 2} L ${-w} ${-h + hh} Z`} />
      </g>
    </svg>
  )
}
