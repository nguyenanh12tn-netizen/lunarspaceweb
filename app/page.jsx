import ModeSwitch from '@/components/ModeSwitch'
import PointerGlow from '@/components/PointerGlow'
import Reveal from '@/components/Reveal'
import Wordmark from '@/components/Wordmark'
import DownloadPanel from '@/components/DownloadPanel'
import { formatBytes, formatDay } from '@/lib/format'

const REPO = 'https://github.com/foxstudio-201/LunarSpaceLauncher'
const RELEASES = `${REPO}/releases`
const LATEST = `${RELEASES}/latest`

const LOADERS = [
  { id: 'vanilla', name: 'Vanilla' },
  { id: 'fabric', name: 'Fabric' },
  { id: 'forge', name: 'Forge' },
  { id: 'neoforge', name: 'NeoForge' },
  { id: 'quilt', name: 'Quilt' },
  { id: 'modrinth', name: 'Modrinth' },
  { id: 'curseforge', name: 'CurseForge' },
  { id: 'ftb', name: 'FTB' },
  { id: 'technic', name: 'Technic' },
]

const FEATURES = [
  {
    span: 3,
    eyebrow: 'MODPACK',
    title: 'Cài modpack bằng một nút',
    body: 'Tìm trên Modrinth hoặc CurseForge, chọn bản phát hành, rồi để launcher tải mod, tài nguyên và overrides — tự tạo phiên bản chạy được ngay.',
    list: ['Lọc theo phiên bản game, loader, thẻ', 'Đọc cả modlist.html của gói CurseForge', 'Nhập lại được tệp .mrpack và .zip đã xuất'],
  },
  {
    span: 3,
    eyebrow: 'TÀI KHOẢN',
    title: 'Microsoft, ely.by, hoặc chơi offline',
    body: 'Đăng nhập bằng tài khoản Microsoft hoặc ely.by; token tự gia hạn khi hết hạn nên không phải đăng nhập lại. Mỗi tài khoản có đầu skin riêng.',
    list: ['Token lưu bằng Windows safeStorage', 'Đổi tài khoản ngay trên sidebar', 'Chế độ demo cho bản thử nghiệm'],
  },
  {
    span: 2,
    eyebrow: 'HOST',
    title: 'Mở world cho bạn bè',
    body: 'Mở world trong game, launcher đọc cổng LAN từ log rồi đưa ra địa chỉ công khai để bạn bè nhập vào Minecraft.',
    list: ['Không cần mở cổng router', 'Giữ cổng cố định giữa các phiên'],
  },
  {
    span: 2,
    eyebrow: 'NỘI DUNG',
    title: 'Tải mod, shader, resource pack',
    body: 'Duyệt và cài ngay trong phiên bản: lọc theo loader, phiên bản game, thẻ, và biết mod chạy ở máy khách hay máy chủ.',
    list: ['Nhãn Máy khách / Máy chủ / Cả hai', 'Tự tải thư viện bắt buộc kèm theo'],
  },
  {
    span: 2,
    eyebrow: 'GIAO DIỆN',
    title: 'Skin pixel 8-bit',
    body: 'Đổi giữa giao diện phẳng và skin pixel: chữ VT323, viền dày, bóng cứng. Có cả bản sáng và tối.',
    list: ['Sáng / Tối', 'Mặc định / Pixel'],
  },
]

const SHOTS = [
  { src: '/shots/home.png', caption: 'Trang chủ — chọn phiên bản và vào game', alt: 'Trang chủ launcher với danh sách bản phát hành và phiên bản đã tạo' },
  { src: '/shots/modpack.png', caption: 'Modpack — lọc theo phiên bản, loader, thẻ', alt: 'Trang Modpack với bộ lọc phiên bản game, loader, thẻ và môi trường' },
  { src: '/shots/mod_install.png', caption: 'Tải mod — nhãn máy khách / máy chủ', alt: 'Danh sách mod trên Modrinth với nhãn môi trường chạy' },
  { src: '/shots/mod_install2.png', caption: 'Chi tiết dự án — hỗ trợ máy khách, máy chủ', alt: 'Trang chi tiết mod với thông tin tương thích' },
  { src: '/shots/account.png', caption: 'Tài khoản — Microsoft, ely.by, offline', alt: 'Trang tài khoản với danh sách tài khoản đã thêm' },
  { src: '/shots/host.png', caption: 'Host — chia sẻ world qua internet', alt: 'Trang Host với dải trạng thái và địa chỉ chia sẻ' },
]

async function getRelease() {
  try {
    const res = await fetch('https://api.github.com/repos/foxstudio-201/LunarSpaceLauncher/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = await res.json()
    const assets = data.assets || []
    const find = (re) => assets.find((asset) => re.test(asset.name))
    const win = find(/Setup.*\.exe$/i)
    const linux = find(/\.AppImage$/i)
    return {
      version: String(data.tag_name || '').replace(/^v/, ''),
      published: data.published_at || '',
      win: win ? { url: win.browser_download_url, size: win.size, name: win.name } : null,
      linux: linux ? { url: linux.browser_download_url, size: linux.size, name: linux.name } : null,
    }
  } catch {
    return null
  }
}

function SectionHead({ eyebrow, title, lead, delay = 0 }) {
  return (
    <Reveal delay={delay} className="section-head">
      <div style={{ minWidth: 0 }}>
        <p className="eyebrow" style={{ margin: '0 0 10px' }}>{eyebrow}</p>
        <h2 className="h2" style={{ margin: 0 }}>{title}</h2>
      </div>
      {lead ? <p className="lead" style={{ margin: 0 }}>{lead}</p> : null}
    </Reveal>
  )
}

export default async function Page() {
  const release = await getRelease()
  const meta = release
    ? [
        `v${release.version}`,
        release.win ? formatBytes(release.win.size) : '',
        release.published ? `phát hành ${formatDay(release.published)}` : '',
      ].filter(Boolean).join(' · ')
    : 'bản mới nhất trên GitHub'

  return (
    <>
      <PointerGlow />

      <header className="nav">
        <div className="shell nav-inner">
          <a href="#top" className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">LunarSpace</span>
          </a>
          <nav className="nav-links" aria-label="Mục chính">
            <a href="#features">Tính năng</a>
            <a href="#shots">Ảnh chụp</a>
            <a href="#get">Tải về</a>
            <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>
          </nav>
          <ModeSwitch />
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="glow glow-a" aria-hidden="true" />
          <div className="glow glow-b" aria-hidden="true" />
          <div className="shell hero-inner">
            <p className="eyebrow">Trình khởi chạy Minecraft</p>

            <Wordmark />

            <h1 className="h1">
              Cài modpack, đăng nhập, và mở world cho bạn bè — gói gọn trong một launcher.
            </h1>

            <p className="lead hero-lead">
              Dành cho người chơi Minecraft Java ở Việt Nam: kéo gói mod về là chạy, tài khoản Microsoft hoặc ely.by tự gia hạn,
              và mời bạn bè vào world mà không cần mở cổng router.
            </p>

            <div className="hero-cta">
              <a className="btn btn-accent" href={release?.win?.url || LATEST} download={release?.win ? '' : undefined}>
                Tải cho Windows
                <span aria-hidden="true">↓</span>
              </a>
              <a className="btn" href={release?.linux?.url || LATEST} download={release?.linux ? '' : undefined}>
                Bản Linux (.AppImage)
              </a>
              <a className="btn btn-quiet" href={REPO} target="_blank" rel="noreferrer">Xem mã nguồn</a>
            </div>

            <p className="mono hero-meta">{meta}<span className="caret" aria-hidden="true" /></p>

            <div className="hero-sweep">
              <div className="sweep" aria-hidden="true" />
            </div>

            <div className="marquee-wrap">
              <p className="eyebrow" style={{ margin: '0 0 14px' }}>Chạy được với</p>
              <div className="marquee">
                <div className="marquee-track">
                  {[...LOADERS, ...LOADERS].map((loader, i) => (
                    <span className="loader-item" key={`${loader.id}-${i}`}>
                      <img src={`/loader-icon/${loader.id}.png`} alt="" width="26" height="26" />
                      {loader.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="shell">
            <SectionHead
              eyebrow="Nó làm được gì"
              title="Những việc launcher tự lo cho bạn"
              lead="Không phải cài Java thủ công, không phải tự tìm từng mod, không phải đăng nhập lại mỗi tuần."
            />
            <div className="bento">
              {FEATURES.map((feature, i) => (
                <Reveal key={feature.title} delay={60 * i} className={`card card-hover feat span-${feature.span}`}>
                  <p className="eyebrow" style={{ margin: '0 0 12px' }}>{feature.eyebrow}</p>
                  <h3 className="h3" style={{ margin: '0 0 10px' }}>{feature.title}</h3>
                  <p className="body" style={{ margin: '0 0 14px' }}>{feature.body}</p>
                  <ul className="ticks">
                    {feature.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
              <Reveal delay={360} className="card strip span-6">
                {[
                  'Miễn phí, mã nguồn mở trên GitHub',
                  'Không quảng cáo, không telemetry',
                  'Tự kiểm tra bản mới và tự cài khi thoát',
                ].map((item) => (
                  <span className="strip-item" key={item}>
                    <span className="dot" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section" id="shots">
          <div className="shell">
            <SectionHead
              eyebrow="Ảnh chụp"
              title="Giao diện thật, không phải bản mô phỏng"
              lead="Toàn bộ ảnh dưới đây chụp từ launcher đang chạy, ở cả hai kiểu giao diện."
            />
            <div className="gallery">
              {SHOTS.map((shot, i) => (
                <Reveal key={shot.src} delay={70 * i} className="shot-item">
                  <img className="shot" src={shot.src} alt={shot.alt} width="1145" height="720" loading="lazy" />
                  <p className="mono shot-cap">{shot.caption}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="get">
          <div className="shell">
            <SectionHead
              eyebrow="Tải về"
              title="Chọn bản cho máy của bạn"
              lead="Cài xong launcher tự kiểm tra bản mới và tự cập nhật khi bạn thoát."
            />
            <Reveal>
              <DownloadPanel release={release} fallbackUrl={LATEST} />
            </Reveal>
            <Reveal delay={120} className="get-note">
              <p className="body" style={{ margin: 0 }}>
                Windows 10/11 64-bit hoặc Linux x86_64. Launcher tự tải Java phù hợp cho từng phiên bản game.
              </p>
              <p className="body" style={{ margin: 0 }}>
                Gặp lỗi khi cài? <a className="link" href={`${REPO}/issues`} target="_blank" rel="noreferrer">Mở issue trên GitHub</a>.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="shell foot-inner">
          <div>
            <p className="mono" style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--label)' }}>LunarSpace Launcher</p>
            <p className="mono" style={{ margin: 0, fontSize: 12, color: 'var(--faint)' }}>
              Làm bởi foxstudio-201 · Không liên kết với Mojang hay Microsoft
            </p>
          </div>
          <nav className="foot-links" aria-label="Liên kết">
            <a href={RELEASES} target="_blank" rel="noreferrer">Bản phát hành</a>
            <a href={REPO} target="_blank" rel="noreferrer">Mã nguồn</a>
            <a href={`${REPO}/issues`} target="_blank" rel="noreferrer">Báo lỗi</a>
          </nav>
        </div>
      </footer>
    </>
  )
}
