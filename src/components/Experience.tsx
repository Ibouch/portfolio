import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Briefcase, GraduationCap, MapPin } from 'lucide-react'
import { gsap, EASE, revealChildren, prefersReducedMotion } from '../lib/anim'
import { experience, education } from '../data/profile'
import SectionHeading from './SectionHeading'

/**
 * Career as a commit history: a vertical rail draws itself as you scroll,
 * square nodes light up accent as each entry passes.
 */
export default function Experience() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      revealChildren(el, el.querySelectorAll('[data-entry]'), { y: 44 })

      if (prefersReducedMotion()) return
      gsap.from(el.querySelector('[data-rail]'), {
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: el.querySelector('[data-timeline]'),
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.6,
        },
      })
      el.querySelectorAll('[data-node]').forEach((node) => {
        gsap.from(node, {
          scale: 0,
          duration: 0.5,
          ease: EASE,
          scrollTrigger: { trigger: node, start: 'top 72%', once: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="experience" className="px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        index="04"
        label="EXPERIENCE"
        title={
          <>
            Where I’ve <span className="serif-i text-accent">worked.</span>
          </>
        }
      />

      <div data-timeline className="relative">
        <div data-rail className="bg-line-strong absolute top-1 bottom-0 left-[3px] w-px md:left-[219px]" />

        {experience.map((job) => (
          <article
            data-entry
            key={job.role + job.period}
            className="relative grid gap-3 pb-16 pl-8 last:pb-8 md:grid-cols-12 md:gap-8 md:pl-0"
          >
            <div
              data-node
              className="bg-accent absolute top-1.5 left-[-1px] size-[9px] rounded-full shadow-[0_0_12px_rgb(61_220_255/0.8)] md:left-[215px]"
            />

            <div className="md:col-span-2 md:pr-10 md:text-right">
              <div className="font-mono text-[11px] font-semibold tracking-wider text-accent uppercase">
                {job.period}
              </div>
              {job.location && (
                <div className="label mt-1.5 flex items-center gap-1.5 text-faint md:justify-end">
                  <MapPin size={11} />
                  {job.location}
                </div>
              )}
            </div>

            <div className="md:col-span-9 md:col-start-4">
              <h3 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
                <Briefcase size={20} className="shrink-0 text-accent" />
                {job.role}
              </h3>
              <div className="serif-i mt-1 text-lg text-dim">{job.company}</div>
              <ul className="mt-5 max-w-[70ch] space-y-2.5">
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 24)} className="flex gap-3 text-sm leading-relaxed text-dim">
                    <span className="text-faint mt-0.5 shrink-0 font-mono text-[10px]">+</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {education.map((e) => (
          <div data-entry key={e.title} className="glass glass-hover p-6 md:p-7">
            <div className="flex items-center justify-between">
              <span className="icon-chip !size-10">
                <GraduationCap size={18} />
              </span>
              <span className="label text-accent">{e.year}</span>
            </div>
            <div className="mt-4 font-bold text-ink">{e.title}</div>
            <div className="mt-1 text-sm text-dim">{e.detail}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
