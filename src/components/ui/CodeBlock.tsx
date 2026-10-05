import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import { useAppSelector } from '../../store/hooks'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export default function CodeBlock({ code, language = 'java', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useAppSelector(s => s.ui)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{ border: '1px solid var(--color-border)' }}
      className="rounded-xl overflow-hidden"
    >
      {/* Header bar */}
      <div
        style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}
        className="flex items-center justify-between px-4 py-2"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          {filename && (
            <span className="text-xs font-mono ml-2" style={{ color: 'var(--color-text-secondary)' }}>
              {filename}
            </span>
          )}
          <span
            className="text-xs px-2 py-0.5 rounded font-mono ml-1"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-secondary)' }}
          >
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg transition-all"
          style={{
            color: copied ? '#22c55e' : 'var(--color-text-secondary)',
            backgroundColor: 'var(--color-bg-card)',
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            fontSize: '0.82rem',
            lineHeight: '1.6',
            background: theme === 'dark' ? '#0d1117' : '#f8f8f8',
          }}
          showLineNumbers
          lineNumberStyle={{ color: '#4b5563', minWidth: '2.5em' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
