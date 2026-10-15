import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { skillGroups, skillHubs, skillNodes } from '../../data/skills'
import { easeOut } from '../../lib/motion'
import {
  HALF_H,
  HUB_H,
  HUB_LINKS,
  LEVEL_H,
  VIEW_H,
  VIEW_W,
  cablePath,
  hubPoint,
} from './geometry'
import { HubIcon, SkillGlyph } from './SkillGlyph'
import { IsoPillar } from './IsoPillar'
import { LegendCube } from './LegendCube'

export function SkillMap() {
  const reduceMotion = useReducedMotion()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInView = useInView(mapRef, { amount: 0.2 })
  const cablesLive = mapInView && !reduceMotion

  return (
    <motion.div
      ref={mapRef}
      className="skills-map"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <div className="skills-map__grid" aria-hidden="true" />

      <div className="skills-map__stage">
        <svg
          className="skills-map__canvas"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Skill constellation showing Backend, Frontend, Data and Infra, and Architecture"
        >
          <defs>
            <filter id="cable-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="cable-glow-strong" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="cable-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5f0" stopOpacity="0.25" />
              <stop offset="45%" stopColor="#5ef6ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#00e5f0" stopOpacity="0.25" />
            </linearGradient>
            <style>{`
                  .iso-pillar__top { fill: var(--p-top); }
                  .iso-pillar__left { fill: var(--p-left); }
                  .iso-pillar__right { fill: var(--p-right); }
                  .iso-pillar__edge { stroke: var(--p-edge); stroke-width: 1; opacity: 0.65; }
                  .iso-pillar__shadow { fill: rgba(0,0,0,0.35); }
                  .iso-pillar--glow { filter: url(#node-glow); }
                  .iso-pillar--glow .iso-pillar__top { fill: #4af5e6; }
                  .iso-pillar--hub .iso-pillar__top { fill: #4af5e6; }
                  .iso-pillar--hub .iso-pillar__left { fill: #149e92; }
                  .iso-pillar--hub .iso-pillar__right { fill: #26c9b8; }
                  .iso-pillar--hub .iso-pillar__edge { stroke: #7afff0; stroke-width: 1.4; opacity: 0.9; }
                  .skill-label {
                    fill: var(--label, #f2f6fc);
                    font-size: 12px;
                    font-weight: 600;
                    font-family: Inter, system-ui, sans-serif;
                    paint-order: stroke;
                    stroke: rgba(8, 12, 18, 0.75);
                    stroke-width: 3px;
                    stroke-linejoin: round;
                  }
                  .skill-label--hub {
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    stroke-width: 4px;
                  }
                  .skill-label--soft { fill: var(--label-soft, #a8b2c4); }
                  .cable-core {
                    fill: none;
                    stroke: url(#cable-grad);
                    stroke-linecap: round;
                  }
                  .cable-bloom {
                    fill: none;
                    stroke: #00e5f0;
                    stroke-linecap: round;
                    opacity: 0.4;
                    filter: url(#cable-glow-strong);
                  }
                  .cable-dash {
                    fill: none;
                    stroke: #9ffff6;
                    stroke-linecap: round;
                    stroke-dasharray: 4 8;
                    opacity: 0.95;
                    filter: url(#cable-glow);
                  }
                  .cable-dash--flow {
                    animation: cable-flow 2.4s linear infinite;
                  }
                  @keyframes cable-flow {
                    to { stroke-dashoffset: -56; }
                  }
                  [data-theme='light'] .iso-pillar__top { fill: var(--p-top-light); }
                  [data-theme='light'] .iso-pillar__left { fill: var(--p-left-light); }
                  [data-theme='light'] .iso-pillar__right { fill: var(--p-right-light); }
                  [data-theme='light'] .iso-pillar__edge { stroke: var(--p-edge-light); }
                  [data-theme='light'] .iso-pillar__shadow { fill: rgba(11,13,18,0.12); }
                  [data-theme='light'] .iso-pillar--glow .iso-pillar__top,
                  [data-theme='light'] .iso-pillar--hub .iso-pillar__top { fill: #2dd4bf; }
                  [data-theme='light'] .iso-pillar--hub .iso-pillar__left { fill: #0f766e; }
                  [data-theme='light'] .iso-pillar--hub .iso-pillar__right { fill: #14b8a6; }
                  [data-theme='light'] .cable-bloom { stroke: #0d9488; opacity: 0.22; }
                  [data-theme='light'] .cable-dash { stroke: #14b8a6; }
                  [data-theme='light'] .skill-label {
                    fill: #0b0d12;
                    stroke: rgba(255, 255, 255, 0.85);
                  }
                  [data-theme='light'] .skill-label--soft { fill: #3a4254; }
                  [data-theme='light'] .hub-cube-icon path:first-child {
                    fill: rgba(255,255,255,0.55);
                    stroke: rgba(11,13,18,0.75);
                  }
                `}</style>
          </defs>

          {/* Thick hub-to-hub cables (fiber bundles) */}
          {HUB_LINKS.map(([a, b, bend]) => {
            const from = hubPoint(a)
            const to = hubPoint(b)
            const d = cablePath(from, to, bend)
            const d2 = cablePath(
              { x: from.x + 4, y: from.y + 3 },
              { x: to.x - 3, y: to.y + 2 },
              bend * 0.92,
            )
            const d3 = cablePath(
              { x: from.x - 3, y: from.y - 2 },
              { x: to.x + 2, y: to.y - 3 },
              bend * 1.08,
            )
            return (
              <g key={`hub-${a}-${b}`}>
                <path className="cable-bloom" d={d} strokeWidth="14" />
                <path className="cable-bloom" d={d2} strokeWidth="8" />
                <path className="cable-core" d={d} strokeWidth="4" />
                <path className="cable-core" d={d2} strokeWidth="2.2" opacity="0.65" />
                <path className="cable-core" d={d3} strokeWidth="1.8" opacity="0.45" />
                <path
                  className={`cable-dash${cablesLive ? ' cable-dash--flow' : ''}`}
                  d={d}
                  strokeWidth="1.7"
                />
              </g>
            )
          })}

          {/* Skill spokes */}
          {skillNodes.map((node) => {
            const hub = hubPoint(node.hub)
            const d = cablePath(hub, node, 0.95)
            return (
              <g key={`spoke-${node.id}`}>
                <path className="cable-bloom" d={d} strokeWidth="5" />
                <path className="cable-core" d={d} strokeWidth="1.8" />
                <path
                  className={`cable-dash${cablesLive ? ' cable-dash--flow' : ''}`}
                  d={d}
                  strokeWidth="1.1"
                />
              </g>
            )
          })}

          {/* Skill nodes */}
          {skillNodes.map((node) => {
            const h = LEVEL_H[node.level]
            const iconY = node.y - h - 2
            const labelY = node.labelBelow
              ? node.y + HALF_H + 22
              : node.y - h - HALF_H - 16 + (node.labelDy ?? 0)
            const glow = node.level === 'expert'
            return (
              <g key={node.id} className="skill-item">
                <IsoPillar
                  x={node.x}
                  y={node.y}
                  height={h}
                  variant={node.level}
                  glow={glow}
                />
                <SkillGlyph id={node.id} x={node.x} y={iconY} color={node.color} />
                <text
                  x={node.x}
                  y={labelY}
                  textAnchor="middle"
                  className="skill-label skill-label--soft"
                >
                  {node.label}
                </text>
              </g>
            )
          })}

          {/* Hub nodes */}
          {skillHubs.map((hub) => {
            const iconY = hub.y - HUB_H - 2
            const labelY = hub.y - HUB_H - HALF_H - 18
            return (
              <g key={hub.id} className="skill-hub">
                <IsoPillar x={hub.x} y={hub.y} height={HUB_H} size={1.25} variant="hub" glow />
                <HubIcon id={hub.id} x={hub.x} y={iconY} />
                <text x={hub.x} y={labelY} textAnchor="middle" className="skill-label skill-label--hub">
                  {hub.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="skills-legend">
        <span className="skills-legend__title">Skill Proficiency Index</span>
        <ul className="skills-legend__items">
          <li className="skills-legend__item">
            <LegendCube level="novice" />
            Novice
          </li>
          <li className="skills-legend__item">
            <LegendCube level="competent" />
            Competent
          </li>
          <li className="skills-legend__item">
            <LegendCube level="expert" />
            Expert
          </li>
        </ul>
      </div>

      <div className="skills-fallback">
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-block">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
