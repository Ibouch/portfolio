import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { BadgeCheck, GraduationCap, Languages, Mail, MapPin, Globe2 } from 'lucide-react'
import { revealChildren } from '../lib/anim'
import { about } from '../data/profile'
import SectionHeading from './SectionHeading'
import TerminalWindow from './TerminalWindow'

const factIcons = [MapPin, Globe2, Languages, GraduationCap, BadgeCheck, Mail]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      revealChildren(ref.current, ref.current.querySelectorAll('[data-reveal]'))
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="about" className="px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        index="01"
        label="ABOUT"
        title={
          <>
            About <span className="serif-i text-accent">me.</span>
          </>
        }
      />

      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {about.paragraphs.map((p) => (
            <p
              data-reveal
              key={p.slice(0, 24)}
              className="mb-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-dim"
            >
              {p}
            </p>
          ))}
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div data-reveal>
            <TerminalWindow title="ilyes@abu-dhabi — zsh">
              <div className="p-5 md:p-6">
                <p className="font-mono text-[12px] text-dim">
                  <span className="text-accent">$</span> whoami
                </p>
                <p className="mt-1.5 font-mono text-[12px] text-ink">
                  self-taught · production-first · AI-native workflow
                </p>
                <div className="mt-5">
                  {about.facts.map((f, i) => {
                    const Icon = factIcons[i] ?? BadgeCheck
                    return (
                      <div
                        key={f.label}
                        className="rule flex items-center justify-between gap-6 border-b py-3 last:border-b-0"
                      >
                        <span className="label flex shrink-0 items-center gap-2.5">
                          <Icon size={14} className="text-accent" />
                          {f.label}
                        </span>
                        <span className="text-right font-mono text-[12px] leading-5 text-ink">
                          {f.value}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <p className="mt-4 font-mono text-[12px] text-faint">
                  ${' '}
                  <span className="inline-block h-3 w-[7px] translate-y-0.5 animate-pulse bg-accent" />
                </p>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  )
}
