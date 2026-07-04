import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText, EASE, prefersReducedMotion } from '../lib/anim'

type Props = {
  index: string
  label: string
  title: ReactNode
}

/**
 * The recurring section header: hairline rule, mono index + label,
 * then a large display title whose lines slide up from behind a mask.
 */
export default function SectionHeading({ index, label, title }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = ref.current
      if (!el) return
      const h2 = el.querySelector('h2')
      if (!h2) return

      const split = SplitText.create(h2, { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, {
        yPercent: 115,
        duration: 1.1,
        ease: EASE,
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })
      gsap.from(el.querySelector('[data-rule]'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <header ref={ref} className="mb-14 md:mb-20">
      <div data-rule className="rule border-t" />
      <div className="label flex items-baseline justify-between pt-3">
        <span>
          [ {index} ]
        </span>
        <span>{label}</span>
      </div>
      <h2 className="display mt-8 text-[clamp(2.6rem,7vw,5.5rem)] text-ink">{title}</h2>
    </header>
  )
}
