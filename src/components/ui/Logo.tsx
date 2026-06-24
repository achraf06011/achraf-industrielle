'use client'

import { useId } from 'react'

interface LogoMarkProps {
  size?: number
  className?: string
}

interface LogoFullProps {
  size?: number
  className?: string
  textDark?: boolean
}

export function LogoMark({ size = 40, className = '' }: LogoMarkProps) {
  const uid = useId().replace(/:/g, '')

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ACHRAF INDUSTRIELLE logo"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A6AB0" />
          <stop offset="100%" stopColor="#0A3560" />
        </linearGradient>
        <linearGradient id={`${uid}-accent`} x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F4C81" />
          <stop offset="100%" stopColor="#00A8E8" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Octagonal background — industrial bolt shape */}
      <path
        d="M12 0 L36 0 L48 12 L48 36 L36 48 L12 48 L0 36 L0 12 Z"
        fill={`url(#${uid}-bg)`}
      />

      {/* Subtle inner grid lines */}
      <line x1="24" y1="8" x2="24" y2="40" stroke="white" strokeOpacity="0.04" strokeWidth="0.8" />
      <line x1="8" y1="24" x2="40" y2="24" stroke="white" strokeOpacity="0.04" strokeWidth="0.8" />

      {/* Main A letterform — bold & industrial */}
      <path
        d="M10 40 L24 10 L38 40"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* Crossbar */}
      <line
        x1="15.5"
        y1="30"
        x2="32.5"
        y2="30"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="square"
      />

      {/* Apex accent dot — bright blue */}
      <circle
        cx="24"
        cy="10"
        r="4"
        fill={`url(#${uid}-accent)`}
        filter={`url(#${uid}-glow)`}
      />

      {/* Bottom accent bar */}
      <path
        d="M0 43 L12 48 L36 48 L48 43"
        stroke="#00A8E8"
        strokeWidth="2"
        strokeLinecap="butt"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}

export function LogoFull({ size = 40, className = '', textDark = false }: LogoFullProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      <div>
        <div
          className={`font-display font-bold leading-none tracking-tight ${
            textDark ? 'text-gray-900' : 'text-white'
          }`}
          style={{ fontSize: size * 0.42 }}
        >
          ACHRAF
        </div>
        <div
          className="text-brand-blue-bright font-semibold tracking-[0.18em] uppercase leading-none mt-0.5"
          style={{ fontSize: size * 0.22 }}
        >
          INDUSTRIELLE
        </div>
      </div>
    </div>
  )
}

export default LogoMark
