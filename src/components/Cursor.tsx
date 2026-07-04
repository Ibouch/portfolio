import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'

/**
 * Custom cursor: solid accent square (precise) + trailing outline square that
 * grows and rotates 45° over interactive targets. Fine pointers only —
 * touch devices and reduced-motion users keep the native cursor.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (prefersReducedMotion()) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('custom-cursor')
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    let shown = false
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true
        gsap.set([dot, ring], { autoAlpha: 1 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)

      const interactive = (e.target as HTMLElement).closest('a, button, [data-cursor], input, textarea')
      gsap.to(ring, {
        scale: interactive ? 1.8 : 1,
        rotate: interactive ? 45 : 0,
        borderColor: interactive ? 'var(--color-accent)' : 'var(--color-faint)',
        duration: 0.35,
        ease: 'power3.out',
      })
    }
    const onDown = () => gsap.to(dot, { scale: 0.5, duration: 0.15 })
    const onUp = () => gsap.to(dot, { scale: 1, duration: 0.25, ease: 'back.out(3)' })
    const onLeave = () => {
      shown = false
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="bg-accent pointer-events-none fixed top-0 left-0 z-101 size-[6px] rounded-full opacity-0"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="border-faint pointer-events-none fixed top-0 left-0 z-101 size-7 rounded-full border opacity-0 mix-blend-difference"
        aria-hidden
      />
    </>
  )
}
