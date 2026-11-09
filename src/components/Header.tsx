import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { company, navLinks } from '../data/company'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-black/5 bg-white/95 shadow-[0_8px_30px_rgba(21,21,21,0.06)] backdrop-blur-md'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="section-pad">
        <div className="container-shell flex h-[4.5rem] items-center justify-between gap-4 sm:h-[5rem]">
          <Logo animated showHalo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-charcoal transition-colors hover:text-brand-green"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden items-center justify-center rounded-sm bg-brand-red px-4 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-brand-red-deep sm:inline-flex"
            >
              Get In Touch
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-black/10 text-brand-black transition hover:border-brand-green hover:text-brand-green lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="border-t border-black/5 bg-white lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <nav className="section-pad flex flex-col gap-1 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-sm px-3 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-charcoal hover:bg-brand-soft hover:text-brand-green"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 inline-flex items-center justify-center rounded-sm bg-brand-red px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white"
                onClick={() => setOpen(false)}
              >
                Get In Touch
              </a>
              <a
                href={company.phoneTel}
                className="px-3 py-2 text-sm text-brand-muted"
                onClick={() => setOpen(false)}
              >
                {company.phoneDisplay}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
