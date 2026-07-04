import { ArrowUp } from 'lucide-react'
import { site } from '../data/profile'
import { useClock } from '../hooks/useClock'

/** Terminal status-bar footer. */
export default function Footer() {
  const time = useClock()
  const year = new Date().getFullYear()

  return (
    <footer className="rule label flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t px-5 py-5 md:px-10">
      <span>© {year} ILYES BOUCHLAGHEM</span>
      <span className="hidden md:inline">{site.coords}</span>
      <span className="tabular hidden sm:inline">GST {time}</span>
      <span className="hidden lg:inline">UPTIME 8Y+</span>
      <span className="hidden xl:inline">BUILT BY HAND — REACT · GSAP · R3F · TAILWIND</span>
      <a href="#top" data-cursor className="hover:text-accent flex items-center gap-1.5 transition-colors">
        [ TOP <ArrowUp size={11} /> ]
      </a>
    </footer>
  )
}
