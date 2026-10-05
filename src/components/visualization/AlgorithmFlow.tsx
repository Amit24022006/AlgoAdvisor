import { useCallback, useEffect, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useAppSelector } from '../../store/hooks'
import { Play, RotateCcw } from 'lucide-react'

function buildNodes(algorithmName: string): { nodes: Node[]; edges: Edge[] } {
  const style = {
    background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '12px',
    fontFamily: 'monospace',
    fontWeight: '600',
    minWidth: '120px',
    textAlign: 'center' as const,
  }
  const stepStyle = {
    background: '#1e2536',
    color: '#e2e8f0',
    border: '1px solid #2a3349',
    borderRadius: '8px',
    padding: '6px 14px',
    fontSize: '11px',
    fontFamily: 'monospace',
    minWidth: '110px',
    textAlign: 'center' as const,
  }

  const lower = algorithmName.toLowerCase()

  if (lower.includes('binary search') || lower.includes('binary')) {
    return {
      nodes: [
        { id: '1', position: { x: 250, y: 0 }, data: { label: 'Start: Array[0..n]' }, style },
        { id: '2', position: { x: 250, y: 90 }, data: { label: 'mid = (lo+hi)/2' }, style: stepStyle },
        { id: '3', position: { x: 80, y: 190 }, data: { label: 'arr[mid] == target?' }, style: stepStyle },
        { id: '4', position: { x: 420, y: 190 }, data: { label: '< target? lo=mid+1' }, style: stepStyle },
        { id: '5', position: { x: 80, y: 290 }, data: { label: '✅ Found at mid' }, style: { ...stepStyle, background: '#064e3b', color: '#6ee7b7', borderColor: '#065f46' } },
        { id: '6', position: { x: 420, y: 290 }, data: { label: '> target? hi=mid-1' }, style: stepStyle },
        { id: '7', position: { x: 250, y: 390 }, data: { label: 'lo > hi? ❌ Not Found' }, style: { ...stepStyle, background: '#450a0a', color: '#fca5a5', borderColor: '#7f1d1d' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-5', source: '3', target: '5', label: 'Yes' },
        { id: 'e4-6', source: '4', target: '6' },
        { id: 'e6-7', source: '6', target: '7' },
      ],
    }
  }

  if (lower.includes('quick') || lower.includes('sort')) {
    return {
      nodes: [
        { id: '1', position: { x: 200, y: 0 }, data: { label: 'quickSort(arr, lo, hi)' }, style },
        { id: '2', position: { x: 200, y: 90 }, data: { label: 'lo < hi?' }, style: stepStyle },
        { id: '3', position: { x: 200, y: 180 }, data: { label: 'pivot = partition(arr)' }, style: stepStyle },
        { id: '4', position: { x: 60, y: 280 }, data: { label: 'quickSort(lo, p-1)' }, style: stepStyle },
        { id: '5', position: { x: 340, y: 280 }, data: { label: 'quickSort(p+1, hi)' }, style: stepStyle },
        { id: '6', position: { x: 200, y: 370 }, data: { label: '✅ Array Sorted' }, style: { ...stepStyle, background: '#064e3b', color: '#6ee7b7', borderColor: '#065f46' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', label: 'Yes' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e3-5', source: '3', target: '5' },
        { id: 'e4-6', source: '4', target: '6' },
        { id: 'e5-6', source: '5', target: '6' },
      ],
    }
  }

  if (lower.includes('bfs') || lower.includes('breadth')) {
    return {
      nodes: [
        { id: '1', position: { x: 200, y: 0 }, data: { label: 'BFS(graph, start)' }, style },
        { id: '2', position: { x: 200, y: 90 }, data: { label: 'Queue: [start]' }, style: stepStyle },
        { id: '3', position: { x: 200, y: 180 }, data: { label: 'Dequeue node' }, style: stepStyle },
        { id: '4', position: { x: 50, y: 270 }, data: { label: 'Visited?' }, style: stepStyle },
        { id: '5', position: { x: 350, y: 270 }, data: { label: 'Mark visited' }, style: stepStyle },
        { id: '6', position: { x: 350, y: 360 }, data: { label: 'Enqueue neighbors' }, style: stepStyle },
        { id: '7', position: { x: 200, y: 450 }, data: { label: '✅ Done / Found' }, style: { ...stepStyle, background: '#064e3b', color: '#6ee7b7', borderColor: '#065f46' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5', label: 'No' },
        { id: 'e5-6', source: '5', target: '6' },
        { id: 'e6-7', source: '6', target: '7' },
        { id: 'e4-7', source: '4', target: '7', label: 'Yes, skip' },
      ],
    }
  }

  // Generic flowchart for any algorithm
  return {
    nodes: [
      { id: '1', position: { x: 200, y: 0 }, data: { label: `${algorithmName}` }, style },
      { id: '2', position: { x: 200, y: 90 }, data: { label: 'Initialize state' }, style: stepStyle },
      { id: '3', position: { x: 200, y: 180 }, data: { label: 'Process input' }, style: stepStyle },
      { id: '4', position: { x: 60, y: 270 }, data: { label: 'Base case?' }, style: stepStyle },
      { id: '5', position: { x: 340, y: 270 }, data: { label: 'Recurse / Iterate' }, style: stepStyle },
      { id: '6', position: { x: 200, y: 360 }, data: { label: '✅ Return result' }, style: { ...stepStyle, background: '#064e3b', color: '#6ee7b7', borderColor: '#065f46' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-6', source: '4', target: '6', label: 'Yes' },
      { id: 'e4-5', source: '4', target: '5', label: 'No' },
      { id: 'e5-6', source: '5', target: '6' },
    ],
  }
}

interface Props {
  algorithmName: string
}

export default function AlgorithmFlow({ algorithmName }: Props) {
  const { theme } = useAppSelector(s => s.ui)
  const { nodes: initialNodes, edges: initialEdges } = buildNodes(algorithmName)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [highlighted, setHighlighted] = useState(-1)
  const [running, setRunning] = useState(false)

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  )

  useEffect(() => {
    const { nodes: n, edges: e } = buildNodes(algorithmName)
    setNodes(n)
    setEdges(e)
    setHighlighted(-1)
  }, [algorithmName])

  const runAnimation = () => {
    if (running) return
    setRunning(true)
    setHighlighted(-1)
    nodes.forEach((_, i) => {
      setTimeout(() => {
        setHighlighted(i)
        if (i === nodes.length - 1) setRunning(false)
      }, i * 600)
    })
  }

  const highlightedNodes = nodes.map((n, i) => ({
    ...n,
    style: {
      ...n.style,
      outline: i === highlighted ? '2px solid #22c55e' : 'none',
      filter: i === highlighted ? 'brightness(1.3)' : 'none',
      transition: 'all 0.3s',
    },
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Algorithm Flow Visualization
        </h4>
        <div className="flex gap-2">
          <button onClick={runAnimation} disabled={running} className="btn-primary text-xs py-1.5 px-3">
            <Play size={12} /> {running ? 'Running...' : 'Run Dry-Run'}
          </button>
          <button
            onClick={() => { setHighlighted(-1); setRunning(false) }}
            className="btn-secondary text-xs py-1.5 px-3"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>
      <div
        style={{ height: 450, border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}
      >
        <ReactFlow
          nodes={highlightedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode={theme === 'dark' ? 'dark' : 'light'}
          defaultEdgeOptions={{ type: 'smoothstep', style: { stroke: '#3b82f6', strokeWidth: 1.5 } }}
        >
          <Background color={theme === 'dark' ? '#2a3349' : '#e2e8f0'} gap={20} />
          <Controls />
          <MiniMap
            nodeColor={() => '#3b82f6'}
            maskColor={theme === 'dark' ? 'rgba(15,17,23,0.7)' : 'rgba(248,250,252,0.7)'}
          />
        </ReactFlow>
      </div>
    </div>
  )
}
