"use client"

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react"
import { Zap, Moon, FileVideo, Shield, Gauge, Layers } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Blazing Fast Engine",
    description:
      "Engineered for raw speed. Downloads complete in seconds, not minutes. Optimized pipeline that saturates your connection.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
  {
    icon: Moon,
    title: "Premium Dark UI",
    description:
      "A meticulously crafted interface designed for extended sessions. Zero eye strain, pure focus on your content.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    icon: FileVideo,
    title: "Multi-Format Support",
    description:
      "MP3, MP4, WEBM, M4A and more. Extract exactly what you need in the format you want, every single time.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "No tracking, no telemetry, no data collection. Your downloads remain yours and only yours.",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
    glowColor: "rgba(244, 63, 94, 0.15)",
  },
  {
    icon: Gauge,
    title: "Smart Queue",
    description:
      "Intelligent download queue with auto-retry, bandwidth throttling, and concurrent download management.",
    gradient: "from-cyan-500/20 to-sky-500/20",
    iconColor: "text-cyan-400",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description:
      "Paste entire playlists or channel URLs. Process hundreds of files with a single action.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 100)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({
      x: (y - 0.5) * -8,
      y: (x - 0.5) * 8,
    })
    setGlowPos({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlowPos({ x: 50, y: 50 })
  }

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative h-full overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-8 backdrop-blur-xl transition-all duration-300 ease-out hover:border-border/60"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic glow that follows cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${feature.glowColor}, transparent 60%)`,
          }}
        />

        {/* Top shine line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icon */}
        <div
          className={`relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border/30 bg-gradient-to-br ${feature.gradient} transition-transform duration-300 group-hover:scale-110`}
        >
          <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
        </div>

        {/* Content */}
        <h3 className="relative mb-3 text-lg font-semibold tracking-tight text-foreground">
          {feature.title}
        </h3>
        <p className="relative text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

export function Features() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHeaderVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.2 }
    )

    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="relative px-6 py-32">
      {/* Section divider glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2">
        <div className="h-px w-[600px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="mx-auto h-[200px] w-[400px] bg-primary/[0.03] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div ref={headerRef}>
          <p
            className={`mb-4 text-center text-xs font-medium tracking-[0.4em] uppercase text-primary transition-all duration-700 ease-out ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Features
          </p>
          <h2
            className={`text-balance text-center text-4xl font-bold tracking-tight text-foreground transition-all duration-700 delay-100 ease-out sm:text-5xl ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Built for{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              professionals
            </span>
          </h2>
          <p
            className={`mx-auto mt-4 max-w-lg text-center text-base text-muted-foreground transition-all duration-700 delay-200 ease-out ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Every detail obsessively refined. Every millisecond optimized.
          </p>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
