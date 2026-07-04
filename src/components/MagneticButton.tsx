import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

type Props = ComponentPropsWithoutRef<'a'> & {
  variant?: 'solid' | 'ghost'
  children: ReactNode
}

/**
 * Magnetic CTA. Square corners, mono uppercase — no pill buttons here.
 * The inner span drifts slightly more than the shell for depth.
 */
export default function MagneticButton({ variant = 'solid', children, className = '', ...rest }: Props) {
  const shell = useMagnetic<HTMLAnchorElement>(0.3)
  const inner = useMagnetic<HTMLSpanElement>(0.12)

  const skin =
    variant === 'solid'
      ? 'bg-accent text-bg shadow-[0_0_24px_rgb(61_220_255/0.35)] hover:bg-ink hover:shadow-none'
      : 'border border-line-strong text-ink backdrop-blur-sm hover:border-accent hover:text-accent'

  return (
    <a
      ref={shell}
      data-cursor
      className={`inline-flex items-center gap-3 rounded-full px-7 py-4 font-mono text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 select-none ${skin} ${className}`}
      {...rest}
    >
      <span ref={inner} className="inline-flex items-center gap-3">
        {children}
      </span>
    </a>
  )
}
