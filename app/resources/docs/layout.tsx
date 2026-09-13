import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  );
}