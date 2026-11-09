import { motion } from 'framer-motion'
import { MapPin, Phone } from 'lucide-react'
import { company } from '../data/company'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="about" className="section-pad bg-white py-20 sm:py-28">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative overflow-hidden rounded-sm"
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -left-3 top-6 z-10 h-24 w-[3px] bg-brand-green" />
          <div className="absolute -right-3 bottom-8 z-10 h-24 w-[3px] bg-brand-red" />
          <img
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80"
            alt="Appliance components and technical equipment"
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/45 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-sm border border-white/15 bg-brand-black/55 p-4 backdrop-blur-md">
            <p className="font-display text-xl font-bold uppercase tracking-[0.08em] text-white">
              Deira, Dubai
            </p>
            <p className="mt-1 text-sm text-white/75">Appliance spare parts presence</p>
          </div>
        </motion.div>

        <div>
          <SectionHeading
            label="About Our Business"
            title="Your trusted destination for appliance spare parts."
          />
          <motion.p
            className="text-base leading-relaxed text-brand-muted sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {company.intro}
          </motion.p>

          <motion.ul
            className="mt-8 space-y-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            <li className="flex items-start gap-3 text-sm text-brand-charcoal sm:text-base">
              <MapPin className="mt-0.5 shrink-0 text-brand-green" size={18} />
              <span>{company.addressShort}</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-brand-charcoal sm:text-base">
              <Phone className="mt-0.5 shrink-0 text-brand-red" size={18} />
              <a href={company.phoneTel} className="hover:text-brand-green">
                {company.phoneDisplay}
              </a>
            </li>
          </motion.ul>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-brand-green px-6 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-brand-green-deep"
            >
              Contact Us
            </a>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-brand-black/15 px-6 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-brand-black transition hover:border-brand-red hover:text-brand-red"
            >
              View Location
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
