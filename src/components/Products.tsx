import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { company } from '../data/company'
import { products } from '../data/products'
import { SectionHeading } from './SectionHeading'

export function Products() {
  return (
    <section id="products" className="section-pad bg-white py-20 sm:py-28">
      <div className="container-shell">
        <SectionHeading
          label="Product Showcase"
          title="Sample product types for enquiry."
          description="These are editable demonstration listings. Inventory, brands, prices, and availability are confirmed on enquiry."
        />

        <div className="mb-8 rounded-sm border border-brand-green/20 bg-brand-soft px-4 py-3 text-sm text-brand-charcoal">
          <strong className="text-brand-green">Sample content:</strong> product cards below are
          demonstration categories until actual inventory is provided.
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className="group flex h-full flex-col overflow-hidden rounded-sm border border-black/5 bg-white shadow-[0_12px_40px_rgba(21,21,21,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(7,140,73,0.12)]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (index % 6) * 0.05, duration: 0.55 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded-sm bg-brand-black/80 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">
                  Sample
                </span>
                <span className="absolute bottom-3 left-3 rounded-sm bg-brand-green px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                  {product.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.05em] text-brand-black">
                  {product.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
                  {product.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={company.emailMailto}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-brand-green px-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-brand-green-deep"
                  >
                    <MessageCircle size={15} />
                    Email Enquiry
                  </a>
                  <a
                    href={company.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-sm border border-brand-red/30 px-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-red transition hover:bg-brand-red hover:text-white"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
