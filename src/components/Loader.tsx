import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { logoSrc } from './Logo'
import { company } from '../data/company'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type LoaderProps = {
  onDone?: () => void
}

export function Loader({ onDone }: LoaderProps) {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reduced) {
      setProgress(100)
      const t = window.setTimeout(() => {
        setVisible(false)
        onDone?.()
      }, 200)
      return () => window.clearTimeout(t)
    }

    let frame = 0
    let raf = 0
    const tick = () => {
      frame += 1
      const next = Math.min(100, Math.round(frame * 2.4 + Math.sin(frame / 8) * 4))
      setProgress(next)
      if (next < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        window.setTimeout(() => {
          setVisible(false)
          onDone?.()
        }, 420)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone, reduced])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-brand-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading website"
        >
          <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" />
          <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 glow-green blur-2xl" />
          <div className="pointer-events-none absolute -right-16 bottom-1/4 h-72 w-72 glow-red blur-2xl" />

          <div className="relative z-10 flex w-[min(22rem,86vw)] flex-col items-center gap-7 px-6 text-center">
            <div className="relative">
              <span className="absolute inset-[-28%] rounded-full border border-brand-green/35 pulse-ring" />
              <span
                className="absolute inset-[-18%] rounded-full border border-brand-red/30 pulse-ring"
                style={{ animationDelay: '0.7s' }}
              />
              <motion.img
                src={logoSrc}
                alt={`${company.brandName} logo`}
                className="relative h-28 w-28 object-contain logo-halo sm:h-32 sm:w-32"
                initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div>
              <p className="font-display text-2xl font-bold tracking-[0.18em] text-white sm:text-3xl">
                {company.brandName}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.28em] text-brand-muted">
                Preparing your parts destination
              </p>
            </div>

            <div className="w-full">
              <div className="mb-2 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.2em] text-brand-muted">
                <span>Loading</span>
                <span className="text-brand-green-bright">{progress}%</span>
              </div>
              <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #078C49 0%, #12A65B 45%, #D7192D 100%)',
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
