import { motion } from 'framer-motion'

type SectionHeadingProps = {
  label: string
  title: string
  description?: string
  light?: boolean
  align?: 'left' | 'center'
}

export function SectionHeading({
  label,
  title,
  description,
  light = false,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-10 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${
          light ? 'text-brand-green-bright' : 'text-brand-green'
        }`}
      >
        {label}
      </p>
      <h2
        className={`font-display text-3xl font-bold uppercase leading-[1.05] tracking-[0.04em] sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-brand-black'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-white/70' : 'text-brand-muted'}`}>
          {description}
        </p>
      )}
      <span
        className={`mt-5 inline-block h-[3px] w-16 ${align === 'center' ? 'mx-auto' : ''}`}
        style={{
          background: 'linear-gradient(90deg, #078C49, #D7192D)',
        }}
      />
    </motion.div>
  )
}
