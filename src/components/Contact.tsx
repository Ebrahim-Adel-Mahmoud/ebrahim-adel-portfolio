import { profile } from '../data/profile'

const details = [
  { label: 'Location', value: profile.location },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { label: 'GitHub', value: 'Ebrahim-Adel-Mahmoud', href: profile.github },
  { label: 'Focus', value: 'Java · Spring Boot · Laravel · React.js' },
] as const

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <div>
          <span className="section__label">Contact</span>
          <h2 className="contact__title">Let’s build the next product</h2>
          <p className="contact__text">
            Available for full-stack and backend roles — remote or hybrid. Tell me
            about the product, the constraints, and what “done” looks like.
          </p>
          <div className="contact__actions">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn btn--ghost" href={profile.cv} download="Ebrahim-Adel-CV.pdf">
              Download CV
            </a>
            <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <ul className="contact__list">
          {details.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              {'href' in item && item.href ? (
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {item.value}
                </a>
              ) : (
                <strong>{item.value}</strong>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
