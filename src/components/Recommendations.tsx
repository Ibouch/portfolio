import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { revealChildren } from '../lib/anim'
import { profile, recommendations } from '../data/profile'
import SectionHeading from './SectionHeading'

/**
 * Quotes marked `placeholder: true` in data/profile.ts show a small SAMPLE
 * chip — swap in real LinkedIn recommendations and flip the flag.
 */
export default function Recommendations() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      revealChildren(ref.current, ref.current.querySelectorAll('[data-reveal]'), { y: 36 })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        index="++"
        label="RECOMMENDATIONS"
        title={
          <>
            Kind <span className="serif-i text-accent">words.</span>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-3">
        {recommendations.map((r) => {
          const initials = r.name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
          return (
            <figure
              data-reveal
              key={r.name}
              className="glass glass-hover flex flex-col justify-between gap-8 p-7 md:p-8"
            >
              <div>
                {r.placeholder && (
                  <span className="mb-4 inline-block rounded-full border border-amber/40 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.14em] text-amber uppercase">
                    Sample — replace me
                  </span>
                )}
                <blockquote className="serif-i text-lg leading-relaxed text-ink">
                  “{r.quote}”
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-3">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 font-mono text-xs font-semibold text-accent"
                  aria-hidden
                >
                  {initials}
                </span>
                <span>
                  <span className="block font-mono text-xs font-semibold text-ink">{r.name}</span>
                  <span className="label mt-0.5 block">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          )
        })}
      </div>

      {/* <a
        data-reveal
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        className="label link-draw mt-8 inline-flex items-center gap-2 hover:text-accent"
      >
        READ RECOMMENDATIONS ON LINKEDIN
        <ArrowUpRight size={12} />
      </a> */}
    </section>
  )
}
