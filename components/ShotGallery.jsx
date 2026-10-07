'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

function useTypewriter(text, resetKey) {
  const [out, setOut] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      return undefined
    }
    setOut('')
    let i = 0
    const id = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 14)
    return () => clearInterval(id)
  }, [text, resetKey])

  return out
}

export default function ShotGallery({ shots = [] }) {
  const [active, setActive] = useState(0)
  const trackRef = useRef(null)
  const frameRef = useRef(0)
  const dragRef = useRef(null)

  const slideTo = useCallback(
    (index) => {
      const track = trackRef.current
      if (!track) return
      const next = Math.max(0, Math.min(shots.length - 1, index))
      const slide = track.children[next]
      if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' })
      setActive(next)
    },
    [shots.length],
  )

  const onScroll = useCallback(() => {
    if (frameRef.current) return
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0
      const track = trackRef.current
      if (!track) return
      const slides = [...track.children]
      let best = 0
      let bestDist = Infinity
      slides.forEach((slide, index) => {
        const dist = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft)
        if (dist < bestDist) {
          bestDist = dist
          best = index
        }
      })
      setActive(best)
    })
  }, [])

  const onPointerDown = (event) => {
    if (event.pointerType === 'touch') return
    const track = trackRef.current
    if (!track) return
    dragRef.current = { x: event.clientX, left: track.scrollLeft, moved: false }
    track.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event) => {
    const drag = dragRef.current
    const track = trackRef.current
    if (!drag || !track) return
    const dx = event.clientX - drag.x
    if (Math.abs(dx) > 4) drag.moved = true
    track.scrollLeft = drag.left - dx
  }

  const onPointerUp = () => {
    const drag = dragRef.current
    dragRef.current = null
    if (!drag?.moved) return
    slideTo(active)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      slideTo(active + 1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      slideTo(active - 1)
    }
  }

  const shot = shots[active] || null
  const typed = useTypewriter(shot?.desc || '', active)

  return (
    <div className="shots">
      <div className="shots-head">
        <span className="mono shots-count">
          {String(active + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
        </span>
        <div className="shots-arrows">
          <button
            type="button"
            className="shots-arrow"
            onClick={() => slideTo(active - 1)}
            disabled={active === 0}
            aria-label="Ảnh trước"
          >
            ‹
          </button>
          <button
            type="button"
            className="shots-arrow"
            onClick={() => slideTo(active + 1)}
            disabled={active >= shots.length - 1}
            aria-label="Ảnh sau"
          >
            ›
          </button>
        </div>
      </div>

      <div className="shots-body">
        <div
          className="shots-track"
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="group"
          aria-label="Ảnh chụp giao diện"
        >
          {shots.map((item, index) => (
            <figure className={`slide${index === active ? ' is-active' : ''}`} key={item.src}>
              <img
                className="slide-img"
                src={item.src}
                alt={item.alt}
                width="1145"
                height="720"
                loading={index <= 1 ? 'eager' : 'lazy'}
                draggable="false"
              />
              <figcaption className="mono slide-index">
                {String(index + 1).padStart(2, '0')} · {item.title}
              </figcaption>
            </figure>
          ))}
        </div>

        <aside className="shots-panel" aria-live="off">
          <p className="eyebrow" style={{ margin: '0 0 12px' }}>{shot?.eyebrow}</p>
          <h3 className="shots-title">{shot?.title}</h3>
          <p className="shots-desc">
            {typed}
            <span className="caret" aria-hidden="true" />
          </p>
          <div className="shots-tags">
            {(shot?.tags || []).map((tag) => (
              <span className="chip" key={tag}>{tag}</span>
            ))}
          </div>
        </aside>
      </div>

      <div className="shots-dots">
        {shots.map((item, index) => (
          <button
            type="button"
            key={item.src}
            className={`shot-dot${index === active ? ' is-on' : ''}`}
            onClick={() => slideTo(index)}
            aria-label={item.title}
            aria-current={index === active}
          />
        ))}
      </div>
    </div>
  )
}
