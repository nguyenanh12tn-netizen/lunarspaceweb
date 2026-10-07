'use client'

import { useEffect, useState } from 'react'

const KEY_THEME = 'ls-theme'
const KEY_SKIN = 'ls-skin'

export default function ModeSwitch() {
  const [theme, setTheme] = useState('dark')
  const [skin, setSkin] = useState('default')

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark')
    setSkin(document.documentElement.getAttribute('data-skin') === 'pixel' ? 'pixel' : 'default')
  }, [])

  const apply = (nextTheme, nextSkin) => {
    document.documentElement.setAttribute('data-theme', nextTheme)
    document.documentElement.setAttribute('data-skin', nextSkin)
    try {
      localStorage.setItem(KEY_THEME, nextTheme)
      localStorage.setItem(KEY_SKIN, nextSkin)
    } catch {}
  }

  const group = (label, value, options, onPick) => (
    <div className="chip" style={{ gap: 0, padding: 0, height: 34, overflow: 'hidden' }} role="group" aria-label={label}>
      {options.map((option) => {
        const on = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onPick(option.value)}
            aria-pressed={on}
            style={{
              height: '100%',
              padding: '0 11px',
              border: 'none',
              background: on ? 'var(--accent)' : 'transparent',
              color: on ? 'var(--accent-ink)' : 'var(--label)',
              font: 'inherit',
              fontSize: 12,
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

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {group('Giao diện sáng tối', theme, [
        { value: 'dark', label: 'Tối' },
        { value: 'light', label: 'Sáng' },
      ], (next) => { setTheme(next); apply(next, skin) })}
      {group('Kiểu giao diện', skin, [
        { value: 'default', label: 'Mặc định' },
        { value: 'pixel', label: 'Pixel' },
      ], (next) => { setSkin(next); apply(theme, next) })}
    </div>
  )
}
