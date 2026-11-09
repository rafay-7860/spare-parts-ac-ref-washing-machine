import { motion } from 'framer-motion'
import { Focus, Layers3, MapPinned, MessagesSquare } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const values = [
  {
    number: '01',
    title: 'Product Focus',
    text: 'A business focused on appliance spare parts.',
    icon: Focus,
  },
  {
    number: '02',
    title: 'Multiple Categories',
    text: 'Explore AC, refrigerator, and washing machine components.',
    icon: Layers3,
  },
  {
    number: '03',
    title: 'Customer Communication',
    text: 'Direct contact for product enquiries.',
    icon: MessagesSquare,
  },
  {
    number: '04',
    title: 'Convenient Location',
    text: 'Find us in Deira, Dubai.',
    icon: MapPinned,
  },
]

export function WhyChooseUs() {
  return (
    <section className="section-pad bg-brand-soft py-20 sm:py-28">
      <div className="container-shell">
        <SectionHeading
          label="Why Choose Us"
          title="Dependable parts. Professional service."
          align="center"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {values.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.number}
                className="relative overflow-hidden rounded-sm bg-white p-6"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
              >
                <span className="absolute right-4 top-3 font-display text-5xl font-bold text-brand-green/15">
                  {item.number}
                </span>
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-sm bg-brand-soft text-brand-green">
                  <Icon size={20} />
                </span>
                <div className="mb-4 h-[2px] w-10 bg-brand-red" />
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.06em] text-brand-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.text}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
