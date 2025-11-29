import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TerminalSection } from "@/components/terminal-section"
import { FeaturesSection } from "@/components/features-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <TerminalSection />
        <FeaturesSection />
        <UseCasesSection />
      </main>
      <Footer />
    </div>
  )
}
