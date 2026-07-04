import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { gsap, SCRAMBLE_CHARS, prefersReducedMotion } from '../lib/anim'
import { navLinks } from '../data/profile'
import { useClock } from '../hooks/useClock'

function ScrambleLink({
  href,
  label,
  index,
  active,
}: {
  href: string
  label: string
  index: string
  active: boolean
}) {
  const textRef = useRef<HTMLSpanElement>(null)

  const scramble = () => {
    if (prefersReducedMotion() || !textRef.current) return
    gsap.to(textRef.current, {
      duration: 0.5,
      scrambleText: { text: label.toUpperCase(), chars: SCRAMBLE_CHARS, speed: 1.2 },
    })
  }

  return (
    <a
      href={href}
      onMouseEnter={scramble}
      className={`relative font-mono text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
        active ? 'text-accent' : 'text-dim hover:text-ink'
      }`}
    >
      <span className="text-faint mr-1.5">{index}</span>
      <span ref={textRef}>{label.toUpperCase()}</span>
      <span
        className={`absolute -bottom-[21px] left-0 h-px w-full bg-accent shadow-[0_0_8px_rgb(61_220_255/0.8)] transition-opacity duration-300 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </a>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const time = useClock()

  // track which section is in view for the active link state
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiveId(e.target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // lock native scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-line-strong bg-bg/85 shadow-[0_8px_32px_rgb(0_0_0/0.35)] backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-5 md:px-10">
          <a href="#top" className="font-mono text-sm font-semibold tracking-wide text-ink">
            <span className="text-accent">ib</span>
            <span className="text-dim">@prod</span>:~$
            <span className="ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 animate-pulse bg-accent" />
          </a>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((l) => (
              <ScrambleLink
                key={l.id}
                href={`#${l.id}`}
                label={l.label}
                index={l.index}
                active={activeId === l.id}
              />
            ))}
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <span className="label flex items-center gap-2 text-ink">
              <span className="status-dot" />
              OPEN TO WORK
            </span>
            <span className="label tabular hidden xl:inline">ABU DHABI {time}</span>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="label text-ink md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? '[ CLOSE ]' : '[ MENU ]'}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-bg/92 fixed inset-0 z-40 flex flex-col justify-end p-6 pb-16 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rule display border-t py-3 text-4xl text-ink"
                >
                  <span className="label text-faint mr-4 align-super">{l.index}</span>
                  {l.label}
                </motion.a>
              ))}
            </div>
            <div className="label mt-10 flex justify-between">
              <span className="flex items-center gap-2">
                <span className="status-dot" /> OPEN TO WORK
              </span>
              <span className="tabular">{time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
