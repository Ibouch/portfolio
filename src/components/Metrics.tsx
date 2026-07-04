import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Boxes, CalendarClock, Trophy, Users } from 'lucide-react'
import { gsap, prefersReducedMotion, revealChildren } from '../lib/anim'

const metrics = [
  { icon: CalendarClock, prefix: '', n: 8, suffix: '+', label: 'years of engineering' },
  { icon: Boxes, prefix: '', n: 17, suffix: '', label: 'services shipped solo in one platform' },
  { icon: Users, prefix: '', n: 1000, suffix: 's', label: 'of users served daily' },
  { icon: Trophy, prefix: 'TOP ', n: 1, suffix: '%', label: 'of applicants at École 42' },
]

/**
 * Proof strip: glass counter tiles that count up once on entry.
 * Final values live in markup, so reduced-motion (and no-JS) users
 * simply see the numbers.
 */
export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      revealChildren(el, el.querySelectorAll('[data-tile]'), { y: 30 })
      if (prefersReducedMotion()) return
      el.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
        const target = Number(node.dataset.count)
        const state = { v: 0 }
        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 85%', once: true },
          onUpdate: () => {
            node.textContent = String(Math.round(state.v))
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} data-tile className="glass glass-hover p-7 md:p-8">
          <span className="icon-chip">
            <m.icon size={20} strokeWidth={2} />
          </span>
          <div className="display tabular mt-5 text-[clamp(2.4rem,4vw,3.6rem)] text-ink">
            {m.prefix && <span className="align-middle text-[0.5em]">{m.prefix}</span>}
            <span data-count={m.n}>{m.n}</span>
            <span className="text-accent">{m.suffix}</span>
          </div>
          <div className="label mt-2">{m.label}</div>
        </div>
      ))}
    </div>
  )
}
