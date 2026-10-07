'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const root = document.documentElement
        const max = root.scrollHeight - root.clientHeight
        const ratio = max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0
        if (barRef.current) barRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress-bar" ref={barRef} />
    </div>
  )
}
