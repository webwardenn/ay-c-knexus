"use client"

import { useEffect, useRef, useState } from "react"
import { Download, ArrowRight } from "lucide-react"

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="download" className="relative px-6 py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[800px] bg-primary/[0.04] blur-[150px]" />
      </div>

      <div
        ref={sectionRef}
        className="relative mx-auto max-w-3xl text-center"
      >
        <p
          className={`mb-6 text-xs font-medium tracking-[0.4em] uppercase text-primary transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Ready to start?
        </p>

        <h2
          className={`text-balance text-4xl font-bold tracking-tight text-foreground transition-all duration-700 delay-100 ease-out sm:text-5xl md:text-6xl ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Experience the
          <br />
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-[length:200%_auto] bg-clip-text text-transparent" style={{ animation: "shimmer 3s linear infinite" }}>
            difference
          </span>
        </h2>

        <p
          className={`mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-200 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Join hundreds of thousands of users who have already made the switch.
          Free. No ads. No compromises.
        </p>

        <div
          className={`mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-700 delay-300 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Primary CTA */}
          <a
            href="/AYICIK_NEXUS_v9.exe"
            download="AYICIK_NEXUS_v9.exe"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-primary-foreground shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-500 hover:shadow-[0_0_80px_rgba(59,130,246,0.5)] hover:scale-[1.02]"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Download className="relative h-4 w-4" />
            <span className="relative">Download for Windows</span>
          </a>

          {/* Secondary */}
          <a
            href="#features"
            className="group inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/30 px-8 py-4 text-sm font-medium tracking-wider text-muted-foreground transition-all duration-300 hover:border-border/60 hover:text-foreground"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
