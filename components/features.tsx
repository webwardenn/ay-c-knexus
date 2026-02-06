"use client"

import { useEffect, useRef } from "react"
import { Zap, Moon, FileVideo } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Blazing Fast Engine",
    description:
      "Engineered for raw speed. Downloads complete in seconds, not minutes. Optimized pipeline that saturates your connection.",
  },
  {
    icon: Moon,
    title: "Premium Dark UI",
    description:
      "A meticulously crafted interface designed for extended sessions. Zero eye strain, pure focus on your content.",
  },
  {
    icon: FileVideo,
    title: "Multi-Format Support",
    description:
      "MP3, MP4, WEBM, M4A and more. Extract exactly what you need in the format you want, every single time.",
  },
]

export function Features() {
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
    <section ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="fade-up mb-4 text-center text-sm font-medium tracking-widest uppercase text-muted-foreground opacity-0 transition-all duration-700 ease-out translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
          Features
        </h2>
        <p className="fade-up text-balance text-center text-3xl font-bold tracking-tight text-foreground opacity-0 transition-all duration-700 delay-100 ease-out translate-y-8 sm:text-4xl [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
          Built for professionals
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`fade-up group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-xl opacity-0 transition-all duration-700 ease-out translate-y-8 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/80 hover:shadow-[0_0_60px_rgba(59,130,246,0.05)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              {/* Subtle top glow on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border/50 bg-secondary">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
