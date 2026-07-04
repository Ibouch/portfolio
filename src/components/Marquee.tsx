import { marqueeItems } from '../data/profile'

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden" aria-hidden={reverse}>
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {marqueeItems.map((item) => (
              <span
                key={item}
                className="flex items-center font-mono text-sm tracking-[0.12em] whitespace-nowrap text-dim uppercase"
              >
                <span className="px-6">{item}</span>
                <span className="text-accent text-[8px]">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="rule border-y py-5">
      <Row />
    </div>
  )
}
