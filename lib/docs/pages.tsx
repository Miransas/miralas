export interface DocPage {
  slug: string
  title: string
  description: string
  content: string
}

export const docPages: DocPage[] = [
  {
    slug: "quickstart",
    title: "Quickstart",
    description: "Get your documentation site up and running in under 5 minutes.",
    content: `## Step 1: Install the CLI

\`\`\`bash
npm install -g @docs/cli
\`\`\`

## Step 2: Initialize your project

\`\`\`bash
docs init my-docs
cd my-docs
\`\`\`

## Step 3: Start the development server

\`\`\`bash
docs dev
\`\`\`

Your documentation site is now running at \`http://localhost:3000\`.`,
  },
  {
    slug: "ai-native",
    title: "AI-Native",
    description: "Built from the ground up with AI capabilities.",
    content: `## AI-Powered Features

Our platform leverages AI to enhance your documentation experience.

### Smart Search

AI-powered search understands natural language queries and returns relevant results.

### Auto-completion

Get intelligent suggestions as you write your documentation.

### Content Generation

Use AI to help generate documentation from your code comments.

\`\`\`jsx
// AI can analyze this component and generate docs
function Button({ variant, children }) {
  return <button className={variant}>{children}</button>
}
\`\`\``,
  },
  {
    slug: "migration",
    title: "Migration Guide",
    description: "Migrate from other documentation platforms.",
    content: `## Migrating to Our Platform

Follow these steps to migrate your existing documentation.

### From Docusaurus

\`\`\`bash
docs migrate --from docusaurus --path ./docs
\`\`\`

### From GitBook

\`\`\`bash
docs migrate --from gitbook --path ./docs
\`\`\`

### From Notion

\`\`\`bash
docs migrate --from notion --workspace-id YOUR_WORKSPACE_ID
\`\`\`

## Post-Migration

After migration, review your content and update any broken links or formatting issues.`,
  },
  {
    slug: "global-settings",
    title: "Global Settings",
    description: "Configure your documentation site settings.",
    content: `## Configuration File

Create a \`docs.config.json\` file in your project root:

\`\`\`json
{
  "name": "My Documentation",
  "logo": "/logo.svg",
  "favicon": "/favicon.ico",
  "colors": {
    "primary": "#6366f1"
  }
}
\`\`\`

## Available Options

- **name** - Your documentation site name
- **logo** - Path to your logo file
- **favicon** - Path to your favicon
- **colors** - Theme color configuration`,
  },
  {
    slug: "navigation",
    title: "Navigation",
    description: "Configure your documentation navigation structure.",
    content: `## Navigation Configuration

Define your navigation in \`docs.config.json\`:

\`\`\`json
{
  "navigation": [
    {
      "group": "Getting Started",
      "pages": ["introduction", "quickstart"]
    },
    {
      "group": "Guides",
      "pages": ["setup", "deployment"]
    }
  ]
}
\`\`\`

## Nested Navigation

You can create nested navigation groups for complex documentation structures.`,
  },
  {
    slug: "pages",
    title: "Pages",
    description: "Learn how to create and organize documentation pages.",
    content: `## Creating Pages

Create markdown files in your \`docs\` directory:

\`\`\`bash
docs/
  introduction.mdx
  quickstart.mdx
  guides/
    setup.mdx
    deployment.mdx
\`\`\`

## Page Metadata

Add frontmatter to your pages:

\`\`\`markdown
---
title: "Page Title"
description: "Page description for SEO"
---

# Your Content Here
\`\`\``,
  },
  {
    slug: "hidden-pages",
    title: "Hidden Pages",
    description: "Create pages that are not shown in navigation.",
    content: `## Hiding Pages

Add \`hidden: true\` to your page frontmatter:

\`\`\`markdown
---
title: "Secret Page"
hidden: true
---
\`\`\`

Hidden pages are still accessible via direct URL but won't appear in the sidebar navigation.`,
  },
  {
    slug: "exclude-files",
    title: "Exclude Files",
    description: "Exclude files from your documentation build.",
    content: `## Excluding Files

Add patterns to \`docs.config.json\`:

\`\`\`json
{
  "exclude": [
    "drafts/**",
    "internal/**",
    "*.draft.mdx"
  ]
}
\`\`\`

Excluded files will not be processed or published.`,
  },
  {
    slug: "custom-domain",
    title: "Custom Domain",
    description: "Set up a custom domain for your documentation.",
    content: `## Adding a Custom Domain

1. Go to your dashboard settings
2. Enter your custom domain
3. Add the DNS records to your domain provider

### DNS Configuration

Add an A record pointing to:

\`\`\`
76.76.21.21
\`\`\`

Or a CNAME record:

\`\`\`
cname.docs.dev
\`\`\``,
  },
  {
    slug: "themes",
    title: "Themes",
    description: "Customize the look and feel of your documentation.",
    content: `## Theme Configuration

\`\`\`json
{
  "theme": {
    "colors": {
      "primary": "#6366f1",
      "background": "#ffffff"
    },
    "dark": {
      "primary": "#818cf8",
      "background": "#0a0a0a"
    }
  }
}
\`\`\`

## Built-in Themes

- **Default** - Clean, minimal design
- **Docs** - Traditional documentation style
- **Blog** - Content-focused layout`,
  },
  {
    slug: "fonts",
    title: "Fonts",
    description: "Configure custom fonts for your documentation.",
    content: `## Custom Fonts

Add fonts in your configuration:

\`\`\`json
{
  "fonts": {
    "heading": "Inter",
    "body": "Source Sans Pro",
    "code": "Fira Code"
  }
}
\`\`\`

We support all Google Fonts and custom font files.`,
  },
  {
    slug: "custom-scripts",
    title: "Custom Scripts",
    description: "Add custom JavaScript to your documentation.",
    content: `## Adding Scripts

Add scripts in your configuration:

\`\`\`json
{
  "scripts": [
    {
      "src": "https://analytics.example.com/script.js",
      "async": true
    }
  ]
}
\`\`\`

## Inline Scripts

For inline scripts, create a \`scripts.js\` file in your project root.`,
  },
  {
    slug: "react",
    title: "React",
    description: "Use React components in your documentation.",
    content: `## Custom Components

Create React components in your \`components\` directory:

\`\`\`jsx
// components/CustomButton.jsx
export function CustomButton({ children }) {
  return (
    <button className="custom-button">
      {children}
    </button>
  )
}
\`\`\`

Then use them in your MDX files:

\`\`\`mdx
import { CustomButton } from '../components/CustomButton'

<CustomButton>Click me!</CustomButton>
\`\`\``,
  },
  {
    slug: "dashboard-access",
    title: "Dashboard Access",
    description: "Manage team access to your documentation dashboard.",
    content: `## Team Management

Invite team members from the dashboard settings.

### Roles

- **Owner** - Full access to all settings
- **Admin** - Can manage content and settings
- **Editor** - Can edit content only
- **Viewer** - Read-only access`,
  },
  {
    slug: "custom-404",
    title: "Custom 404 Page",
    description: "Create a custom 404 error page.",
    content: `## Custom 404

Create a \`404.mdx\` file in your docs root:

\`\`\`mdx
---
title: "Page Not Found"
---

# 404 - Page Not Found

The page you're looking for doesn't exist.

[Go back home](/)
\`\`\``,
  },
  {
    slug: "web-editor",
    title: "Web Editor",
    description: "Edit your documentation directly in the browser.",
    content: `## Web Editor Features

- **Live Preview** - See changes as you type
- **Markdown Support** - Full markdown and MDX support
- **Collaboration** - Real-time collaboration with your team
- **Auto-save** - Never lose your work

Access the web editor from your dashboard or press \`E\` on any page.`,
  },
  {
    slug: "cli",
    title: "Install the CLI",
    description: "Install and use the command-line interface.",
    content: `## CLI Installation

\`\`\`bash
npm install -g @docs/cli
\`\`\`

## Commands

- \`docs init\` - Create a new project
- \`docs dev\` - Start development server
- \`docs build\` - Build for production
- \`docs deploy\` - Deploy to our cloud

## Configuration

Create a \`docs.config.json\` file in your project root to customize behavior.`,
  },
  {
    slug: "format-text",
    title: "Format Text",
    description: "Learn text formatting options in your documentation.",
    content: `## Text Formatting

### Bold and Italic

- **Bold text** - \`**bold**\`
- *Italic text* - \`*italic*\`
- ***Bold italic*** - \`***bold italic***\`

### Links

\`\`\`markdown
[Link text](https://example.com)
\`\`\`

### Lists

\`\`\`markdown
- Item 1
- Item 2
  - Nested item

1. First
2. Second
3. Third
\`\`\``,
  },
  {
    slug: "format-code",
    title: "Format Code",
    description: "Display code snippets with syntax highlighting.",
    content: `## Code Blocks

Use triple backticks with a language identifier:

\`\`\`javascript
function hello() {
  console.log("Hello, world!")
}
\`\`\`

## Supported Languages

We support 100+ programming languages including:

- JavaScript / TypeScript
- Python
- Go
- Rust
- And many more...

## Inline Code

Use single backticks for inline code: \`const x = 1\``,
  },
  {
    slug: "components",
    title: "Built-in Components",
    description: "Our platform provides a rich set of components to enhance your documentation.",
    content: `## Callouts

\`\`\`jsx
<Callout type="info">
  This is an informational callout.
</Callout>
\`\`\`

## Cards

\`\`\`jsx
<Card title="Getting Started" href="/docs/quickstart">
  Learn how to get started with our platform.
</Card>
\`\`\`

## Tabs

\`\`\`jsx
<Tabs>
  <Tab title="npm">npm install package</Tab>
  <Tab title="yarn">yarn add package</Tab>
</Tabs>
\`\`\``,
  },
]

export function getDocPage(slug: string): DocPage | undefined {
  return docPages.find((page) => page.slug === slug)
}
