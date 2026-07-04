import type { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  className?: string
}

/** iTerm-style window chrome: traffic lights, centered title, glass body. */
export default function TerminalWindow({ title, children, className = '' }: Props) {
  return (
    <div className={`glass overflow-hidden ${className}`}>
      <div className="rule relative flex items-center border-b bg-raised/60 px-4 py-3">
        <span className="flex gap-2" aria-hidden>
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="label pointer-events-none absolute left-1/2 -translate-x-1/2">
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}
