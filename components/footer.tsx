export function Footer() {
  return (
    <footer className="relative border-t border-border/20 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        {/* Logo and brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/30 bg-card/40">
            <div className="h-3 w-3 rounded-sm bg-primary" />
          </div>
          <span className="text-sm font-semibold tracking-wider text-foreground/60">
            AYICIK NEXUS
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          {["Privacy", "Terms", "Changelog"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs tracking-wider text-muted-foreground/50 transition-colors duration-300 hover:text-muted-foreground"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground/30">
          {"© 2026 AYICIK NEXUS"}
        </p>
      </div>
    </footer>
  )
}
