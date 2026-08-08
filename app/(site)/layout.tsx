import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";


const Sitelayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-white">
      <Header />
      {children}
      <Footer />
    </main>
  )
}

export default Sitelayout
