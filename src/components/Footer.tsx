import { company, navLinks } from '../data/company'
import { categories } from '../data/categories'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-green via-brand-green-bright to-brand-red" />
      <div className="section-pad py-16">
        <div className="container-shell grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="xl:col-span-1">
            <Logo variant="dark" showHalo />
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              {company.displayName}. Explore appliance spare parts categories and contact our team
              in Deira, Dubai.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-[0.1em]">Navigation</h3>
            <div className="mt-2 mb-4 h-[2px] w-10 bg-brand-red" />
            <ul className="space-y-2 text-sm text-white/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-brand-green-bright">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-[0.1em]">Categories</h3>
            <div className="mt-2 mb-4 h-[2px] w-10 bg-brand-red" />
            <ul className="space-y-2 text-sm text-white/70">
              {categories.map((category) => (
                <li key={category.id}>
                  <a href="#categories" className="transition hover:text-brand-green-bright">
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-[0.1em]">Contact</h3>
            <div className="mt-2 mb-4 h-[2px] w-10 bg-brand-red" />
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href={company.phoneTel} className="hover:text-brand-green-bright">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={company.emailMailto} className="hover:text-brand-green-bright">
                  {company.email}
                </a>
              </li>
              <li>{company.addressShort}</li>
              <li>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-green-bright hover:text-white"
                >
                  Open Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-shell mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.16em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.displayName}. All rights reserved.
          </p>
          <p className="text-brand-green-bright">{company.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
