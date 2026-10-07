'use client'

import { useEffect, useState } from 'react'

const KEY_THEME = 'ls-theme'

export default function ModeSwitch() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark')
  }, [])

  const pick = (next) => {
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(KEY_THEME, next)
    } catch {}
  }

  return (
    <div className="chip" style={{ gap: 0, padding: 0, height: 36, overflow: 'hidden' }} role="group" aria-label="Giao diện sáng tối">
      {[
        { value: 'dark', label: 'Tối' },
        { value: 'light', label: 'Sáng' },
      ].map((option) => {
        const on = option.value === theme
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => pick(option.value)}
            aria-pressed={on}
            style={{
              height: '100%',
              padding: '0 14px',
              border: 'none',
              background: on ? 'var(--accent)' : 'transparent',
              color: on ? 'var(--accent-ink)' : 'var(--label)',
              font: 'inherit',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 180ms',
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
