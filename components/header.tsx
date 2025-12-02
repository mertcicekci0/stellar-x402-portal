"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Github } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/", active: true },
  { name: "About", href: "#about", active: false },
  { name: "Use Cases", href: "#use-cases", active: false },
  { name: "Community", href: "#community", active: false },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-3xl">
      <div className="bg-white/80 backdrop-blur-xl rounded-full border border-black shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-32 h-12">
              <Image
                src="/logo.png"
                alt="@402-stellar"
                fill
                className="object-contain scale-125"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-black/5 rounded-full p-1 border border-black/5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  link.active
                    ? "text-[#d4a853] bg-[#d4a853]/10"
                    : "text-gray-600 hover:text-black hover:bg-black/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side - GitHub */}
          <div className="hidden md:flex items-center relative group">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
              <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>GitHub</span>
            </button>
            
            {/* GitHub Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl border border-black/5 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="p-1">
                <Link
                  href="https://github.com/mertkaradayi/stellar-x402"
                  target="_blank"
                  className="flex flex-col px-4 py-2.5 rounded-lg hover:bg-black/5 transition-colors text-left"
                >
                  <span className="text-sm font-medium text-black">x402 Protocol</span>
                  <span className="text-xs text-gray-500">Core protocol & SDKs</span>
                </Link>
                <Link
                  href="https://github.com/mertcicekci0/stellar-x402-portal"
                  target="_blank"
                  className="flex flex-col px-4 py-2.5 rounded-lg hover:bg-black/5 transition-colors text-left"
                >
                  <span className="text-sm font-medium text-black">x402 Portal</span>
                  <span className="text-xs text-gray-500">Website source code</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-1 text-black hover:bg-black/5 rounded-full transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu (Floating below) */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 px-2">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-black/5 p-4 space-y-2 shadow-2xl transform origin-top animate-in fade-in slide-in-from-top-5 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  link.active
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                    : "text-gray-600 hover:text-black hover:bg-black/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-black/5 mt-2 space-y-1">
              <Link
                href="https://github.com/mertkaradayi/stellar-x402"
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
              >
                <Github className="w-5 h-5" />
                <div>
                  <span className="block">x402 Protocol</span>
                  <span className="text-xs text-gray-400 font-normal">Core protocol & SDKs</span>
                </div>
              </Link>
              <Link
                href="https://github.com/mertcicekci0/stellar-x402-portal"
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
              >
                <Github className="w-5 h-5" />
                <div>
                  <span className="block">x402 Portal</span>
                  <span className="text-xs text-gray-400 font-normal">Website source code</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
 
