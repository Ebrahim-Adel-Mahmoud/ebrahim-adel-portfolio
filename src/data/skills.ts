export type SkillLevel = 'novice' | 'competent' | 'expert'

export type SkillHubId = 'backend' | 'frontend' | 'data' | 'architecture'

export const skillHubs: {
  id: SkillHubId
  label: string
  x: number
  y: number
}[] = [
  { id: 'backend', label: 'Backend', x: 270, y: 320 },
  { id: 'frontend', label: 'Frontend', x: 530, y: 220 },
  { id: 'data', label: 'Data & Infra', x: 800, y: 200 },
  { id: 'architecture', label: 'Architecture', x: 730, y: 420 },
]

export const skillNodes: {
  id: string
  label: string
  hub: SkillHubId
  level: SkillLevel
  x: number
  y: number
  color: string
  /** Extra label shift down (SVG y) when the default top label collides */
  labelDy?: number
  /** Place label under the pillar instead of above */
  labelBelow?: boolean
}[] = [
  // Backend cluster — left side
  { id: 'php', label: 'PHP (OOP)', hub: 'backend', level: 'expert', x: 115, y: 200, color: '#777BB4' },
  { id: 'laravel', label: 'Laravel', hub: 'backend', level: 'expert', x: 90, y: 300, color: '#FF2D20' },
  { id: 'java', label: 'Java', hub: 'backend', level: 'competent', x: 115, y: 405, color: '#EA2D2E' },
  { id: 'spring', label: 'Spring Boot', hub: 'backend', level: 'competent', x: 220, y: 465, color: '#6DB33F' },
  { id: 'symfony', label: 'Symfony', hub: 'backend', level: 'competent', x: 350, y: 430, color: '#1a1a1a' },
  { id: 'rest', label: 'REST APIs', hub: 'backend', level: 'expert', x: 375, y: 270, color: '#3478F6' },
  { id: 'auth', label: 'Sanctum / Passport / JWT', hub: 'backend', level: 'expert', x: 200, y: 130, color: '#2DD4A8' },
  // Frontend cluster — top center
  { id: 'react', label: 'React.js', hub: 'frontend', level: 'expert', x: 420, y: 110, color: '#61DAFB' },
  { id: 'js', label: 'JavaScript (ES6+)', hub: 'frontend', level: 'expert', x: 575, y: 95, color: '#F7DF1E' },
  { id: 'html', label: 'HTML5', hub: 'frontend', level: 'expert', x: 670, y: 130, color: '#E34F26' },
  { id: 'css', label: 'CSS3', hub: 'frontend', level: 'competent', x: 420, y: 300, color: '#1572B6' },
  { id: 'bootstrap', label: 'Bootstrap', hub: 'frontend', level: 'competent', x: 560, y: 325, color: '#7952B3' },
  // Data & Infra cluster — top right
  { id: 'mysql', label: 'MySQL', hub: 'data', level: 'expert', x: 740, y: 90, color: '#4479A1' },
  { id: 'sqlserver', label: 'SQL Server', hub: 'data', level: 'competent', x: 900, y: 105, color: '#CC2927' },
  { id: 'redis', label: 'Redis', hub: 'data', level: 'competent', x: 960, y: 190, color: '#DC382D' },
  { id: 'docker', label: 'Docker', hub: 'data', level: 'competent', x: 935, y: 295, color: '#2496ED' },
  { id: 'nginx', label: 'Nginx', hub: 'data', level: 'competent', x: 695, y: 295, color: '#009639' },
  { id: 'cicd', label: 'CI/CD', hub: 'data', level: 'novice', x: 840, y: 345, color: '#2088FF' },
  // Architecture cluster — bottom right
  { id: 'solid', label: 'SOLID', hub: 'architecture', level: 'expert', x: 595, y: 385, color: '#F5C542' },
  { id: 'clean', label: 'Clean Architecture', hub: 'architecture', level: 'expert', x: 625, y: 505, color: '#2DD4A8' },
  { id: 'ddd', label: 'DDD', hub: 'architecture', level: 'competent', x: 775, y: 530, color: '#8B7CF6' },
  {
    id: 'repo',
    label: 'Repository / Strategy',
    hub: 'architecture',
    level: 'expert',
    x: 915,
    y: 500,
    color: '#3478F6',
  },
  { id: 'tdd', label: 'TDD', hub: 'architecture', level: 'novice', x: 875, y: 390, color: '#FF7262' },
]

/** Flat groups kept for any simple list consumers */
export const skillGroups = [
  {
    title: 'Backend',
    items: skillNodes.filter((n) => n.hub === 'backend').map((n) => n.label),
  },
  {
    title: 'Frontend',
    items: skillNodes.filter((n) => n.hub === 'frontend').map((n) => n.label),
  },
  {
    title: 'Data & Infra',
    items: skillNodes.filter((n) => n.hub === 'data').map((n) => n.label),
  },
  {
    title: 'Architecture',
    items: skillNodes.filter((n) => n.hub === 'architecture').map((n) => n.label),
  },
]
