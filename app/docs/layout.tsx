"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Search, Menu } from "lucide-react"
import { Footer } from "@/components/footer"

const navSections = [
  {
    title: "Welcome to x402",
    items: [
      { name: "Welcome", href: "/docs", external: false },
      { name: "x402 Landing Page", href: "/", external: false },
      { name: "Open Source Github Repository", href: "https://github.com/mertkaradayi/stellar-x402", external: true },
    ],
  },
  {
    title: "GETTING STARTED",
    items: [
      { name: "Installation & Usage", href: "/docs/getting-started", external: false },
    ],
  },
  {
    title: "CORE CONCEPTS",
    items: [
      { name: "x402 Stellar", href: "/docs/core-concepts/x402-stellar", external: false },
      { name: "x402 Stellar Client", href: "/docs/core-concepts/x402-stellar-client", external: false },
      { name: "x402 Stellar Fetch", href: "/docs/core-concepts/x402-stellar-fetch", external: false },
      { name: "x402 Stellar Express", href: "/docs/core-concepts/x402-stellar-express", external: false },
      { name: "Facilitator", href: "/docs/core-concepts/facilitator", external: false },
    ],
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/docs" className="flex items-center gap-2">
                <div className="relative w-32 h-10">
                  <Image
                    src="/logo.png"
                    alt="x402 Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
            
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex pt-16 max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] border-r border-gray-100 bg-white overflow-y-auto transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <nav className="p-6 space-y-8">
            {navSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={itemIndex}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black py-1.5 px-2 rounded-md hover:bg-gray-50 transition-colors group"
                          >
                            <span>{item.name}</span>
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-md transition-colors ${
                              isActive 
                                ? "text-black font-medium bg-gray-100" 
                                : "text-gray-600 hover:text-black hover:bg-gray-50"
                            }`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}

