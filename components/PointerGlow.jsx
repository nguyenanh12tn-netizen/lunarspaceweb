'use client'

import { useEffect } from 'react'

export default function PointerGlow() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let frame = 0
    const onMove = (event) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const x = (event.clientX / window.innerWidth) * 100
        const y = ((event.clientY + window.scrollY) / document.body.scrollHeight) * 100
        document.documentElement.style.setProperty('--mx', `${x}%`)
        document.documentElement.style.setProperty('--my', `${y}%`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
