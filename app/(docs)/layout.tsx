import Header from "@/components/layout/Header";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import Footer from "../../components/layout/Footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mx-auto flex w-full max-w-[1400px] pt-14">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-white/10 px-4 md:block">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 p-1 mx-auto flex-1">{children}</main>
      </div>
      <Footer/>
    </>
  );
}