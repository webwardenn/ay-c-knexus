"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
      setVisible(currentScrollY < lastScrollY || currentScrollY < 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-500 ${
              scrolled
                ? "border-border/60 bg-card/80 backdrop-blur-xl"
                : "border-border/30 bg-card/40"
            }`}
          >
            <div className="h-3.5 w-3.5 rounded-sm bg-primary" />
            <div className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </div>
          <span className="text-sm font-semibold tracking-wider text-foreground">
            AYICIK NEXUS
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {["Features", "Performance", "Download"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-xs font-medium tracking-wider uppercase text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/AYICIK_NEXUS_v9.exe"
          download="AYICIK_NEXUS_v9.exe"
          className={`group flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium tracking-wider text-foreground transition-all duration-300 ${
            scrolled
              ? "border-primary/40 bg-primary/10 backdrop-blur-xl hover:bg-primary/20"
              : "border-border/40 bg-card/30 hover:border-primary/40 hover:bg-primary/10"
          }`}
        >
          <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>

      {/* Bottom border gradient */}
      <div
        className={`h-px bg-gradient-to-r from-transparent via-border/50 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </nav>
  )
}
