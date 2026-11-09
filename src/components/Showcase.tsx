import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const visuals = [
  {
    src: 'https://images.unsplash.com/photo-1631545806609-5c6ee3d14b9b?auto=format&fit=crop&w=900&q=80',
    alt: 'Air conditioning system',
    className: 'left-[6%] top-[18%] w-[24%] max-w-[280px]',
  },
  {
    src: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=80',
    alt: 'Refrigerator unit',
    className: 'right-[8%] top-[14%] w-[22%] max-w-[260px]',
  },
  {
    src: 'https://images.unsplash.com/photo-1626806787461-74be3adc9d9b?auto=format&fit=crop&w=900&q=80',
    alt: 'Washing machine detail',
    className: 'bottom-[14%] left-[28%] w-[26%] max-w-[300px]',
  },
]

export function Showcase() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60])
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.05, 1.18])

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] overflow-hidden bg-brand-black py-24 text-white sm:min-h-[80vh]"
    >
      <motion.img
        style={{ scale }}
        src="https://images.unsplash.com/photo-1581092335397-9583eb7a2c2e?auto=format&fit=crop&w=2000&q=80"
        alt="Technical appliance components"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/80 to-brand-black" />
      <div className="absolute inset-0 tech-grid opacity-40" />
      <div className="absolute left-[-12%] top-[20%] h-[40%] w-[40%] glow-green blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[42%] w-[42%] glow-red blur-3xl" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        aria-hidden="true"
      >
        <line x1="8%" y1="20%" x2="40%" y2="45%" stroke="#078C49" strokeWidth="1" />
        <line x1="60%" y1="25%" x2="90%" y2="55%" stroke="#D7192D" strokeWidth="1" />
        <line x1="20%" y1="75%" x2="70%" y2="60%" stroke="#12A65B" strokeWidth="1" />
      </svg>

      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {visuals.map((item, i) => (
          <motion.div
            key={item.alt}
            style={{ y }}
            className={`absolute overflow-hidden rounded-sm border border-white/10 shadow-2xl ${item.className}`}
            initial={{ opacity: 0, clipPath: 'inset(20% 20% 20% 20%)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={item.src} alt="" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </div>

      <div className="section-pad relative z-10">
        <div className="container-shell max-w-3xl text-center">
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-green-bright"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Cinematic Showcase
          </motion.p>
          <motion.h2
            className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-[0.04em] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Every component matters.
          </motion.h2>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            Precision-focused browsing for AC, refrigerator, and washing machine spare parts in
            Dubai.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
