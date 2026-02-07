"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  baseOpacity: number
  pulseSpeed: number
  pulseOffset: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 12000), 120)
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: 0,
        baseOpacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }
    particlesRef.current = particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initParticles(window.innerWidth, window.innerHeight)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      timeRef.current += 1
      const w = window.innerWidth
      const h = window.innerHeight
      const mouse = mouseRef.current
      const particles = particlesRef.current

      ctx.clearRect(0, 0, w, h)

      // Aurora gradient blobs
      const t = timeRef.current * 0.003
      const auroraX1 = w * 0.3 + Math.sin(t) * w * 0.15
      const auroraY1 = h * 0.2 + Math.cos(t * 0.7) * h * 0.1
      const auroraX2 = w * 0.7 + Math.cos(t * 0.5) * w * 0.15
      const auroraY2 = h * 0.6 + Math.sin(t * 0.8) * h * 0.1
      const auroraX3 = w * 0.5 + Math.sin(t * 0.3) * w * 0.2
      const auroraY3 = h * 0.4 + Math.cos(t * 0.6) * h * 0.15

      // Aurora 1 - electric blue
      const g1 = ctx.createRadialGradient(auroraX1, auroraY1, 0, auroraX1, auroraY1, w * 0.4)
      g1.addColorStop(0, "rgba(59, 130, 246, 0.06)")
      g1.addColorStop(0.5, "rgba(59, 130, 246, 0.02)")
      g1.addColorStop(1, "transparent")
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      // Aurora 2 - cyan
      const g2 = ctx.createRadialGradient(auroraX2, auroraY2, 0, auroraX2, auroraY2, w * 0.35)
      g2.addColorStop(0, "rgba(6, 182, 212, 0.04)")
      g2.addColorStop(0.5, "rgba(6, 182, 212, 0.015)")
      g2.addColorStop(1, "transparent")
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      // Aurora 3 - indigo
      const g3 = ctx.createRadialGradient(auroraX3, auroraY3, 0, auroraX3, auroraY3, w * 0.3)
      g3.addColorStop(0, "rgba(99, 102, 241, 0.04)")
      g3.addColorStop(0.5, "rgba(99, 102, 241, 0.01)")
      g3.addColorStop(1, "transparent")
      ctx.fillStyle = g3
      ctx.fillRect(0, 0, w, h)

      // Mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250)
        mg.addColorStop(0, "rgba(59, 130, 246, 0.08)")
        mg.addColorStop(0.5, "rgba(59, 130, 246, 0.03)")
        mg.addColorStop(1, "transparent")
        ctx.fillStyle = mg
        ctx.fillRect(0, 0, w, h)
      }

      // Update and draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Mouse attraction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.008
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Damping
        p.vx *= 0.998
        p.vy *= 0.998

        // Pulse opacity
        p.opacity = p.baseOpacity + Math.sin(timeRef.current * p.pulseSpeed + p.pulseOffset) * 0.15

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 140

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Mouse connection lines
      if (mouse.x > 0 && mouse.y > 0) {
        for (const p of particles) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.2
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [initParticles])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      />
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />
      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 4%) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  )
}
