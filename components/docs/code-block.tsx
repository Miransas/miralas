"use client"

import { useState, useMemo } from "react"
import { Check, Copy, Info, Sparkles } from "lucide-react"
import { highlightSync } from "@/lib/syntax-highlight"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  tabs?: string[]
}

export function CodeBlock({ code, language = "bash", filename, tabs }: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard()
  const [activeTab, setActiveTab] = useState(0)

  const displayTabs = tabs || (language === "bash" && code.includes("npm") ? ["npm", "pnpm"] : null)

  const highlightedHtml = useMemo(() => {
    return highlightSync(code, language)
  }, [code, language])

  const handleCopy = () => copy(code.trim())

  return (
    <div className="code-block my-6" role="region" aria-label={`Code example${filename ? `: ${filename}` : ""}`}>
      {/* Header */}
      <div className="code-block-header">
        {/* Left side: tabs or filename */}
        <div className="flex items-center gap-4" role={displayTabs ? "tablist" : undefined}>
          {displayTabs ? (
            displayTabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                role="tab"
                aria-selected={activeTab === index}
                className={`code-block-tab min-h-[44px] min-w-[44px] ${activeTab === index ? "active" : ""}`}
              >
                {tab}
                {activeTab === index && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
              </button>
            ))
          ) : filename ? (
            <span className="code-block-label">{filename}</span>
          ) : (
            <span className="code-block-label">{language}</span>
          )}
        </div>

        {/* Right side: action icons */}
        <div className="flex items-center gap-1">
          <button className="code-block-icon-btn min-h-[44px] min-w-[44px] p-2" aria-label="Show code information">
            <Info className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            className={`code-block-icon-btn min-h-[44px] min-w-[44px] p-2 ${copied ? "text-green-500" : ""}`}
            aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          <button className="code-block-icon-btn min-h-[44px] min-w-[44px] p-2" aria-label="Explain code with AI">
            <Sparkles className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Code content */}
      <div
        className="code-block-content"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        role="tabpanel"
        tabIndex={0}
      />
    </div>
  )
}
