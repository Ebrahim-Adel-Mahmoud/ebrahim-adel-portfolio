import { projects } from '../../data/projects'

export type Project = (typeof projects)[number]
export type Link = { label: string; href: string }
export type Metric = { label: string; value: string }

export const getUrl = (project: Project) =>
  'url' in project ? (project.url as string | undefined) : undefined

export const getLinks = (project: Project): Link[] =>
  'links' in project && project.links ? project.links : []

export const getImpact = (project: Project): Metric[] =>
  'impact' in project && project.impact ? project.impact : []

export const getHighlights = (project: Project): string[] =>
  'highlights' in project && project.highlights ? project.highlights : []

export const getScrollImage = (project: Project) =>
  'scrollImage' in project ? (project.scrollImage as string) : undefined

export const indexLabel = (index: number) => String(index + 1).padStart(2, '0')

export const PREVIEW_HIGHLIGHTS = 3
export const SCROLL_PX_PER_SECOND = 70
