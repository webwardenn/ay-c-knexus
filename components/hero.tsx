"use client"

import { useEffect, useRef } from "react"
import { Download } from "lucide-react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        }
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".fade-up")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Radial glow behind logo */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Logo */}
      <div className="fade-up relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-card opacity-0 transition-all duration-700 ease-out translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        <div className="h-8 w-8 rounded-lg bg-primary" />
      </div>

      {/* Title */}
      <h1 className="fade-up text-balance text-center text-5xl font-bold tracking-tight text-foreground opacity-0 transition-all duration-700 delay-100 ease-out translate-y-8 sm:text-6xl md:text-7xl [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        AYICIK NEXUS
      </h1>

      {/* Subtitle */}
      <p className="fade-up mt-4 text-center text-lg font-medium tracking-widest uppercase text-muted-foreground opacity-0 transition-all duration-700 delay-200 ease-out translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        Ultra Minimal Media Engine
      </p>

      {/* Description */}
      <p className="fade-up mt-6 text-center text-xl font-light text-foreground/70 opacity-0 transition-all duration-700 delay-300 ease-out translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        Powerful. Elegant. Lightning Fast.
      </p>

      {/* Download Button */}
      <a
        href="/AYICIK_NEXUS_v9.exe"
        download="https://github.com/webwardenn/ay-c-knexus/releases/download/v1.0/AYICIK_NEXUS_v9.exe"
        className="fade-up group relative mt-12 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground opacity-0 transition-all duration-700 delay-[400ms] ease-out translate-y-8 hover:border-primary/60 hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      >
        <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        Download Now
        <span className="absolute inset-0 rounded-full bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </a>

      {/* Scroll indicator */}
      <div className="fade-up absolute bottom-12 flex flex-col items-center gap-2 opacity-0 transition-all duration-700 delay-[600ms] ease-out translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
        <span className="text-xs tracking-widest uppercase text-muted-foreground/50">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/30 to-transparent" />
      </div>
    </section>
  )
}
