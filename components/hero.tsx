"use client"

import { useEffect, useRef, useState } from "react"
import { Download, ChevronDown } from "lucide-react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Parallax glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-[2000ms] ease-out"
        style={{
          transform: `translate(calc(-50% + ${(mousePos.x - 0.5) * 30}px), calc(-50% + ${(mousePos.y - 0.5) * 30}px))`,
        }}
      >
        <div className="h-[700px] w-[700px] rounded-full bg-primary/[0.07] blur-[150px]" />
      </div>

      {/* Logo */}
      <div
        className={`relative mb-10 transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"
        }`}
      >
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-border/40 bg-card/60 backdrop-blur-2xl">
          <div className="relative h-10 w-10 rounded-xl bg-primary shadow-[0_0_40px_rgba(59,130,246,0.4)]">
            <div className="absolute inset-0 animate-ping rounded-xl bg-primary/30" />
          </div>

          <div
            className="absolute inset-[-12px] rounded-[28px] border border-primary/10"
            style={{ animation: "spin 20s linear infinite" }}
          >
            <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
          </div>

          <div
            className="absolute inset-[-1px] rounded-3xl bg-gradient-to-b from-primary/20 to-transparent opacity-60"
            style={{
              mask: "linear-gradient(black, transparent)",
              WebkitMask: "linear-gradient(black, transparent)",
            }}
          />
        </div>
      </div>

      {/* Badge */}
      <div
        className={`mb-8 transition-all duration-1000 delay-200 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 backdrop-blur-xl">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="text-xs font-medium tracking-wider text-primary/90">
            v10.3 AVAILABLE
          </span>
        </div>
      </div>

      {/* Title */}
      <h1
        className={`text-balance text-center text-6xl font-bold tracking-tighter transition-all duration-1000 delay-300 ease-out sm:text-7xl md:text-8xl lg:text-9xl ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/40 bg-clip-text text-transparent">
          AYICIK
        </span>
        <br />
        <span
          className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
          style={{ animation: "shimmer 3s linear infinite" }}
        >
          NEXUS
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-6 text-center text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground transition-all duration-1000 delay-500 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Ultra Minimal Media Engine
      </p>

      {/* Description */}
      <p
        className={`mt-6 max-w-md text-center text-lg font-light leading-relaxed text-foreground/50 transition-all duration-1000 delay-[600ms] ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Powerful. Elegant. Lightning Fast.
        <br />
        <span className="text-foreground/30">
          The definitive media engine for professionals.
        </span>
      </p>

      {/* 🔥 DIRECT DOWNLOAD BUTTON */}
      <div
        className={`mt-14 transition-all duration-1000 delay-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <a
          href="https://github.com/webwardenn/ay-c-knexus/releases/download/v10.3/AYICIK_NEXUS_v10.3_Setup.exe"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-primary-foreground shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-500 hover:shadow-[0_0_80px_rgba(59,130,246,0.5)] hover:scale-[1.02]"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <Download className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span className="relative">Download v10.3</span>
        </a>

        <p className="mt-4 text-center text-xs text-muted-foreground/40">
          Windows 10+ · Setup Installer · Free
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 flex flex-col items-center gap-3 transition-all duration-1000 delay-[900ms] ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/30">
          Explore
        </span>
        <ChevronDown
          className="h-4 w-4 text-muted-foreground/30"
          style={{ animation: "bounce 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  )
}
