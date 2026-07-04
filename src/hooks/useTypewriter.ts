import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/anim'

/** v1's hero typewriter: types a word, holds, erases, moves to the next. */
export function useTypewriter(words: string[], typeMs = 55, eraseMs = 26, holdMs = 2100) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (prefersReducedMotion()) {
      setText(words[0])
      return
    }
    let wordIndex = 0
    let charIndex = 0
    let deleting = false
    let timer: number

    const tick = () => {
      const word = words[wordIndex]
      if (!deleting) {
        charIndex++
        setText(word.slice(0, charIndex))
        if (charIndex === word.length) {
          deleting = true
          timer = window.setTimeout(tick, holdMs)
          return
        }
        timer = window.setTimeout(tick, typeMs)
      } else {
        charIndex--
        setText(word.slice(0, charIndex))
        if (charIndex === 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
          timer = window.setTimeout(tick, 350)
          return
        }
        timer = window.setTimeout(tick, eraseMs)
      }
    }

    timer = window.setTimeout(tick, 500)
    return () => window.clearTimeout(timer)
  }, [words, typeMs, eraseMs, holdMs])

  return text
}
