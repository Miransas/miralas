import { TopBar } from '@/components/docs/top-bar';
import { Sidebar } from '@/components/docs/docs-sidebar';
import { Header } from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <div className="min-h-screen bg-background pt-14 dark:bg-black bg-background">

        <div className="mx-auto flex w-full max-w-[1400px]">
          {/* Left sidebar */}
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-white/5 px-4 md:block">
            <Sidebar />
          </aside>

          {/* Main content area */}
          <div className="min-w-0 flex-1 px-6 py-8 md:px-12 md:py-10">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
