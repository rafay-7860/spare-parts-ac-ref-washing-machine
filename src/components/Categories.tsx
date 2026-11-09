import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../data/categories'
import { SectionHeading } from './SectionHeading'

export function Categories() {
  return (
    <section id="categories" className="section-pad bg-brand-soft py-20 sm:py-28">
      <div className="container-shell">
        <SectionHeading
          label="Explore Our Products"
          title="Quality parts for everyday appliances."
          description="Browse sample categories for air conditioning, refrigerator, and washing machine spare parts."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category, index) => (
            <motion.article
              key={category.id}
              className="group relative overflow-hidden rounded-sm bg-white"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/25 to-transparent" />
                <span className="absolute left-4 top-4 font-display text-4xl font-bold text-white/35">
                  {category.number}
                </span>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand-green transition-all duration-500 group-hover:w-full" />
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.06em] text-brand-black sm:text-2xl">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
                  {category.description}
                </p>
                <a
                  href={category.href}
                  className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-brand-green transition hover:text-brand-red"
                >
                  Explore
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
