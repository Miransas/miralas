// Synchronous syntax highlighter - no async, no WASM, instant rendering
// Uses CSS classes that reference CSS variables for theme switching

type TokenType =
  | "plain"
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "function"
  | "operator"
  | "punctuation"
  | "variable"
  | "property"
  | "tag"
  | "attr-name"
  | "attr-value"

interface Token {
  type: TokenType
  content: string
}

const JS_KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "this",
  "class",
  "extends",
  "import",
  "export",
  "from",
  "default",
  "async",
  "await",
  "try",
  "catch",
  "finally",
  "throw",
  "typeof",
  "instanceof",
  "in",
  "of",
  "true",
  "false",
  "null",
  "undefined",
  "void",
  "delete",
  "yield",
  "static",
  "get",
  "set",
  "super",
  "implements",
  "interface",
  "type",
  "enum",
  "as",
])

const BASH_KEYWORDS = new Set([
  "cd",
  "ls",
  "mkdir",
  "rm",
  "cp",
  "mv",
  "cat",
  "echo",
  "grep",
  "find",
  "npm",
  "npx",
  "pnpm",
  "yarn",
  "node",
  "git",
  "curl",
  "wget",
  "sudo",
  "export",
  "source",
  "chmod",
  "chown",
  "exit",
  "docs",
  "init",
  "dev",
  "build",
  "deploy",
  "install",
  "run",
  "start",
  "test",
])

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function tokenizeJS(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    // Whitespace
    if (/\s/.test(code[i])) {
      let ws = ""
      while (i < code.length && /\s/.test(code[i])) {
        ws += code[i++]
      }
      tokens.push({ type: "plain", content: ws })
      continue
    }

    // Single-line comment
    if (code.slice(i, i + 2) === "//") {
      let comment = ""
      while (i < code.length && code[i] !== "\n") {
        comment += code[i++]
      }
      tokens.push({ type: "comment", content: comment })
      continue
    }

    // Multi-line comment
    if (code.slice(i, i + 2) === "/*") {
      let comment = "/*"
      i += 2
      while (i < code.length && code.slice(i, i + 2) !== "*/") {
        comment += code[i++]
      }
      comment += "*/"
      i += 2
      tokens.push({ type: "comment", content: comment })
      continue
    }

    // String (double quotes)
    if (code[i] === '"') {
      let str = '"'
      i++
      while (i < code.length && code[i] !== '"') {
        if (code[i] === "\\") str += code[i++]
        if (i < code.length) str += code[i++]
      }
      if (i < code.length) str += code[i++]
      tokens.push({ type: "string", content: str })
      continue
    }

    // String (single quotes)
    if (code[i] === "'") {
      let str = "'"
      i++
      while (i < code.length && code[i] !== "'") {
        if (code[i] === "\\") str += code[i++]
        if (i < code.length) str += code[i++]
      }
      if (i < code.length) str += code[i++]
      tokens.push({ type: "string", content: str })
      continue
    }

    // Template string
    if (code[i] === "`") {
      let str = "`"
      i++
      while (i < code.length && code[i] !== "`") {
        if (code[i] === "\\") str += code[i++]
        if (i < code.length) str += code[i++]
      }
      if (i < code.length) str += code[i++]
      tokens.push({ type: "string", content: str })
      continue
    }

    // Numbers
    if (/\d/.test(code[i])) {
      let num = ""
      while (i < code.length && /[\d.xXa-fA-F]/.test(code[i])) {
        num += code[i++]
      }
      tokens.push({ type: "number", content: num })
      continue
    }

    // JSX tags
    if (code[i] === "<") {
      const nextChar = code[i + 1]
      if (nextChar === "/" || /[A-Za-z]/.test(nextChar)) {
        let tag = "<"
        i++
        if (code[i] === "/") {
          tag += code[i++]
        }
        // Tag name
        let tagName = ""
        while (i < code.length && /[A-Za-z0-9]/.test(code[i])) {
          tagName += code[i++]
        }
        tokens.push({ type: "punctuation", content: tag.slice(0, -tagName.length || undefined) })
        if (tagName) {
          tokens.push({ type: "tag", content: tagName })
        }
        continue
      }
    }

    // Operators
    if (/[+\-*/%=<>!&|^~?:]/.test(code[i])) {
      let op = ""
      while (i < code.length && /[+\-*/%=<>!&|^~?:]/.test(code[i])) {
        op += code[i++]
      }
      tokens.push({ type: "operator", content: op })
      continue
    }

    // Punctuation
    if (/[{}[\]();,.]/.test(code[i])) {
      tokens.push({ type: "punctuation", content: code[i++] })
      continue
    }

    // Identifiers and keywords
    if (/[A-Za-z_$]/.test(code[i])) {
      let word = ""
      while (i < code.length && /[A-Za-z0-9_$]/.test(code[i])) {
        word += code[i++]
      }

      if (JS_KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", content: word })
      } else if (code[i] === "(") {
        tokens.push({ type: "function", content: word })
      } else if (word[0] === word[0].toUpperCase() && /[a-z]/.test(word)) {
        tokens.push({ type: "tag", content: word })
      } else {
        tokens.push({ type: "variable", content: word })
      }
      continue
    }

    // Default: plain text
    tokens.push({ type: "plain", content: code[i++] })
  }

  return tokens
}

function tokenizeBash(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    // Whitespace
    if (/\s/.test(code[i])) {
      let ws = ""
      while (i < code.length && /\s/.test(code[i])) {
        ws += code[i++]
      }
      tokens.push({ type: "plain", content: ws })
      continue
    }

    // Comments
    if (code[i] === "#") {
      let comment = ""
      while (i < code.length && code[i] !== "\n") {
        comment += code[i++]
      }
      tokens.push({ type: "comment", content: comment })
      continue
    }

    // Strings
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i]
      let str = quote
      i++
      while (i < code.length && code[i] !== quote) {
        if (code[i] === "\\") str += code[i++]
        if (i < code.length) str += code[i++]
      }
      if (i < code.length) str += code[i++]
      tokens.push({ type: "string", content: str })
      continue
    }

    // Flags
    if (code[i] === "-") {
      let flag = ""
      while (i < code.length && /[A-Za-z0-9-]/.test(code[i])) {
        flag += code[i++]
      }
      tokens.push({ type: "operator", content: flag })
      continue
    }

    // Variables ($VAR)
    if (code[i] === "$") {
      let varName = "$"
      i++
      while (i < code.length && /[A-Za-z0-9_]/.test(code[i])) {
        varName += code[i++]
      }
      tokens.push({ type: "variable", content: varName })
      continue
    }

    // Words/commands
    if (/[A-Za-z@_]/.test(code[i])) {
      let word = ""
      while (i < code.length && /[A-Za-z0-9@_.\-/]/.test(code[i])) {
        word += code[i++]
      }

      if (BASH_KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", content: word })
      } else if (word.includes("/") || word.includes(".")) {
        tokens.push({ type: "string", content: word })
      } else {
        tokens.push({ type: "variable", content: word })
      }
      continue
    }

    // Default
    tokens.push({ type: "plain", content: code[i++] })
  }

  return tokens
}

function tokenizeJSON(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    if (/\s/.test(code[i])) {
      let ws = ""
      while (i < code.length && /\s/.test(code[i])) {
        ws += code[i++]
      }
      tokens.push({ type: "plain", content: ws })
      continue
    }

    // Strings (property names or values)
    if (code[i] === '"') {
      let str = '"'
      i++
      while (i < code.length && code[i] !== '"') {
        if (code[i] === "\\") str += code[i++]
        if (i < code.length) str += code[i++]
      }
      if (i < code.length) str += code[i++]

      // Check if it's a property name (followed by :)
      let j = i
      while (j < code.length && /\s/.test(code[j])) j++
      if (code[j] === ":") {
        tokens.push({ type: "property", content: str })
      } else {
        tokens.push({ type: "string", content: str })
      }
      continue
    }

    // Numbers
    if (/[\d-]/.test(code[i])) {
      let num = ""
      while (i < code.length && /[\d.eE+-]/.test(code[i])) {
        num += code[i++]
      }
      tokens.push({ type: "number", content: num })
      continue
    }

    // Keywords
    if (code.slice(i, i + 4) === "true" || code.slice(i, i + 5) === "false" || code.slice(i, i + 4) === "null") {
      const keyword = code.slice(i, i + 4) === "null" ? "null" : code.slice(i, i + 4) === "true" ? "true" : "false"
      tokens.push({ type: "keyword", content: keyword })
      i += keyword.length
      continue
    }

    // Punctuation
    if (/[{}[\]:,]/.test(code[i])) {
      tokens.push({ type: "punctuation", content: code[i++] })
      continue
    }

    tokens.push({ type: "plain", content: code[i++] })
  }

  return tokens
}

export function highlightSync(code: string, language: string): string {
  let tokens: Token[]

  const lang = language.toLowerCase()

  if (["js", "javascript", "ts", "typescript", "jsx", "tsx"].includes(lang)) {
    tokens = tokenizeJS(code)
  } else if (["bash", "sh", "shell", "zsh"].includes(lang)) {
    tokens = tokenizeBash(code)
  } else if (lang === "json") {
    tokens = tokenizeJSON(code)
  } else {
    // Default: no highlighting, just escape HTML
    return `<pre class="code-highlight"><code>${escapeHtml(code)}</code></pre>`
  }

  const highlighted = tokens
    .map((token) => `<span class="token-${token.type}">${escapeHtml(token.content)}</span>`)
    .join("")

  return `<pre class="code-highlight"><code>${highlighted}</code></pre>`
}
