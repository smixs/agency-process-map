import { useMemo, type CSSProperties } from 'react'
import {
  LINKS,
  LINK_KIND_LABEL,
  STAGES,
  nodeById,
  type Link,
  type LinkKind,
} from '../data/processMap'

const stageVar = (color: string) => ({ '--stage': color }) as CSSProperties

interface Props {
  nodeId: string | null
  onSelect: (id: string) => void
  onClose: () => void
}

const KIND_COLOR: Record<LinkKind, string> = {
  dataflow: '#2563eb',
  content: '#059669',
  synergy: '#d97706',
}

function optionClass(opt: string): string {
  if (opt.startsWith('🚩')) return 'opt opt--hang'
  if (opt.includes('(доп.)')) return 'opt opt--added'
  return 'opt'
}

export function DetailsDrawer({ nodeId, onSelect, onClose }: Props) {
  const data = useMemo(() => {
    if (!nodeId) return null
    const node = nodeById(nodeId)
    if (!node) return null
    const stage = STAGES.find((s) => s.id === node.stage)!
    const incoming = LINKS.filter((l) => l.to === nodeId)
    const outgoing = LINKS.filter((l) => l.from === nodeId)
    return { node, stage, incoming, outgoing }
  }, [nodeId])

  const renderLink = (l: Link, dir: 'in' | 'out') => {
    const otherId = dir === 'in' ? l.from : l.to
    const other = nodeById(otherId)
    if (!other) return null
    return (
      <button
        key={`${l.from}-${l.to}-${l.kind}`}
        className="linkItem"
        onClick={() => onSelect(otherId)}
      >
        <span className="linkItem__row">
          <span className="linkItem__kind" style={{ color: KIND_COLOR[l.kind] }}>
            {LINK_KIND_LABEL[l.kind]}
          </span>
          <span className="linkItem__arrow">{dir === 'in' ? '←' : '→'}</span>
          <span className="linkItem__target">{other.title}</span>
          {l.added && <span className="linkItem__tag">доп.</span>}
        </span>
        {l.label && <span className="linkItem__label">{l.label}</span>}
      </button>
    )
  }

  return (
    <aside
      className="drawer"
      style={data ? stageVar(data.stage.color) : undefined}
    >
      <div className="drawer__grip" />
      {data && (
        <>
          <div className="drawer__head">
            <div>
              <div className="drawer__badge">
                {data.stage.num}. {data.stage.name}
              </div>
              <h2 className="drawer__title">{data.node.title}</h2>
              <div className="drawer__group">{data.node.group}</div>
            </div>
            <button className="drawer__close" onClick={onClose} aria-label="Закрыть">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <p className="drawer__desc">{data.node.desc}</p>

          <div className="subhead">Варианты содержания</div>
          {data.node.options.map((o, i) => (
            <div key={i} className={optionClass(o)}>
              {o}
            </div>
          ))}

          <div className="subhead">↑ На входе ({data.incoming.length})</div>
          {data.incoming.length ? (
            data.incoming.map((l) => renderLink(l, 'in'))
          ) : (
            <div className="muted">Корневой узел</div>
          )}

          <div className="subhead">↓ Влияет на ({data.outgoing.length})</div>
          {data.outgoing.length ? (
            data.outgoing.map((l) => renderLink(l, 'out'))
          ) : (
            <div className="muted">Терминальный узел</div>
          )}
        </>
      )}
    </aside>
  )
}
