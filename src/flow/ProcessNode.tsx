import { memo, type CSSProperties } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { DEGREE, hasHangingOption } from '../data/processMap'
import type { FlowNode } from './graph'

function ProcessNodeBase({ data, selected }: NodeProps<FlowNode>) {
  const { node, stageColor, dim, matched } = data
  const degree = DEGREE[node.id] ?? 0
  const hanging = hasHangingOption(node)

  const cls = [
    'rfnode',
    selected && 'rfnode--selected',
    dim && 'rfnode--dim',
    matched && !selected && 'rfnode--match',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls} style={{ '--stage': stageColor } as CSSProperties}>
      <Handle type="target" position={Position.Top} className="rfhandle" />
      <span className="node__dot" />
      <span className="node__title">{node.title}</span>
      <span className="node__meta">
        <span className="node__count">{degree} связей</span>
        {hanging && <span className="node__flag">нужна методика</span>}
      </span>
      <Handle type="source" position={Position.Bottom} className="rfhandle" />
    </div>
  )
}

export const ProcessNode = memo(ProcessNodeBase)
