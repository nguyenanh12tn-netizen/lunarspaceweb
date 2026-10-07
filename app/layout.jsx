import { Be_Vietnam_Pro, IBM_Plex_Mono, VT323 } from 'next/font/google'
import './globals.css'

const body = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
})

const pixel = VT323({
  subsets: ['latin', 'vietnamese'],
  weight: '400',
  display: 'swap',
  variable: '--font-pixel',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata = {
  title: 'LunarSpace Launcher — trình khởi chạy Minecraft cho người Việt',
  description:
    'Cài modpack từ Modrinth và CurseForge, đăng nhập Microsoft hoặc ely.by, mở world cho bạn bè qua internet. Miễn phí, mã nguồn mở.',
  metadataBase: new URL('https://lunarspace.vercel.app'),
  openGraph: {
    title: 'LunarSpace Launcher',
    description: 'Trình khởi chạy Minecraft: modpack, tài khoản, mở world cho bạn bè.',
    type: 'website',
  },
}

const BOOT = `(function(){try{
var t=localStorage.getItem('ls-theme');var s=localStorage.getItem('ls-skin');
var m=window.matchMedia('(prefers-color-scheme: light)').matches;
document.documentElement.setAttribute('data-theme', t==='light'||t==='dark'?t:(m?'light':'dark'));
document.documentElement.setAttribute('data-skin', s==='pixel'?'pixel':'default');
}catch(e){}})()`

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${body.variable} ${pixel.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" />
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <div className="ambient" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
