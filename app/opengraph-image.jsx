import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'LunarSpace Launcher'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '76px',
          background: 'linear-gradient(140deg, #0a0a0a 0%, #141020 58%, #0a0a0a 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)' }} />
          <div style={{ fontSize: 30, letterSpacing: -0.5 }}>LunarSpace Launcher</div>
        </div>
        <div style={{ marginTop: 46, fontSize: 74, lineHeight: 1.12, letterSpacing: -2, maxWidth: 900 }}>
          Cài modpack, đăng nhập, mở world cho bạn bè.
        </div>
        <div style={{ marginTop: 30, fontSize: 32, color: '#a1a1aa', maxWidth: 820 }}>
          Trình khởi chạy Minecraft Java cho người Việt — Modrinth và CurseForge, Microsoft và ely.by, chia sẻ world qua internet.
        </div>
        <div style={{ marginTop: 54, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ padding: '14px 26px', borderRadius: 12, background: '#a78bfa', color: '#0a0510', fontSize: 28 }}>
            Tải cho Windows
          </div>
          <div style={{ fontSize: 26, color: '#71717a' }}>Miễn phí · Mã nguồn mở</div>
        </div>
      </div>
    ),
    size,
  )
}
