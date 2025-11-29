export function LogoMarquee() {
  const logos = [
    { name: "Fireblocks", width: 120 },
    { name: "UNHCR", width: 100 },
    { name: "WisdomTree", width: 130 },
    { name: "PayPal USD", width: 120 },
    { name: "etherfuse", width: 100 },
    { name: "Bridge", width: 90 },
    { name: "MoneyGram", width: 130 },
    { name: "Circle", width: 90 },
  ]

  return (
    <section className="py-12 border-y border-border/50 bg-white overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 mx-8 sm:mx-12">
              <LogoPlaceholder name={logo.name} width={logo.width} />
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  )
}

function LogoPlaceholder({ name, width }: { name: string; width: number }) {
  return (
    <div
      className="h-10 flex items-center justify-center text-muted-foreground/60 font-medium text-sm tracking-wide"
      style={{ minWidth: width }}
    >
      {name}
    </div>
  )
}
