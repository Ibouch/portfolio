import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin)

export { gsap, ScrollTrigger, SplitText }

export const EASE = 'expo.out'
export const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$%&'

/** Live check — respects OS-level changes without a reload. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Standard scroll-reveal: children fade/translate in with a short stagger.
 * No-ops under reduced motion (elements simply stay visible).
 */
export function revealChildren(
  scope: HTMLElement,
  targets: gsap.DOMTarget,
  vars: gsap.TweenVars = {},
) {
  if (prefersReducedMotion()) return
  gsap.from(targets, {
    y: 28,
    autoAlpha: 0,
    duration: 1,
    ease: EASE,
    stagger: 0.08,
    scrollTrigger: { trigger: scope, start: 'top 78%', once: true },
    ...vars,
  })
}
