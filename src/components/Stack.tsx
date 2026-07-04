import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import {
  Activity,
  Bot,
  Code2,
  CloudCog,
  Container,
  Database,
  MonitorSmartphone,
  ServerCog,
} from 'lucide-react'
import { gsap, revealChildren, prefersReducedMotion } from '../lib/anim'
import { skillGroups, currentlyDeveloping } from '../data/profile'
import SectionHeading from './SectionHeading'
import TerminalWindow from './TerminalWindow'

const groupIcons = [Code2, ServerCog, Database, Container, CloudCog, Activity, MonitorSmartphone, Bot]

export default function Skills() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      revealChildren(el, el.querySelectorAll('[data-reveal]'))

      // terminal lines type in with a scramble settle
      if (prefersReducedMotion()) return
      el.querySelectorAll<HTMLElement>('[data-type]').forEach((node, i) => {
        const text = node.textContent ?? ''
        gsap.to(node, {
          duration: 0.9,
          delay: i * 0.25,
          scrambleText: { text, chars: '01▓▒░', speed: 0.4 },
          scrollTrigger: { trigger: node.closest('[data-terminal]'), start: 'top 80%', once: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="skills" className="px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        index="03"
        label="SKILLS"
        title={
          <>
            Skills <span className="serif-i text-accent">&amp; tools.</span>
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-12">
        <div data-reveal className="glass p-6 md:p-8 lg:col-span-7">
          {skillGroups.map((g, i) => {
            const Icon = groupIcons[i] ?? Code2
            return (
              <div
                key={g.name}
                className="rule grid gap-2 border-b py-5 first:pt-1 last:border-b-0 last:pb-1 md:grid-cols-12 md:items-baseline"
              >
                <span className="label flex items-center gap-2.5 md:col-span-4">
                  <Icon size={14} className="shrink-0 text-accent" />
                  {g.name}
                </span>
                <span className="font-mono text-[12.5px] leading-6 text-ink md:col-span-8">
                  {g.skills.join('  ·  ')}
                </span>
              </div>
            )
          })}
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div data-reveal data-terminal>
            <TerminalWindow title="~/now — zsh">
              <div className="space-y-4 p-5 font-mono text-[11.5px] leading-5">
                {currentlyDeveloping.map((row) => (
                  <div key={row.cmd}>
                    <div className="text-accent">
                      $ <span data-type>{row.cmd}</span>
                    </div>
                    <div className="mt-1 text-dim">{row.out}</div>
                  </div>
                ))}
                <div className="text-faint">
                  ${' '}
                  <span className="inline-block h-3 w-[7px] translate-y-0.5 animate-pulse bg-accent" />
                </div>
              </div>
            </TerminalWindow>
          </div>
          <p data-reveal className="label mt-4 text-faint">
            // CURRENTLY LEARNING — CKA &amp; LLM SERVING
          </p>
        </div>
      </div>
    </section>
  )
}
