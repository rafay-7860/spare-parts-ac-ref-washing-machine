import { motion } from 'framer-motion'
import { Navigation, MapPinned } from 'lucide-react'
import { company } from '../data/company'
import { SectionHeading } from './SectionHeading'

export function Location() {
  return (
    <section id="location" className="section-pad bg-brand-soft py-20 sm:py-28">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            label="Location"
            title="Visit us in Deira, Dubai."
            description={company.address}
          />

          <div className="space-y-3 text-sm text-brand-charcoal sm:text-base">
            <p>
              <strong className="text-brand-black">Phone:</strong>{' '}
              <a href={company.phoneTel} className="hover:text-brand-green">
                {company.phoneDisplay}
              </a>
            </p>
            <p>
              <strong className="text-brand-black">Email:</strong>{' '}
              <a href={company.emailMailto} className="hover:text-brand-green">
                {company.email}
              </a>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-green px-5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-brand-green-deep"
            >
              <MapPinned size={16} />
              Google Maps
            </a>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-brand-black/15 px-5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-brand-black transition hover:border-brand-red hover:text-brand-red"
            >
              <Navigation size={16} />
              Get Directions
            </a>
          </div>
        </div>

        <motion.div
          className="overflow-hidden rounded-sm border border-black/5 bg-white shadow-[0_20px_50px_rgba(21,21,21,0.08)]"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            title="Business location map — Deira, Dubai"
            src={company.mapsEmbed}
            className="h-[320px] w-full border-0 sm:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  )
}
