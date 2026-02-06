"use client"

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated glow orb 1 - top right */}
      <div className="absolute -top-32 -right-32 h-[500px] w-[500px] animate-pulse rounded-full bg-primary/[0.03] blur-[100px]" />

      {/* Animated glow orb 2 - bottom left */}
      <div
        className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/[0.04] blur-[100px]"
        style={{ animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
