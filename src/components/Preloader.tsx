import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { bootLines } from '../data/profile'

type Props = { onDone: () => void }

/**
 * Boot-sequence preloader: mono log lines, a large percent counter and a
 * hairline progress bar, then the whole screen wipes upward.
 * Runs once per session; skipped entirely under reduced motion.
 */
export default function Preloader({ onDone }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)
  const skip = useRef(
    typeof window !== 'undefined' &&
      (sessionStorage.getItem('ib-booted') === '1' || prefersReducedMotion()),
  )

  useGSAP(
    () => {
      if (skip.current) {
        onDone()
        setGone(true)
        return
      }
      const root = ref.current
      if (!root) return

      const lines = root.querySelectorAll('[data-line]')
      const counter = root.querySelector('[data-counter]') as HTMLElement
      const bar = root.querySelector('[data-bar]') as HTMLElement
      const progress = { v: 0 }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          sessionStorage.setItem('ib-booted', '1')
          setGone(true)
        },
      })

      tl.from(lines, { autoAlpha: 0, y: 8, duration: 0.3, stagger: 0.14 }, 0)
        .to(
          progress,
          {
            v: 100,
            duration: 1.3,
            ease: 'power3.inOut',
            onUpdate: () => {
              counter.textContent = String(Math.round(progress.v)).padStart(3, '0')
              bar.style.transform = `scaleX(${progress.v / 100})`
            },
          },
          0,
        )
        .add(() => onDone(), 1.45)
        .to(root, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.9,
          ease: 'expo.inOut',
        })
    },
    { scope: ref },
  )

  if (gone) return null

  return (
    <div
      ref={ref}
      className="bg-bg fixed inset-0 z-100 flex flex-col justify-between p-6 md:p-10"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden
    >
      <div className="label flex justify-between">
        <span>ILYES BOUCHLAGHEM</span>
        <span>SYS.BOOT</span>
      </div>

      <div className="flex items-end justify-between gap-8">
        <div className="font-mono text-[11px] leading-6 text-dim">
          {bootLines.map((line) => (
            <div key={line} data-line>
              <span className="text-accent">[ ok ]</span> {line}
            </div>
          ))}
        </div>
        <div
          data-counter
          className="display tabular text-accent text-[clamp(4rem,14vw,10rem)] leading-none"
        >
          000
        </div>
      </div>

      <div className="h-px w-full bg-line">
        <div data-bar className="h-px w-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  )
}
