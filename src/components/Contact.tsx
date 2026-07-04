import { useRef, useState, type FormEvent } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Check, Copy, Link, MapPin, Phone, Send, ShieldCheck } from 'lucide-react'
import { revealChildren } from '../lib/anim'
import { profile } from '../data/profile'
import { useMagnetic } from '../hooks/useMagnetic'
import SectionHeading from './SectionHeading'

const field =
  'mt-2 w-full rounded-xl border border-line bg-bg/50 px-4 py-3 font-mono text-sm text-ink placeholder:text-faint transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'

function SubmitButton() {
  const ref = useMagnetic<HTMLButtonElement>(0.3)
  return (
    <button
      ref={ref}
      type="submit"
      data-cursor
      className="bg-accent text-bg hover:bg-ink inline-flex items-center gap-3 rounded-full px-7 py-4 font-mono text-xs font-semibold tracking-[0.14em] uppercase shadow-[0_0_24px_rgb(61_220_255/0.35)] transition-all duration-300 select-none hover:shadow-none"
    >
      Send message <ArrowUpRight size={14} strokeWidth={2.5} />
    </button>
  )
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useGSAP(
    () => {
      if (!ref.current) return
      revealChildren(ref.current, ref.current.querySelectorAll('[data-reveal]'))
    },
    { scope: ref },
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable — the mailto link still works
    }
  }

  // no backend by design: compose the message into the visitor's mail client;
  // delivery lands via Cloudflare Email Routing on contact@ibouch.com
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Portfolio contact — ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} <${data.get('email')}>`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section ref={ref} id="contact" className="px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        index="06"
        label="CONTACT"
        title={
          <>
            Get in <span className="serif-i text-accent">touch.</span>
          </>
        }
      />

      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div data-reveal className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="link-draw font-mono text-[clamp(1.1rem,3vw,1.8rem)] font-semibold text-ink"
            >
              {profile.email}
            </a>
            <button
              onClick={copyEmail}
              data-cursor
              className="label hover:border-accent hover:text-accent flex items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 transition-colors"
              aria-live="polite"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>

          <div data-reveal className="glass mt-12 p-6 md:p-8">
            {[
              { icon: Link, label: 'LINKEDIN', value: 'in/ilyes-bouchlaghem', href: profile.linkedin },
              { icon: Phone, label: 'PHONE', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
              { icon: MapPin, label: 'BASE', value: `${profile.location} — open to relocate` },
              { icon: ShieldCheck, label: 'WORK RIGHTS', value: 'EU/EEA + CH, no sponsorship needed' },
            ].map((row) => (
              <div
                key={row.label}
                className="rule flex items-center justify-between gap-6 border-b py-3.5 first:pt-1 last:border-b-0 last:pb-1"
              >
                <span className="label flex shrink-0 items-center gap-2.5">
                  <row.icon size={14} className="text-accent" />
                  {row.label}
                </span>
                {row.href ? (
                  <a
                    href={row.href}
                    target={row.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="link-draw flex items-center gap-1 font-mono text-[12px] text-ink"
                  >
                    {row.value} <ArrowUpRight size={11} />
                  </a>
                ) : (
                  <span className="text-right font-mono text-[12px] text-ink">{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <form data-reveal onSubmit={onSubmit} className="glass p-7 md:p-9 lg:col-span-5 lg:col-start-8">
          <div className="label mb-7 flex items-center gap-2.5">
            <Send size={13} className="text-accent" />
            SEND A MESSAGE
          </div>
          <div className="space-y-6">
            <label className="block">
              <span className="label">Name</span>
              <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
            </label>
            <label className="block">
              <span className="label">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className={field}
              />
            </label>
            <label className="block">
              <span className="label">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about the role or the project…"
                className={`${field} resize-none`}
              />
            </label>
          </div>
          <div className="mt-8">
            <SubmitButton />
          </div>
          {/* <p className="label mt-5 text-faint">I usually reply within 24 hours.</p> */}
        </form>
      </div>
    </section>
  )
}
