interface Props {
  sidebarOpen: boolean
  presentation: boolean
  scale: number
  onToggleSidebar: () => void
  onTogglePresentation: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const IconMenu = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
const IconPlus = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
const IconMinus = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M5 12h14" />
  </svg>
)
const IconReset = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
  </svg>
)
const IconFull = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" />
  </svg>
)

export function Controls({
  sidebarOpen,
  presentation,
  scale,
  onToggleSidebar,
  onTogglePresentation,
  onZoomIn,
  onZoomOut,
  onReset,
}: Props) {
  return (
    <>
      <div className="controls">
        <button
          className={`ctrlBtn ${sidebarOpen ? 'ctrlBtn--on' : ''}`}
          onClick={onToggleSidebar}
          title="Панель ([)"
          aria-label="Переключить панель"
        >
          <IconMenu />
        </button>
        <button className="ctrlBtn" onClick={onZoomIn} title="Приблизить (+)" aria-label="Приблизить">
          <IconPlus />
        </button>
        <button className="ctrlBtn" onClick={onZoomOut} title="Отдалить (−)" aria-label="Отдалить">
          <IconMinus />
        </button>
        <button className="ctrlBtn" onClick={onReset} title="Сбросить зум (0)" aria-label="Сбросить зум">
          <IconReset />
        </button>
        <button
          className={`ctrlBtn ${presentation ? 'ctrlBtn--accent' : ''}`}
          onClick={onTogglePresentation}
          title="Полный экран (F)"
          aria-label="Полноэкранный режим"
        >
          <IconFull />
        </button>
      </div>
      <div className="ctrlBtn__zoomLabel">{Math.round(scale * 100)}%</div>
    </>
  )
}
