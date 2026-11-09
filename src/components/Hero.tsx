import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { company } from '../data/company'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const floats = [
  {
    src: 'https://images.unsplash.com/photo-1631545806609-5c6ee3d14b9b?auto=format&fit=crop&w=700&q=80',
    alt: 'Air conditioning unit',
    className: 'left-[8%] top-[24%] w-[18%] max-w-[220px]',
    delay: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=700&q=80',
    alt: 'Refrigerator appliance',
    className: 'right-[10%] top-[20%] w-[16%] max-w-[200px]',
    delay: 0.15,
  },
  {
    src: 'https://images.unsplash.com/photo-1626806787461-74be3adc9d9b?auto=format&fit=crop&w=700&q=80',
    alt: 'Washing machine',
    className: 'bottom-[16%] left-[18%] w-[17%] max-w-[210px]',
    delay: 0.25,
  },
  {
    src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=700&q=80',
    alt: 'Technical appliance components',
    className: 'bottom-[18%] right-[14%] w-[19%] max-w-[230px]',
    delay: 0.35,
  },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-float', {
        y: -18,
        duration: 3.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.35,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-brand-charcoal pb-16 pt-28 text-white sm:items-center sm:pb-0 sm:pt-24"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2000&q=80"
          alt="Industrial appliance components workshop"
          className={`h-full w-full object-cover opacity-35 ${reduced ? '' : 'ken-burns'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/88 to-brand-charcoal/70" />
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="absolute left-[-10%] top-[10%] h-[42%] w-[42%] glow-green blur-3xl" />
        <div className="absolute bottom-[-8%] right-[-8%] h-[45%] w-[45%] glow-red blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {floats.map((item) => (
          <motion.div
            key={item.alt}
            className={`hero-float absolute overflow-hidden rounded-sm border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${item.className}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + item.delay, duration: 0.8 }}
          >
            <img src={item.src} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent" />
          </motion.div>
        ))}
      </div>

      <div className="section-pad relative z-10 w-full">
        <div className="container-shell max-w-4xl">
          <motion.p
            className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-brand-green-bright sm:text-xs"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Appliance Spare Parts
            <span className="mx-3 inline-block h-1 w-1 rounded-full bg-brand-red align-middle" />
            {company.locationLabel}
          </motion.p>

          <div className="space-y-1 overflow-hidden">
            {['THE RIGHT PARTS.', 'THE RIGHT FIT.', 'THE RIGHT SOLUTION.'].map((line, i) => (
              <motion.h1
                key={line}
                className="font-display text-[clamp(2.4rem,8vw,5.6rem)] font-extrabold uppercase leading-[0.95] tracking-[0.02em]"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            Your destination for air conditioning, refrigerator, and washing machine spare parts in
            Dubai.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.55 }}
          >
            <a
              href="#categories"
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-brand-green px-6 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-brand-green-deep"
            >
              Explore Products
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/25 bg-white/5 px-6 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-brand-red hover:bg-brand-red"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/60"
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <span className="relative h-10 w-[1px] overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-brand-green-bright scroll-line" />
        </span>
        <ChevronDown size={16} className="text-brand-red" />
      </a>
    </section>
  )
}
