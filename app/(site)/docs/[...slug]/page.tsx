import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getDocPage, docPages } from "@/lib/docs/pages"
import { DocContent } from "@/components/docs/doc-content"

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params
  const slugPath = slug.join("/")
  const page = getDocPage(slugPath)

  if (!page) {
    return {
      title: "Not Found",
      description: "The page you're looking for doesn't exist.",
    }
  }

  return {
    title: `${page.title} | Documentation`,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
    },
  }
}

export async function generateStaticParams() {
  return docPages
    .filter((page) => page.slug !== "")
    .map((page) => ({
      slug: page.slug.split("/"),
    }))
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params
  const slugPath = slug.join("/")
  const page = getDocPage(slugPath)

  if (!page) {
    notFound()
  }

  return <DocContent title={page.title} description={page.description} content={page.content} slug={slugPath} />
}
