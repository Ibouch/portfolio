import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { revealChildren } from '../lib/anim'
import { profile, projects } from '../data/profile'
import SectionHeading from './SectionHeading'
import ArchDiagram from './ArchDiagram'

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  useGSAP(
    () => {
      if (!ref.current) return
      revealChildren(ref.current, ref.current.querySelectorAll('[data-reveal]'), { y: 40 })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="projects" className="px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        index="05"
        label="PROJECTS"
        title={
          <>
            Selected <span className="serif-i text-accent">projects.</span>
          </>
        }
      />

      {featured && (
        <div data-reveal className="glass ticks relative overflow-hidden">
          <div className="tick-b" />
          <div className="grid lg:grid-cols-2">
            <div className="rule p-6 md:p-10 lg:border-r">
              <div className="label flex items-center justify-between">
                <span className="text-accent">● FEATURED / IN PRODUCTION</span>
                <span className="text-faint">SOLO BUILD</span>
              </div>
              <h3 className="display mt-6 text-4xl text-ink md:text-5xl">{featured.name}</h3>
              <div className="serif-i mt-2 text-lg text-dim">{featured.kind}</div>
              <p className="mt-6 max-w-[58ch] text-sm leading-relaxed text-dim">
                {featured.description}
              </p>
              <ul className="mt-6 space-y-2">
                {featured.highlights.map((h) => (
                  <li key={h.slice(0, 24)} className="flex gap-3 font-mono text-[11.5px] leading-5 text-dim">
                    <span className="text-accent shrink-0">+</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line-strong px-3 py-1 font-mono text-[10px] tracking-wider text-dim uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rule flex items-center bg-raised/30 p-6 lg:border-l md:p-10">
              <ArchDiagram />
            </div>
          </div>
        </div>
      )}

      <div className="rule mt-20 border-b">
        <div className="label mb-4 text-faint">// MORE PROJECTS</div>
        {rest.map((p, i) => (
          <div
            data-reveal
            key={p.name}
            className="row-invert rule grid items-baseline gap-x-8 gap-y-2 border-t px-4 py-7 md:grid-cols-12"
          >
            <span className="label row-dim md:col-span-1">0{i + 2}</span>
            <h3 className="text-xl font-bold tracking-tight md:col-span-3">{p.name}</h3>
            <span className="row-dim serif-i text-sm text-dim md:col-span-2">{p.kind}</span>
            <p className="row-dim text-sm leading-relaxed text-dim md:col-span-4">{p.description}</p>
            <div className="flex flex-wrap justify-start gap-2 md:col-span-2 md:justify-end">
              {p.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="row-chip rounded-full border border-line-strong px-3 py-1 font-mono text-[10px] tracking-wider text-dim uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <a
        data-reveal
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        className="label link-draw mt-8 inline-flex items-center gap-2 hover:text-accent"
      >
        FULL HISTORY ON LINKEDIN
        <ArrowUpRight size={12} />
      </a> */}
    </section>
  )
}
