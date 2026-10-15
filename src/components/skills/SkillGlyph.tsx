import type { SkillHubId } from '../../data/skills'

export function SkillGlyph({ id, x, y, color }: { id: string; x: number; y: number; color: string }) {
  const s = 13
  switch (id) {
    case 'php':
      return (
        <g transform={`translate(${x - s}, ${y - s * 0.55})`}>
          <ellipse cx={s} cy={s * 0.55} rx={s} ry={s * 0.55} fill={color} />
          <text x={s} y={s * 0.72} textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#fff">
            PHP
          </text>
        </g>
      )
    case 'laravel':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-11" y="-11" width="22" height="22" rx="5" fill="#FF2D20" />
          <text y="5.5" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">
            L
          </text>
        </g>
      )
    case 'java':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-11" y="-11" width="22" height="22" rx="5" fill="#EA2D2E" />
          {/* coffee cup */}
          <path
            fill="#fff"
            d="M-5.5 1.5h8.2c0 3.2-1.9 5.2-4.1 5.2S-5.5 4.7-5.5 1.5Z"
          />
          <path
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            d="M2.8 1.8h2.2c1.1 0 2 .8 2 1.9s-.9 1.9-2 1.9H2.8"
          />
          <path
            fill="none"
            stroke="#fff"
            strokeWidth="1.35"
            strokeLinecap="round"
            d="M-2.8-2.2c.7-1 1.1-1.7.4-2.6M.2-2.5c.7-1 1.1-1.7.4-2.6"
          />
          <rect x="-6" y="8" width="9.5" height="1.6" rx="0.6" fill="#fff" opacity="0.9" />
        </g>
      )
    case 'spring':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <circle r="10" fill={color} />
          <path
            fill="#fff"
            d="M-5.2 2.2c2.2 3.9 7.1 4.7 10.5 2.2 2.1-1.6 2.8-3.9 2.4-5.8-1.1 2.1-3.2 2.9-5.4 3.3-2.7.5-5.1-.1-6.8-1.9-.6-.7-1.1-1.6-1.2-2.6-.5 1.6-.4 3.3.5 4.8Z"
          />
        </g>
      )
    case 'symfony':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <circle r="10" fill="#111" />
          <path
            fill="#fff"
            d="M-3.2-4.2c1.8-1.4 4.8-1.5 6 .3.7 1 .6 2.2-.1 3-1 .9-2.5.7-3.1 1.8-.4.6-.3 1.3.2 1.7.6.5 1.5.3 2.2-.4l.9 1c-1.1 1-2.7 1.3-4 .5-1.4-1-1.5-2.6-.6-3.7 1-1.2 2.6-1 3.2-1.9.4-.5.3-1.1-.2-1.5-.6-.5-1.6-.3-2.4.5l-2.1-1.3Z"
          />
        </g>
      )
    case 'rest':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-11" y="-7" width="22" height="14" rx="3" fill={color} />
          <path
            stroke="#fff"
            strokeWidth="1.8"
            fill="none"
            d="M-6 0h12M4-3.5 8 0l-4 3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )
    case 'auth':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-7" y="-1" width="14" height="10" rx="2.2" fill={color} />
          <path
            d="M-5-1V-3.5a5 5 0 0 1 10 0V-1"
            stroke={color}
            strokeWidth="2.2"
            fill="none"
          />
          <circle cy="4" r="1.6" fill="#0b0d12" />
        </g>
      )
    case 'react':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <circle r="2.4" fill={color} />
          <ellipse rx="11" ry="4.2" fill="none" stroke={color} strokeWidth="1.4" />
          <ellipse
            rx="11"
            ry="4.2"
            fill="none"
            stroke={color}
            strokeWidth="1.4"
            transform="rotate(60)"
          />
          <ellipse
            rx="11"
            ry="4.2"
            fill="none"
            stroke={color}
            strokeWidth="1.4"
            transform="rotate(120)"
          />
        </g>
      )
    case 'js':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-10" y="-10" width="20" height="20" rx="3" fill={color} />
          <text y="5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#111">
            JS
          </text>
        </g>
      )
    case 'html':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <path fill={color} d="M-9-10h18l-1.5 17L0 11l-7.5-4L-9-10Z" />
          <path
            fill="#fff"
            d="M-5.5-4h11l-.25 2.4H-2.8l.2 2h7.6l-.55 5.5L0 7.2l-4.4-1.2-.3-3.1h2.2l.12 1.3 2.35.65 2.4-.65.18-1.9h-7.4L-5.5-4Z"
          />
        </g>
      )
    case 'css':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <path fill={color} d="M-9-10h18l-1.5 17L0 11l-7.5-4L-9-10Z" />
          <path
            fill="#fff"
            d="M-5.5-4h11l-.25 2.4H-2.8l.2 2h7.6l-.55 5.7L0 7.5l-4.3-1.2-.35-3.2h2.25l.14 1.35 2.3.65 2.35-.65.22-2.1h-7.5L-5.5-4Z"
          />
        </g>
      )
    case 'bootstrap':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-10" y="-10" width="20" height="20" rx="4.5" fill={color} />
          <path
            fill="#fff"
            d="M-4-6h3.6c2.2 0 3.5 1 3.5 2.7 0 1.1-.55 1.9-1.55 2.3 1.35.45 2.15 1.45 2.15 2.9 0 2-1.55 3.2-3.9 3.2H-4V-6Zm2.2 4.1h1.25c.9 0 1.45-.45 1.45-1.1S-.35-4.1-1.2-4.1h-1V-1.9Zm0 5.1h1.45c1 0 1.6-.5 1.6-1.25s-.6-1.25-1.6-1.25h-1.45v2.5Z"
          />
        </g>
      )
    case 'mysql':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-11" y="-11" width="22" height="22" rx="5" fill="#00758F" />
          <image
            href={`${import.meta.env.BASE_URL}icons/mysql.svg`}
            x="-9"
            y="-7"
            width="18"
            height="14"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      )
    case 'sqlserver':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="-5" rx="9" ry="3.5" fill={color} />
          <path fill={color} d="M-9-5v6c0 2 4 3.5 9 3.5s9-1.5 9-3.5v-6" opacity="0.85" />
          <path fill={color} d="M-9 1v6c0 2 4 3.5 9 3.5s9-1.5 9-3.5V1" opacity="0.7" />
        </g>
      )
    case 'redis':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <path fill={color} d="M-9-2 0-8l9 6-9 6-9-6Z" />
          <path fill="#A41E11" d="M-9-2v6L0 10l9-6v-6L0 4l-9-6Z" />
        </g>
      )
    case 'docker':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-12" y="-12" width="24" height="24" rx="5" fill="#2496ED" />
          {/* container blocks */}
          <rect x="-9" y="1" width="3.2" height="3.2" rx="0.4" fill="#fff" />
          <rect x="-5.2" y="1" width="3.2" height="3.2" rx="0.4" fill="#fff" />
          <rect x="-1.4" y="1" width="3.2" height="3.2" rx="0.4" fill="#fff" />
          <rect x="-5.2" y="-2.8" width="3.2" height="3.2" rx="0.4" fill="#fff" />
          <rect x="-1.4" y="-2.8" width="3.2" height="3.2" rx="0.4" fill="#fff" />
          <rect x="2.4" y="-2.8" width="3.2" height="3.2" rx="0.4" fill="#fff" />
          <rect x="-1.4" y="-6.6" width="3.2" height="3.2" rx="0.4" fill="#fff" />
          {/* whale body / water line */}
          <path
            fill="#fff"
            d="M5.2 1.2c1.1 0 2.2-.35 2.9-1.1.5-.55.8-1.25.8-2.1h-1.9c0 .55-.45.95-1.1.95-.95 0-1.6-.75-1.6-1.85s.65-1.85 1.6-1.85c.65 0 1.1.35 1.1.9h1.9c0-.7-.3-1.3-.8-1.85-.7-.75-1.8-1.1-2.9-1.1-2.35 0-4.1 1.7-4.1 4s1.8 4.15 4.1 4.15Z"
          />
          <path
            fill="none"
            stroke="#fff"
            strokeWidth="1.4"
            strokeLinecap="round"
            d="M-10 5.8h14.5"
          />
        </g>
      )
    case 'nginx':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-10" y="-10" width="20" height="20" rx="2" fill={color} />
          <path fill="#fff" d="M-5-5v10h2.5l4.2-6.2V5H4V-5H1.5L-2.7 1.2V-5H-5Z" />
        </g>
      )
    case 'cicd':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <circle r="10" fill={color} />
          <path
            stroke="#fff"
            strokeWidth="1.8"
            fill="none"
            d="M-3.5 0a3.5 3.5 0 0 1 6-2.3M3.5 0a3.5 3.5 0 0 1-6 2.3"
            strokeLinecap="round"
          />
          <path stroke="#fff" strokeWidth="1.5" d="m3.2-4.2.9 2 2 .2M-3.2 4.2l-.9-2-2-.2" />
        </g>
      )
    case 'solid':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <path fill={color} d="M0-10 10-3.5v13L0 16l-10-6.5v-13L0-10Z" />
          <text y="3" textAnchor="middle" fontSize="8" fontWeight="800" fill="#111">
            S
          </text>
        </g>
      )
    case 'clean':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-11" y="-11" width="22" height="22" rx="5" fill={color} />
          <circle r="2.4" fill="#fff" />
          <circle r="5.2" fill="none" stroke="#fff" strokeWidth="1.5" />
          <circle r="8" fill="none" stroke="#fff" strokeWidth="1.35" opacity="0.85" />
        </g>
      )
    case 'ddd':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-12" y="-9" width="24" height="18" rx="3.5" fill={color} />
          <text y="3.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff">
            DDD
          </text>
        </g>
      )
    case 'repo':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x="-11" y="-9" width="22" height="18" rx="2.5" fill={color} />
          <path
            stroke="#fff"
            strokeWidth="1.5"
            fill="none"
            d="M-6-4.5h12M-6-0.5h12M-6 3.5h7"
            strokeLinecap="round"
          />
          <circle cx="5.5" cy="5.5" r="2.2" fill="#fff" opacity="0.9" />
        </g>
      )
    case 'tdd':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <path fill={color} d="M-9-7h18v4H-9v-4Zm3.5 5h11v11l-5.5-2.8L-5.5 9V-2Z" />
        </g>
      )
    default:
      return (
        <g transform={`translate(${x}, ${y})`}>
          <circle r="9" fill={color} />
          <text y="3.5" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff">
            {id.slice(0, 2).toUpperCase()}
          </text>
        </g>
      )
  }
}

export function HubIcon({ id, x, y }: { id: SkillHubId; x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`} className="hub-cube-icon">
      {id === 'backend' && (
        <>
          <path
            d="M0-11 11-4.5v13L0 15l-11-6.5v-13L0-11Z"
            fill="rgba(11,13,18,0.55)"
            stroke="rgba(11,13,18,0.95)"
            strokeWidth="1.3"
          />
          <path d="M0-11v26M11-4.5 0 2.5l-11-7" stroke="rgba(11,13,18,0.8)" strokeWidth="1.1" />
          <circle cy="2" r="2.4" fill="#0b0d12" />
        </>
      )}
      {id === 'frontend' && (
        <>
          <rect
            x="-12"
            y="-9"
            width="24"
            height="17"
            rx="2.5"
            fill="rgba(11,13,18,0.55)"
            stroke="rgba(11,13,18,0.95)"
            strokeWidth="1.3"
          />
          <path d="M-12 8h24" stroke="rgba(11,13,18,0.9)" strokeWidth="1.3" />
          <circle cx="-7" cy="-4.5" r="1.2" fill="#0b0d12" />
          <circle cx="-3.5" cy="-4.5" r="1.2" fill="#0b0d12" />
          <rect x="-5" y="0" width="10" height="3.5" rx="1" fill="#0b0d12" opacity="0.7" />
        </>
      )}
      {id === 'data' && (
        <>
          <ellipse
            cx="0"
            cy="-6"
            rx="10"
            ry="3.8"
            fill="rgba(11,13,18,0.55)"
            stroke="rgba(11,13,18,0.95)"
            strokeWidth="1.2"
          />
          <path
            d="M-10-6v8c0 2.1 4.5 3.8 10 3.8s10-1.7 10-3.8v-8"
            fill="rgba(11,13,18,0.45)"
            stroke="rgba(11,13,18,0.95)"
            strokeWidth="1.2"
          />
          <path d="M-10 0c0 2.1 4.5 3.8 10 3.8s10-1.7 10-3.8" stroke="rgba(11,13,18,0.75)" strokeWidth="1.1" fill="none" />
          <ellipse cx="0" cy="8" rx="10" ry="3.8" fill="rgba(11,13,18,0.55)" stroke="rgba(11,13,18,0.95)" strokeWidth="1.2" />
        </>
      )}
      {id === 'architecture' && (
        <>
          <path
            d="M0-12 10-6.5 10 4.5 0 10l-10-5.5v-11L0-12Z"
            fill="rgba(11,13,18,0.55)"
            stroke="rgba(11,13,18,0.95)"
            strokeWidth="1.3"
          />
          <path d="M0-3.5 10 2M0-3.5l-10 5.5M0-12v8.5" stroke="rgba(11,13,18,0.8)" strokeWidth="1.1" />
          <circle cy="-3.5" r="2.2" fill="#0b0d12" />
        </>
      )}
    </g>
  )
}
