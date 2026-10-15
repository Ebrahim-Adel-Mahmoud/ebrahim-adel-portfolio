import { skillHubs, type SkillHubId, type SkillLevel } from '../../data/skills'

export const VIEW_W = 1040
export const VIEW_H = 640

export const LEVEL_H: Record<SkillLevel, number> = {
  novice: 8,
  competent: 20,
  expert: 34,
}

export const HUB_H = 46
export const HALF_W = 24
export const HALF_H = 13

export function hubPoint(id: SkillHubId) {
  return skillHubs.find((h) => h.id === id)!
}

export function cablePath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend = 1,
) {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const dist = Math.hypot(dx, dy) || 1
  const amount = Math.min(42, dist * 0.22) * bend
  const cx = mx - (dy / dist) * amount
  const cy = my + (dx / dist) * amount
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

export const HUB_LINKS: [SkillHubId, SkillHubId, number][] = [
  ['backend', 'frontend', 1],
  ['frontend', 'data', 1.05],
  ['frontend', 'architecture', 0.9],
  ['data', 'architecture', 1],
  ['backend', 'architecture', 0.85],
]
