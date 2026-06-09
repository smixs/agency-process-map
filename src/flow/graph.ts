import dagre from '@dagrejs/dagre'
import { MarkerType, Position, type Edge, type Node } from '@xyflow/react'
import {
  LINKS,
  NODES,
  STAGES,
  nodeById,
  type LinkKind,
  type ProcessNode as PNode,
  type StageId,
} from '../data/processMap'

export interface NodeData {
  node: PNode
  stageColor: string
  dim: boolean
  matched: boolean
  [key: string]: unknown
}

export type FlowNode = Node<NodeData, 'process'>

const NODE_W = 248
const NODE_H = 108

const colorOf = (stage: StageId): string =>
  STAGES.find((s) => s.id === stage)!.color

export const dashFor = (kind: LinkKind): string | undefined =>
  kind === 'content' ? '7 6' : kind === 'synergy' ? '1.5 7' : undefined

/** базовые ноды (позиции проставит dagre) */
export function buildNodes(): FlowNode[] {
  return NODES.map((n) => ({
    id: n.id,
    type: 'process',
    position: { x: 0, y: 0 },
    width: NODE_W,
    data: { node: n, stageColor: colorOf(n.stage), dim: false, matched: false },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    draggable: false,
  }))
}

/** базовые рёбра: цвет = цвет этапа-ИСТОЧНИКА, стиль штриха = тип связи */
export function buildEdges(): Edge[] {
  return LINKS.map((l, i) => {
    const src = nodeById(l.from)!
    const color = colorOf(src.stage)
    return {
      id: `${l.from}__${l.to}__${l.kind}__${i}`,
      source: l.from,
      target: l.to,
      type: 'smoothstep',
      pathOptions: { borderRadius: 16 },
      data: { kind: l.kind, stage: src.stage },
      style: {
        stroke: color,
        strokeWidth: 1.8,
        strokeDasharray: dashFor(l.kind),
      },
      markerEnd: { type: MarkerType.ArrowClosed, color, width: 15, height: 15 },
    } as Edge
  })
}

export interface BandMeta {
  id: StageId
  num: string
  name: string
  color: string
  x: number
  y: number
  width: number
  height: number
}

const LABEL_W = 200
const BAND_PADX = 40
const BAND_PADY = 60
const BAND_GAP = 72

/**
 * Swimlane-раскладка: КАЖДЫЙ ЭТАП — горизонтальный уровень-полоса (сверху вниз).
 * Внутри полосы ноды раскладываются под-dagre (TB) только по ВНУТРИэтапным связям,
 * поэтому внутри уровня связи текут вниз аккуратно. Межэтапные связи рисует React Flow
 * между глобальными позициями — они уходят вниз к следующему уровню.
 */
export function bandedLayout(nodes: FlowNode[]): {
  nodes: FlowNode[]
  bands: BandMeta[]
} {
  const perStage = STAGES.map((stage) => {
    const sNodes = nodes.filter((n) => n.data.node.stage === stage.id)
    const ids = new Set(sNodes.map((n) => n.id))
    const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))
    g.setGraph({ rankdir: 'TB', ranksep: 78, nodesep: 40, edgesep: 18, marginx: 0, marginy: 0 })
    sNodes.forEach((n) => g.setNode(n.id, { width: NODE_W, height: NODE_H }))
    for (const l of LINKS) if (ids.has(l.from) && ids.has(l.to)) g.setEdge(l.from, l.to)
    dagre.layout(g)

    const pos: Record<string, { x: number; y: number }> = {}
    let minX = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    sNodes.forEach((n) => {
      const p = g.node(n.id)
      const x = p.x - NODE_W / 2
      const y = p.y - NODE_H / 2
      pos[n.id] = { x, y }
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x + NODE_W)
      maxY = Math.max(maxY, y + NODE_H)
    })
    sNodes.forEach((n) => (pos[n.id].x -= minX))
    return { stage, sNodes, pos, width: maxX - minX, height: maxY }
  })

  const globalWidth = Math.max(...perStage.map((s) => s.width))
  const placed: FlowNode[] = []
  const bands: BandMeta[] = []
  let cursorY = 0

  for (const sl of perStage) {
    const offsetX = LABEL_W + (globalWidth - sl.width) / 2
    sl.sNodes.forEach((n) => {
      placed.push({
        ...n,
        position: {
          x: offsetX + sl.pos[n.id].x,
          y: cursorY + BAND_PADY + sl.pos[n.id].y,
        },
      })
    })
    const bandHeight = sl.height + BAND_PADY * 2
    bands.push({
      id: sl.stage.id,
      num: sl.stage.num,
      name: sl.stage.name,
      color: sl.stage.color,
      x: -BAND_PADX,
      y: cursorY,
      width: LABEL_W + globalWidth + BAND_PADX * 2,
      height: bandHeight,
    })
    cursorY += bandHeight + BAND_GAP
  }

  return { nodes: placed, bands }
}
