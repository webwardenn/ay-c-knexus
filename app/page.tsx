import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { AnimatedBackground } from "@/components/animated-background"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}
