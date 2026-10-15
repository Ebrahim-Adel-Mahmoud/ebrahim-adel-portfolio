import { useEffect, useState } from 'react'
import { nav, profile } from '../data/profile'
import { useTheme } from '../theme/ThemeProvider'
import { MoonIcon, SunIcon } from './ui/Icons'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#top" onClick={close}>
          <span className="nav__mark">E</span>
          {profile.name}
        </a>

        <div className="nav__right">
          <ul className="nav__links">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <button
            className="nav__theme"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a className="nav__cta" href="#contact">
            Let’s talk
          </a>

          <button
            className="nav__menu"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      <div className={`nav__drawer ${open ? 'open' : ''}`}>
        <div className="container">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                className="nav__drawer-theme"
                type="button"
                onClick={() => {
                  toggleTheme()
                  close()
                }}
              >
                {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
