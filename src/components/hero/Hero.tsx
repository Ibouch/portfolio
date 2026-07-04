import { Suspense, lazy, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, prefersReducedMotion } from '../../lib/anim'
import { heroTyped, profile, site } from '../../data/profile'
import { useTypewriter } from '../../hooks/useTypewriter'
import MagneticButton from '../MagneticButton'

const ParticleField = lazy(() => import('./ParticleField'))

type Props = { ready: boolean }

export default function Hero({ ready }: Props) {
  const ref = useRef<HTMLElement>(null)
  const typed = useTypewriter(heroTyped)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = ref.current
      if (!el) return

      const masked = el.querySelectorAll('[data-mask] > *')
      const fades = el.querySelectorAll('[data-fade]')

      if (!ready) {
        gsap.set(masked, { yPercent: 115 })
        gsap.set(fades, { autoAlpha: 0, y: 16 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: EASE } })
      tl.to(masked, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.1)
        .to(fades, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.5)

      // slow parallax exit while scrolling away
      gsap.to(el.querySelector('[data-parallax]'), {
        yPercent: 8,
        autoAlpha: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })

      // scroll hint nudge
      gsap.to(el.querySelector('[data-scroll-hint]'), {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: 'sine.inOut',
      })
    },
    { scope: ref, dependencies: [ready] },
  )

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-16">
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      <div data-parallax className="relative z-10 flex flex-1 flex-col justify-center px-5 md:px-10">
        <div data-fade className="label rule flex justify-between border-b pb-3">
          <span>/// PORTFOLIO</span>
          <span className="hidden sm:inline">{site.established}</span>
          <span className="hidden md:inline">{site.coords}</span>
        </div>

        <h1 className="display mt-8 text-[clamp(1.5rem,3.2vw,2.6rem)] text-ink md:mt-10">
          <div data-mask className="overflow-hidden">
            <div>
              {profile.name}
              <span className="text-accent">.</span>
            </div>
          </div>
        </h1>

        <div role="heading" aria-level={2} className="display mt-4 text-[clamp(2.8rem,9vw,8.5rem)] text-ink">
          <div data-mask className="overflow-hidden">
            <div>Backend</div>
          </div>
          <div data-mask className="overflow-hidden">
            <div>
              <span className="serif-i text-dim text-[0.82em]">&amp; platform</span>
            </div>
          </div>
          <div data-mask className="overflow-hidden">
            <div className="outline-text">Engineer</div>
          </div>
        </div>

        <div className="mt-8 max-w-xl md:mt-10">
          <p data-fade className="font-mono text-sm text-dim md:text-[15px]">
            <span className="text-accent">$</span> I build{' '}
            <span className="text-ink">{typed}</span>
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
          </p>
          <p data-fade className="mt-5 font-mono text-[13px] leading-6 text-dim">
            8+ years shipping production systems end-to-end — APIs, data pipelines, cloud
            infrastructure, and the observability that keeps them honest.
          </p>
          <p data-fade className="label mt-4">
            {profile.location} · French / EU work-authorized · {profile.subRole}
          </p>
        </div>

        <div data-fade className="mt-8 flex flex-wrap items-center gap-4 md:mt-10">
          <MagneticButton href="#projects" variant="solid">
            View work <ArrowDown size={14} strokeWidth={2.5} />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in touch <ArrowUpRight size={14} strokeWidth={2.5} />
          </MagneticButton>
        </div>
      </div>

      <div data-fade className="label rule relative z-10 flex h-14 items-center justify-between border-t px-5 md:px-10">
        <span data-scroll-hint className="flex items-center gap-2">
          <ArrowDown size={12} /> SCROLL
        </span>
        <span className="hidden sm:inline">PY · SQL · TS · IaC · K8S</span>
        <span>{site.timezone}</span>
      </div>
    </section>
  )
}
