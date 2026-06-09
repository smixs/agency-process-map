import { useCallback, useEffect, useMemo, useState } from 'react'
import { NODES, ROUTES, STAGES, type RouteId } from './data/processMap'
import { FlowMap, type LinkFilter } from './flow/FlowMap'
import { Sidebar } from './components/Sidebar'
import { DetailsDrawer } from './components/DetailsDrawer'

const isWide = () => typeof window !== 'undefined' && window.innerWidth >= 1024

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeRoute, setActiveRoute] = useState<RouteId>('all')
  const [linkFilter, setLinkFilter] = useState<LinkFilter>('all')
  const [showAllLinks, setShowAllLinks] = useState(true)
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(isWide)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [presentation, setPresentation] = useState(false)

  const routeSet = useMemo<Set<string> | null>(() => {
    const meta = ROUTES.find((r) => r.id === activeRoute)
    return meta?.nodes ? new Set(meta.nodes) : null
  }, [activeRoute])

  const matchSet = useMemo<Set<string> | null>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    const s = new Set<string>()
    for (const n of NODES) {
      const hit =
        n.title.toLowerCase().includes(q) ||
        n.group.toLowerCase().includes(q) ||
        n.options.some((o) => o.toLowerCase().includes(q))
      if (hit) s.add(n.id)
    }
    return s
  }, [query])

  const dimSet = useMemo<Set<string> | null>(() => {
    const active = matchSet ?? routeSet
    if (!active) return null
    const s = new Set<string>()
    for (const n of NODES) if (!active.has(n.id)) s.add(n.id)
    return s
  }, [matchSet, routeSet])

  const selectNode = useCallback((id: string) => {
    setSelectedId(id)
    setDetailsOpen(true)
  }, [])

  const closeDetails = useCallback(() => {
    setDetailsOpen(false)
    setSelectedId(null)
  }, [])

  const togglePresentation = useCallback(() => {
    setPresentation((p) => {
      const next = !p
      if (next) {
        setSidebarOpen(false)
        setDetailsOpen(false)
        setSelectedId(null)
      }
      return next
    })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return
      if (e.key === '[') setSidebarOpen((o) => !o)
      else if (e.key === 'f' || e.key === 'F') togglePresentation()
      else if (e.key === 'Escape') {
        if (detailsOpen) closeDetails()
        else if (sidebarOpen) setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [detailsOpen, sidebarOpen, closeDetails, togglePresentation])

  const appClass = [
    'app',
    sidebarOpen && 'sidebar-open',
    detailsOpen && 'details-open',
    presentation && 'presentation',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={appClass}>
      <Sidebar
        activeRoute={activeRoute}
        onRoute={setActiveRoute}
        linkFilter={linkFilter}
        onFilter={setLinkFilter}
        showAllLinks={showAllLinks}
        onToggleAll={() => setShowAllLinks((v) => !v)}
        query={query}
        onQuery={setQuery}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main">
        <FlowMap
          selectedId={selectedId}
          hoveredId={hoveredId}
          routeSet={routeSet}
          dimSet={dimSet}
          matchSet={matchSet}
          linkFilter={linkFilter}
          showAllLinks={showAllLinks}
          activeRoute={activeRoute}
          sidebarOpen={sidebarOpen}
          presentation={presentation}
          onSelect={selectNode}
          onHover={setHoveredId}
          onClear={closeDetails}
          onToggleSidebar={() => setSidebarOpen((o) => !o)}
          onTogglePresentation={togglePresentation}
        />
      </main>

      <DetailsDrawer nodeId={selectedId} onSelect={selectNode} onClose={closeDetails} />

      <div className="titleChip">
        <span className="titleChip__dots">
          {STAGES.map((s) => (
            <span key={s.id} className="titleChip__dot" style={{ background: s.color }} />
          ))}
        </span>
        Агентский процесс
      </div>

      <div
        className={`backdrop ${sidebarOpen || detailsOpen ? 'backdrop--show' : ''}`}
        onClick={() => {
          if (detailsOpen) closeDetails()
          else setSidebarOpen(false)
        }}
      />
    </div>
  )
}
