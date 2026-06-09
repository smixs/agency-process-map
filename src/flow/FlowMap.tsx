import { useEffect, useMemo, type CSSProperties } from 'react'
import {
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
  PanOnScrollMode,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useViewport,
  ViewportPortal,
  type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { LinkKind, RouteId } from '../data/processMap'
import { bandedLayout, buildEdges, buildNodes, type FlowNode } from './graph'
import { ProcessNode } from './ProcessNode'
import { Controls } from '../components/Controls'

export type LinkFilter = 'all' | LinkKind

const nodeTypes = { process: ProcessNode }

interface Props {
  selectedId: string | null
  hoveredId: string | null
  routeSet: Set<string> | null
  dimSet: Set<string> | null
  matchSet: Set<string> | null
  linkFilter: LinkFilter
  showAllLinks: boolean
  activeRoute: RouteId
  sidebarOpen: boolean
  presentation: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  onClear: () => void
  onToggleSidebar: () => void
  onTogglePresentation: () => void
}

function FlowInner(props: Props) {
  const {
    selectedId,
    hoveredId,
    routeSet,
    dimSet,
    matchSet,
    linkFilter,
    showAllLinks,
    onSelect,
    onHover,
    onClear,
  } = props

  const rf = useReactFlow()
  const { zoom } = useViewport()

  const { nodes: baseNodes, bands } = useMemo(() => bandedLayout(buildNodes()), [])
  const baseEdges = useMemo<Edge[]>(() => buildEdges(), [])

  const focus = selectedId ?? hoveredId

  const nodes = useMemo<FlowNode[]>(
    () =>
      baseNodes.map((n) => ({
        ...n,
        selected: n.id === selectedId,
        data: {
          ...n.data,
          dim: dimSet ? dimSet.has(n.id) : false,
          matched: matchSet ? matchSet.has(n.id) : false,
        },
      })),
    [baseNodes, selectedId, dimSet, matchSet],
  )

  const edges = useMemo<Edge[]>(() => {
    return baseEdges.map((e) => {
      const kind = (e.data?.kind as LinkKind) ?? 'dataflow'
      const inRoute = !routeSet || (routeSet.has(e.source) && routeSet.has(e.target))
      const connected = !!focus && (e.source === focus || e.target === focus)

      const hiddenByFilter = linkFilter !== 'all' && kind !== linkFilter
      const hiddenByToggle = !showAllLinks && !connected && !(routeSet && inRoute)
      const hidden = hiddenByFilter || hiddenByToggle

      let opacity = 0.9
      let width = 1.8
      let animated = false
      if (focus) {
        opacity = connected ? 1 : 0.07
        width = connected ? 3.4 : 1.4
        animated = connected
      } else if (routeSet) {
        opacity = inRoute ? 0.95 : 0.08
        width = inRoute ? 2.4 : 1.4
      }

      return {
        ...e,
        hidden,
        animated,
        zIndex: connected ? 10 : 0,
        style: { ...e.style, strokeWidth: width, opacity },
      }
    })
  }, [baseEdges, focus, routeSet, linkFilter, showAllLinks])

  // центрируем выбранный узел в кадре
  useEffect(() => {
    if (!selectedId) return
    const n = baseNodes.find((x) => x.id === selectedId)
    if (n) {
      rf.fitView({ nodes: [{ id: selectedId }], duration: 450, maxZoom: 1.25, padding: 0.45 })
    }
  }, [selectedId, baseNodes, rf])

  return (
    <>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeClick={(_, n) => onSelect(n.id)}
      onNodeMouseEnter={(_, n) => onHover(n.id)}
      onNodeMouseLeave={() => onHover(null)}
      onPaneClick={onClear}
      fitView
      fitViewOptions={{ padding: 0.22, maxZoom: 1 }}
      minZoom={0.15}
      maxZoom={2.4}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable
      panOnScroll
      panOnScrollMode={PanOnScrollMode.Free}
      zoomOnScroll={false}
      zoomOnPinch
      zoomOnDoubleClick={false}
      panOnDrag
      selectionOnDrag={false}
      proOptions={{ hideAttribution: true }}
    >
      <ViewportPortal>
        <div className="bandLayer">
          {bands.map((b) => (
            <div
              key={b.id}
              className="band"
              style={
                {
                  left: b.x,
                  top: b.y,
                  width: b.width,
                  height: b.height,
                  '--stage': b.color,
                } as CSSProperties
              }
            >
              <div className="band__head">
                <span className="band__num">{b.num}</span>
                <span className="band__name">{b.name}</span>
              </div>
            </div>
          ))}
        </div>
      </ViewportPortal>
      <Background variant={BackgroundVariant.Dots} gap={26} size={1.5} color="#c9cee0" />
      <MiniMap
        pannable
        zoomable
        nodeColor={(n) => (n.data as FlowNode['data']).stageColor}
        nodeStrokeWidth={0}
        maskColor="rgba(20,22,50,0.06)"
        style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 12, bottom: 44 }}
      />
      <Panel position="bottom-right" className="attrib">
        deadcough/shima
      </Panel>
    </ReactFlow>
    <Controls
      sidebarOpen={props.sidebarOpen}
      presentation={props.presentation}
      scale={zoom}
      onToggleSidebar={props.onToggleSidebar}
      onTogglePresentation={props.onTogglePresentation}
      onZoomIn={() => rf.zoomIn({ duration: 200 })}
      onZoomOut={() => rf.zoomOut({ duration: 200 })}
      onReset={() => rf.fitView({ duration: 350, padding: 0.22, maxZoom: 1 })}
    />
    </>
  )
}

export function FlowMap(props: Props) {
  return (
    <ReactFlowProvider>
      <FlowInner {...props} />
    </ReactFlowProvider>
  )
}
