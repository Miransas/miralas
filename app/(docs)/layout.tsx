import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DocsSidebar, MobileDocsNavigation } from "@/components/docs/docs-sidebar";
import { PageTransition } from "@/components/motion/page-transition";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#docs-content" className="sr-only z-[60] rounded-lg bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-3">Skip documentation navigation</a>
      <Header />
      <div data-docs-layout className="mx-auto w-full max-w-[1440px] px-5 pt-(--site-header-height) sm:px-6 lg:px-8">
        <div className="grid min-w-0 gap-8 md:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
          <aside className="sticky top-(--docs-anchor-offset) hidden max-h-[calc(100dvh-var(--docs-anchor-offset)-1.5rem)] self-start overflow-y-auto overscroll-contain py-2 [scrollbar-width:thin] md:block">
            <DocsSidebar />
          </aside>
          <main id="main-content" className="min-w-0 py-8 md:py-10">
            <MobileDocsNavigation />
            <PageTransition duration={0.18} skipHash>{children}</PageTransition>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
