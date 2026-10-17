import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mx-auto flex w-full max-w-[1400px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border px-4 md:block">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 flex-1 px-6 py-8 md:px-12 md:py-10">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}