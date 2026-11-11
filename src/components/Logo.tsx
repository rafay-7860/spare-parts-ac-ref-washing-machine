import { motion } from 'framer-motion'
import logoSrc from '../assets/logo/huma-logo.png'
import { company } from '../data/company'

type LogoProps = {
  className?: string
  imgClassName?: string
  showHalo?: boolean
  animated?: boolean
  variant?: 'light' | 'dark'
}

export function Logo({
  className = '',
  imgClassName = 'h-12 w-12 sm:h-14 sm:w-14',
  showHalo = false,
  animated = false,
  variant = 'light',
}: LogoProps) {
  const titleClass = variant === 'dark' ? 'text-white' : 'text-brand-black'
  const subtitleClass = variant === 'dark' ? 'text-white/55' : 'text-brand-muted'

  return (
    <motion.a
      href="#home"
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label={`${company.displayName} home`}
      initial={animated ? { opacity: 0, scale: 0.85, rotate: -8 } : false}
      animate={animated ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <span className={`relative inline-flex shrink-0 ${showHalo ? 'logo-halo' : ''}`}>
        {showHalo && (
          <>
            <span className="pointer-events-none absolute inset-[-22%] rounded-full bg-brand-green/25 blur-md" />
            <span className="pointer-events-none absolute inset-[-14%] rounded-full bg-brand-red/15 blur-lg" />
            <span className="pointer-events-none absolute inset-[-10%] rounded-full border border-brand-green/40 pulse-ring" />
            <span
              className="pointer-events-none absolute inset-[-18%] rounded-full border border-brand-red/30 pulse-ring"
              style={{ animationDelay: '0.9s' }}
            />
          </>
        )}
        <img
          src={logoSrc}
          alt={`${company.brandName} emblem logo`}
          className={`${imgClassName} relative bg-transparent object-contain ${animated || showHalo ? 'logo-float' : ''}`}
          width={112}
          height={112}
          decoding="async"
          style={{ background: 'transparent' }}
        />
      </span>
      <span className="hidden min-[420px]:flex flex-col leading-tight">
        <span
          className={`font-display text-[0.95rem] font-bold tracking-[0.08em] sm:text-[1.05rem] ${titleClass}`}
        >
          {company.brandName}
        </span>
        <span
          className={`max-w-[11rem] text-[0.62rem] font-medium uppercase tracking-[0.14em] sm:max-w-[13rem] sm:text-[0.68rem] ${subtitleClass}`}
        >
          Spare Parts · Dubai
        </span>
      </span>
    </motion.a>
  )
}

export { logoSrc }
