import { type CSSProperties } from 'react'
import { ROUTES, STAGES, type RouteId } from '../data/processMap'
import type { LinkFilter } from '../flow/FlowMap'

interface Props {
  activeRoute: RouteId
  onRoute: (r: RouteId) => void
  linkFilter: LinkFilter
  onFilter: (f: LinkFilter) => void
  showAllLinks: boolean
  onToggleAll: () => void
  query: string
  onQuery: (q: string) => void
  onClose: () => void
}

const FILTERS: { id: LinkFilter; label: string; color: string }[] = [
  { id: 'all', label: 'Все связи', color: '#878da6' },
  { id: 'dataflow', label: 'Поток данных', color: '#4f46e5' },
  { id: 'content', label: 'Связь по содержанию', color: '#0d9488' },
  { id: 'synergy', label: 'Синергии', color: '#d97706' },
]

const TgIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.31l-2.72 12.81c-.19.92-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
  </svg>
)

const CONTACTS = [
  { name: 'Serge Shima', handle: '@shimaoz', url: 'https://t.me/shimaoz' },
  { name: 'Paul Deadcough', handle: '@pasha_v_tg', url: 'https://t.me/pasha_v_tg' },
]

const ROUTE_COLORS: Record<RouteId, string> = {
  all: '#334155',
  launch: '#4f46e5',
  attack: '#db2777',
  frequency: '#0284c7',
  trust: '#059669',
  premium: '#ea580c',
}

export function Sidebar({
  activeRoute,
  onRoute,
  linkFilter,
  onFilter,
  showAllLinks,
  onToggleAll,
  query,
  onQuery,
  onClose,
}: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <div className="sidebar__head">
          <div className="sidebar__title">Агентский процесс</div>
          <button className="sidebar__close" onClick={onClose} aria-label="Закрыть панель">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="sidebar__sub">
          5 уровней · потоки данных · связи по содержанию · синергии
        </div>

        <input
          className="search"
          type="text"
          placeholder="Поиск узла…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />

        <div className="section">
          <div className="section__title">Этапы (цвет = уровень)</div>
          {STAGES.map((s) => (
            <div className="legend-item" key={s.id}>
              <span className="swatch" style={{ background: s.color }} />
              {s.num}. {s.name}
            </div>
          ))}
        </div>

        <div className="section">
          <div className="section__title">Маршруты</div>
          <div className="btn-list">
            {ROUTES.map((r) => {
              const c = ROUTE_COLORS[r.id]
              const active = activeRoute === r.id
              return (
                <button
                  key={r.id}
                  className={`pill ${active ? 'pill--route' : ''}`}
                  style={
                    active
                      ? ({ background: c, borderColor: c, color: '#fff' } as CSSProperties)
                      : undefined
                  }
                  onClick={() => onRoute(r.id)}
                >
                  <span className="swatch" style={{ background: active ? '#fff' : c }} />
                  {r.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="section">
          <div className="section__title">Типы связей</div>
          <div className="btn-list">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`pill ${linkFilter === f.id ? 'pill--active' : ''}`}
                onClick={() => onFilter(f.id)}
              >
                <span className="swatch" style={{ background: f.color }} />
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <button className="toggleRow" onClick={onToggleAll} style={{ width: '100%' }}>
            <span>Показывать все связи</span>
            <span className={`switch ${showAllLinks ? 'switch--on' : ''}`} />
          </button>
        </div>

        <div className="section">
          <div className="section__title">Управление</div>
          <div className="hint">
            <kbd>колесо</kbd> / тач — двигать карту<br />
            <kbd>⌃</kbd>+<kbd>колесо</kbd> / pinch — зум<br />
            <kbd>[</kbd> — панель · <kbd>F</kbd> — полный экран · <kbd>Esc</kbd> — закрыть
          </div>
        </div>

        <div className="section">
          <div className="section__title">Контакты</div>
          {CONTACTS.map((c) => (
            <a
              key={c.url}
              className="contact"
              href={c.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="contact__icon">
                <TgIcon />
              </span>
              <span className="contact__text">
                <b>{c.name}</b>
                <span className="contact__handle">{c.handle}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
