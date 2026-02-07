"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 500, suffix: "K+", label: "Downloads" },
  { value: 99, suffix: "%", label: "Uptime" },
  { value: 4.9, suffix: "/5", label: "User Rating", decimal: true },
  { value: 50, suffix: "+", label: "Formats Supported" },
]

function AnimatedNumber({
  value,
  suffix,
  decimal = false,
  isVisible,
}: {
  value: number
  suffix: string
  decimal?: boolean
  isVisible: boolean
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      start = eased * value
      setCurrent(start)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value])

  return (
    <span className="tabular-nums">
      {decimal ? current.toFixed(1) : Math.floor(current)}
      {suffix}
    </span>
  )
}

export function Stats() {
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
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="performance" className="relative px-6 py-24">
      <div ref={sectionRef} className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative text-center transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  decimal={stat.decimal}
                  isVisible={isVisible}
                />
              </div>
              <p className="mt-2 text-sm tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              {/* Subtle separator */}
              {i < stats.length - 1 && (
                <div className="pointer-events-none absolute top-1/2 right-0 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-border/40 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
