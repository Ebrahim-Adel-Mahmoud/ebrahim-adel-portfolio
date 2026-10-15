import { profile } from '../data/profile'

const links = [
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'CV', href: profile.cv, download: 'Ebrahim-Adel-CV.pdf' },
  { label: 'Email', href: `mailto:${profile.email}` },
] as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {year} {profile.name}
        </span>
        <div className="footer__links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...('external' in link && link.external
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
              {...('download' in link && link.download ? { download: link.download } : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
