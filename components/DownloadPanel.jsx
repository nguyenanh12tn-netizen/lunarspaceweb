'use client'

import { useState } from 'react'
import { formatBytes, formatDay } from '@/lib/format'

const OS_LABEL = { win: 'Windows 10/11', linux: 'Linux x86_64' }
const OS_HINT = {
  win: 'Bản cài đặt (.exe) — có trình cài riêng, tạo shortcut và mục gỡ cài trong Windows.',
  linux: 'Bản chạy trực tiếp (.AppImage) — cấp quyền thực thi rồi mở.',
}

export default function DownloadPanel({ release, fallbackUrl }) {
  const [os, setOs] = useState('win')
  const target = os === 'win' ? release?.win : release?.linux
  const url = target?.url || fallbackUrl
  const fileName = target?.name || (os === 'win' ? 'LunarSpace-Launcher-Setup.exe' : 'LunarSpace-Launcher.AppImage')

  return (
    <div className="card" style={{ padding: 'clamp(20px, 3vw, 30px)', display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <div className="chip" style={{ gap: 0, padding: 0, height: 38, overflow: 'hidden' }} role="group" aria-label="Hệ điều hành">
          {Object.keys(OS_LABEL).map((key) => {
            const on = key === os
            return (
              <button
                key={key}
                type="button"
                onClick={() => setOs(key)}
                aria-pressed={on}
                style={{
                  height: '100%',
                  padding: '0 15px',
                  border: 'none',
                  background: on ? 'var(--accent)' : 'transparent',
                  color: on ? 'var(--accent-ink)' : 'var(--label)',
                  font: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 180ms',
                }}
              >
                {OS_LABEL[key]}
              </button>
            )
          })}
        </div>
        {release?.version && (
          <span className="mono" style={{ fontSize: 13, color: 'var(--faint)' }}>
            phiên bản {release.version}
            {release.published ? ` · ${formatDay(release.published)}` : ''}
            {target?.size ? ` · ${formatBytes(target.size)}` : ''}
          </span>
        )}
      </div>

      <p style={{ margin: 0, color: 'var(--label)', fontSize: 15 }}>{OS_HINT[os]}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <a className="btn btn-accent" href={url} download>
          Tải {os === 'win' ? 'cho Windows' : 'bản Linux'}
          <span aria-hidden="true">↓</span>
        </a>
        <a className="btn" href={fallbackUrl} target="_blank" rel="noreferrer">
          Tất cả bản phát hành
        </a>
      </div>

      <p className="mono" style={{ margin: 0, fontSize: 12, color: 'var(--faint)', wordBreak: 'break-all' }}>
        {fileName}
      </p>
    </div>
  )
}
