import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
  soft?: boolean
}

export function Section({ id, children, className = '', soft = false }: SectionProps) {
  const classes = ['section', soft ? 'section--soft' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={classes} id={id}>
      <div className="container">{children}</div>
    </section>
  )
}
