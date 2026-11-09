import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { company } from '../data/company'
import { SectionHeading } from './SectionHeading'

type FormState = {
  fullName: string
  phone: string
  email: string
  applianceType: string
  productRequired: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initial: FormState = {
  fullName: '',
  phone: '',
  email: '',
  applianceType: '',
  productRequired: '',
  message: '',
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!values.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!values.phone.trim()) errors.phone = 'Phone number is required.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email.'
  if (!values.applianceType) errors.applianceType = 'Select an appliance type.'
  if (!values.productRequired.trim()) errors.productRequired = 'Product required is required.'
  if (!values.message.trim()) errors.message = 'Message is required.'
  return errors
}

export function Contact() {
  const [values, setValues] = useState<FormState>(initial)
  const [errors, setErrors] = useState<FormErrors>({})
  const [success, setSuccess] = useState(false)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSuccess(false)
      return
    }

    const subject = encodeURIComponent(
      `Spare Parts Enquiry — ${values.applianceType}: ${values.productRequired}`
    )
    const body = encodeURIComponent(
      `Name: ${values.fullName}\nPhone: ${values.phone}\nEmail: ${values.email}\nAppliance: ${values.applianceType}\nProduct Required: ${values.productRequired}\n\nMessage:\n${values.message}`
    )
    window.location.href = `${company.emailMailto}?subject=${subject}&body=${body}`
    setSuccess(true)
  }

  return (
    <section id="contact" className="section-pad bg-white py-20 sm:py-28">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            label="Contact"
            title="Looking for the right spare part?"
            description="Reach us directly for product enquiries. Form details open your email client — messages are not auto-sent from this website."
          />

          <div className="space-y-5">
            <a
              href={company.phoneTel}
              className="flex items-start gap-3 rounded-sm border border-black/5 bg-brand-soft p-4 transition hover:border-brand-green"
            >
              <Phone className="mt-0.5 text-brand-green" size={18} />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
                  Phone
                </span>
                <span className="mt-1 block text-base font-semibold text-brand-black">
                  {company.phoneDisplay}
                </span>
              </span>
            </a>
            <a
              href={company.emailMailto}
              className="flex items-start gap-3 rounded-sm border border-black/5 bg-brand-soft p-4 transition hover:border-brand-green"
            >
              <Mail className="mt-0.5 text-brand-red" size={18} />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
                  Email
                </span>
                <span className="mt-1 block text-base font-semibold text-brand-black">
                  {company.email}
                </span>
              </span>
            </a>
            <div className="flex items-start gap-3 rounded-sm border border-black/5 bg-brand-soft p-4">
              <MapPin className="mt-0.5 text-brand-green" size={18} />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
                  Address
                </span>
                <span className="mt-1 block text-base font-semibold text-brand-black">
                  {company.address}
                </span>
              </span>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          noValidate
          className="rounded-sm border border-black/5 bg-brand-soft p-5 sm:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full Name"
              error={errors.fullName}
              value={values.fullName}
              onChange={(v) => setValues((s) => ({ ...s, fullName: v }))}
            />
            <Field
              label="Phone Number"
              error={errors.phone}
              value={values.phone}
              onChange={(v) => setValues((s) => ({ ...s, phone: v }))}
            />
            <Field
              label="Email"
              type="email"
              error={errors.email}
              value={values.email}
              onChange={(v) => setValues((s) => ({ ...s, email: v }))}
              className="sm:col-span-2"
            />
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
                Appliance Type
              </span>
              <select
                className="min-h-12 w-full rounded-sm border border-black/10 bg-white px-3 outline-none transition focus:border-brand-green"
                value={values.applianceType}
                onChange={(e) => setValues((s) => ({ ...s, applianceType: e.target.value }))}
              >
                <option value="">Select appliance</option>
                <option>Air Conditioner</option>
                <option>Refrigerator</option>
                <option>Washing Machine</option>
                <option>Other Appliance Component</option>
              </select>
              {errors.applianceType && (
                <span className="mt-1 block text-sm text-brand-red">{errors.applianceType}</span>
              )}
            </label>
            <Field
              label="Product Required"
              error={errors.productRequired}
              value={values.productRequired}
              onChange={(v) => setValues((s) => ({ ...s, productRequired: v }))}
              className="sm:col-span-2"
            />
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
                Message
              </span>
              <textarea
                rows={5}
                className="w-full rounded-sm border border-black/10 bg-white px-3 py-3 outline-none transition focus:border-brand-green"
                value={values.message}
                onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
              />
              {errors.message && (
                <span className="mt-1 block text-sm text-brand-red">{errors.message}</span>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-brand-red px-6 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-brand-red-deep sm:w-auto"
          >
            Send Enquiry
          </button>

          {success && (
            <p className="mt-4 rounded-sm border border-brand-green/30 bg-white px-4 py-3 text-sm text-brand-green-deep">
              Enquiry details prepared. Your email app should open so you can send the message
              manually.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  error,
  type = 'text',
  className = '',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-12 w-full rounded-sm border border-black/10 bg-white px-3 outline-none transition focus:border-brand-green"
      />
      {error && <span className="mt-1 block text-sm text-brand-red">{error}</span>}
    </label>
  )
}
