const ROWS = [
  '█                              ████',
  '█     █   █ ████   ███  ████  █     ████   ███   ████  ███',
  '█     █   █ █   █ █   █ █   █  ███  █   █ █   █ █     █   █',
  '█     █   █ █   █ █   █ █         █ ████  █   █ █     █████',
  '█████  ███  █   █  ████ █     ████  █      ████  ████  ███',
  '                                    █',
]

const COLS = Math.max(...ROWS.map((row) => row.length))
const H = ROWS.length

export default function Wordmark({ label = 'LunarSpace' }) {
  return (
    <svg
      className="wordmark"
      viewBox={`0 0 ${COLS} ${H}`}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      {ROWS.map((row, y) => (
        <g className="wm-row" key={y} style={{ '--i': y }}>
          {[...row].map((char, x) =>
            char === '█' ? <rect key={x} x={x} y={y} width="1" height="1" /> : null,
          )}
        </g>
      ))}
    </svg>
  )
}
