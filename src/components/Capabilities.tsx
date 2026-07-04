import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Cloud, Database, Server, ShieldCheck } from 'lucide-react'
import { revealChildren } from '../lib/anim'
import { services } from '../data/profile'
import SectionHeading from './SectionHeading'

const icons = {
  server: Server,
  cloud: Cloud,
  database: Database,
  shield: ShieldCheck,
}

/** "What I Do" — four glass capability cards with icon chips. */
export default function Capabilities() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      revealChildren(ref.current, ref.current.querySelectorAll('[data-card]'), { y: 40 })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="what-i-do" className="px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        index="02"
        label="WHAT I DO"
        title={
          <>
            What I <span className="serif-i text-accent">do.</span>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons] ?? Server
          return (
            <div key={s.title} data-card className="glass glass-hover group p-7 md:p-9">
              <div className="flex items-start justify-between">
                <span className="icon-chip">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span className="label text-faint">/ 0{i + 1}</span>
              </div>
              <h3 className="mt-6 flex items-center gap-2 text-xl font-bold tracking-tight text-ink md:text-2xl">
                {s.title}
                <ArrowUpRight
                  size={18}
                  className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{s.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line-strong px-3 py-1 font-mono text-[10px] tracking-wider text-dim uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
