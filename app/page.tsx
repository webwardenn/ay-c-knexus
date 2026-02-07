import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { CTASection } from "@/components/cta-section"
import { AnimatedBackground } from "@/components/animated-background"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <CTASection />
      <Footer />
    </main>
  )
}
