import { Rocket, Terminal, PenTool, Component } from "lucide-react"
import { HeroCard } from "@/components/docs/hero-card"
import { DecorativeBg } from "@/components/docs/decorative-bg"

const heroCards = [
  {
    title: "Quickstart",
    description: "Deploy your first docs site in minutes with our step-by-step guide",
    href: "/docs/quickstart",
    icon: Rocket,
  },
  {
    title: "CLI installation",
    description: "Install the CLI to preview and develop your docs locally",
    href: "/docs/cli",
    icon: Terminal,
  },
  {
    title: "Web editor",
    description: "Edit your documentation directly in the browser",
    href: "/docs/web-editor",
    icon: PenTool,
  },
  {
    title: "Components",
    description: "Explore our library of pre-built documentation components",
    href: "/docs/components",
    icon: Component,
  },
]

export default function DocsPage() {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)]">
      <DecorativeBg />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 lg:py-24 lg:pb-12">
        {/* Hero text - centered */}
        <h1 className="text-center text-4xl font-medium tracking-tight text-foreground">Documentation</h1>
        <p className="mx-auto mt-4 max-w-xl px-4 text-center text-lg text-muted-foreground">
          Meet the next generation of documentation. AI-native, beautiful out-of-the-box, and built for developers and
          teams.
        </p>

        {/* Hero cards grid */}
        <div className="mt-12 grid gap-x-6 gap-y-4 px-6 sm:grid-cols-2 lg:mt-24 lg:px-0">
          {heroCards.map((card) => (
            <HeroCard key={card.href} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}
