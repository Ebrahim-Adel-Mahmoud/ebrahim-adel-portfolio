import type { CSSProperties } from 'react'
import type { SkillLevel } from '../../data/skills'
import { HALF_H, HALF_W } from './geometry'

/** Isometric diamond pillar drawn in SVG */
export function IsoPillar({
  x,
  y,
  height,
  size = 1,
  variant,
  glow = false,
}: {
  x: number
  y: number
  height: number
  size?: number
  variant: SkillLevel | 'hub'
  glow?: boolean
}) {
  const w = HALF_W * size
  const h = HALF_H * size
  const topY = y - height

  const palette =
    variant === 'novice'
      ? { top: '#3a4558', left: '#252b38', right: '#2e3646', edge: '#4a5568' }
      : variant === 'competent'
        ? { top: '#1a6b66', left: '#0f4542', right: '#147a72', edge: '#2dd4bf' }
        : { top: '#3ef0e0', left: '#149e92', right: '#26c9b8', edge: '#7afff0' }

  const lightPalette =
    variant === 'novice'
      ? { top: '#d5dbe6', left: '#aeb6c6', right: '#c0c7d4', edge: '#8b93a7' }
      : variant === 'competent'
        ? { top: '#5eead4', left: '#0f766e', right: '#2dd4bf', edge: '#14b8a6' }
        : { top: '#2dd4bf', left: '#0f766e', right: '#14b8a6', edge: '#5eead4' }

  // Colors are applied via CSS vars on parent; use currentColor-like approach with class
  const isHub = variant === 'hub'
  const colors = isHub || variant === 'expert' ? palette : palette

  return (
    <g
      className={`iso-pillar iso-pillar--${variant}${glow ? ' iso-pillar--glow' : ''}`}
      style={
        {
          '--p-top': colors.top,
          '--p-left': colors.left,
          '--p-right': colors.right,
          '--p-edge': colors.edge,
          '--p-top-light': lightPalette.top,
          '--p-left-light': lightPalette.left,
          '--p-right-light': lightPalette.right,
          '--p-edge-light': lightPalette.edge,
        } as CSSProperties
      }
    >
      {/* Soft ground shadow */}
      <ellipse
        cx={x}
        cy={y + 4}
        rx={w * 1.15}
        ry={h * 0.85}
        className="iso-pillar__shadow"
      />

      {/* Left face */}
      <path
        className="iso-pillar__left"
        d={`M ${x - w} ${topY + h}
            L ${x} ${topY + h * 2}
            L ${x} ${y + h}
            L ${x - w} ${y}
            Z`}
      />
      {/* Right face */}
      <path
        className="iso-pillar__right"
        d={`M ${x + w} ${topY + h}
            L ${x} ${topY + h * 2}
            L ${x} ${y + h}
            L ${x + w} ${y}
            Z`}
      />
      {/* Top face */}
      <path
        className="iso-pillar__top"
        d={`M ${x} ${topY}
            L ${x + w} ${topY + h}
            L ${x} ${topY + h * 2}
            L ${x - w} ${topY + h}
            Z`}
      />
      {/* Top edge highlight */}
      <path
        className="iso-pillar__edge"
        d={`M ${x} ${topY}
            L ${x + w} ${topY + h}
            L ${x} ${topY + h * 2}
            L ${x - w} ${topY + h}
            Z`}
        fill="none"
      />
    </g>
  )
}
