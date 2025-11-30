"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Copy, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const tocItems = [
  { id: "what-is-x402", title: "What is x402?" },
  { id: "stellar-difference", title: "Stellar x402 Difference" },
  { id: "key-features", title: "Key Features" },
  { id: "comparison", title: "Comparison" },
  { id: "network-support", title: "Network Support" },
  { id: "packages", title: "Packages" },
  { id: "roadmap", title: "Roadmap" },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          return {
            id: item.id,
            element,
            top: element.getBoundingClientRect().top,
          }
        }
        return null
      }).filter(Boolean) as Array<{ id: string; element: HTMLElement; top: number }>

      const current = sections.find((section) => section.top <= 100 && section.top >= -200)
      if (current) {
        setActiveSection(current.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-w-0 flex-1">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-black">Stellar x402 Ecosystem</h1>
          </div>
          <div className="space-y-4 text-lg text-gray-600">
            <blockquote className="border-l-4 border-gray-200 pl-4 italic">
              Complete Stellar implementation of the x402 payment protocol.
            </blockquote>
            <blockquote className="border-l-4 border-gray-200 pl-4 italic">
              "1 line of code to accept digital dollars on Stellar. No fees, 2-second settlement, $0.001 minimum payment."
            </blockquote>
          </div>
          <div className="flex gap-2 mt-6">
            <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
            <img src="https://img.shields.io/badge/Node.js-18%2B-green.svg" alt="Node.js" />
          </div>
        </div>

        {/* What is x402? */}
        <section id="what-is-x402" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">What is x402?</h2>
          <p className="text-gray-600 mb-6">
            The <a href="https://github.com/coinbase/x402" className="text-blue-600 hover:underline">x402 payment protocol</a> is an open standard for internet-native payments that leverages the existing <code>402 Payment Required</code> HTTP status code. It enables:
          </p>
          <ul className="space-y-3 list-none">
            {[
              { title: "Chain-agnostic payments", desc: "Works across different blockchains" },
              { title: "Gasless for clients", desc: "Facilitators can sponsor transaction fees" },
              { title: "Minimal integration", desc: "1 line for servers, 1 function for clients" },
              { title: "Low minimums", desc: "Support for micropayments ($0.001+)" },
              { title: "Fast settlement", desc: "2-5 second confirmation times" },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 text-black">•</div>
                <span className="text-gray-600">
                  <strong className="text-black">{item.title}</strong> - {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* What Makes Stellar x402 Different? */}
        <section id="stellar-difference" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">What Makes Stellar x402 Different?</h2>
          <p className="text-gray-600 mb-8">
            This implementation brings x402 to the <strong>Stellar network</strong>, offering unique advantages:
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                🚀 Ultra-Fast Settlement
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>2-5 second confirmation</strong> - Near-instant finality</li>
                <li>• <strong>Ledger-based expiry</strong> - More precise than timestamps</li>
                <li>• <strong>No gas wars</strong> - Fixed, predictable fees</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                💰 True Gasless Payments
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Fee sponsorship</strong> - Via fee-bump transactions</li>
                <li>• <strong>Trust-minimized</strong> - Client signatures preserved</li>
                <li>• <strong>Flexible</strong> - Works with or without sponsorship</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                🔐 Native Stellar Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>XDR format</strong> - Native transaction serialization</li>
                <li>• <strong>Replay protection</strong> - Protocol-level sequence numbers</li>
                <li>• <strong>Native XLM</strong> - No token contracts needed</li>
                <li>• <strong>Soroban ready</strong> - Support for smart contracts</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                🌐 Browser-First
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Freighter integration</strong> - Seamless signing</li>
                <li>• <strong>Beautiful UI</strong> - Pre-built paywalls</li>
                <li>• <strong>No RPC needed</strong> - Client-side simplicity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="key-features" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-bold text-black mb-2">🔒 Security</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Trust-minimized architecture</li>
                <li>• Redis-backed replay protection</li>
                <li>• Idempotency & caching</li>
                <li>• Full Zod validation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">⚡ Performance</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• 2-5 second settlement</li>
                <li>• Optional fee sponsorship</li>
                <li>• Efficient verification</li>
                <li>• Response buffering</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">🎨 Experience</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• TypeScript first</li>
                <li>• Modular packages</li>
                <li>• Pre-built paywall UI</li>
                <li>• Comprehensive examples</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">🌍 Ecosystem</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Freighter wallet integration</li>
                <li>• Express middleware</li>
                <li>• Fetch wrapper</li>
                <li>• Discovery API</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section id="comparison" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">Comparison with Other x402 Implementations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EVM (Coinbase)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stellar (Ours)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { feature: "Transaction Format", evm: "Signature-based", stellar: "XDR (signed transaction)" },
                  { feature: "Fee Sponsorship", evm: "Meta-transactions", stellar: "Fee-bump transactions" },
                  { feature: "Settlement Time", evm: "~12 seconds", stellar: "2-5 seconds" },
                  { feature: "Expiry Mechanism", evm: "Timestamp (validBefore)", stellar: "Ledger sequence" },
                  { feature: "Native Asset", evm: "Requires ERC-20", stellar: "Native XLM" },
                  { feature: "Replay Protection", evm: "Nonce-based", stellar: "Sequence numbers" },
                  { feature: "Browser Wallet", evm: "MetaMask", stellar: "Freighter" },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.evm}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">{row.stellar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Network Support */}
        <section id="network-support" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">Network Support</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="text-green-500 h-5 w-5" />
              <span><strong>Stellar Testnet</strong> (<code>stellar-testnet</code>)</span>
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <span className="text-yellow-500">🚧</span>
              <span><strong>Stellar Mainnet</strong> (<code>stellar-mainnet</code>) - Coming soon</span>
            </li>
          </ul>
        </section>

        {/* Packages */}
        <section id="packages" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">Packages</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Use Case</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: "x402-stellar", desc: "Core library with types, schemas, and facilitator client", use: "Building custom integrations" },
                  { name: "x402-stellar-client", desc: "Client SDK for signing payments (Keypair + Freighter)", use: "Client applications" },
                  { name: "x402-stellar-fetch", desc: "Fetch wrapper that auto-pays 402 responses", use: "Simple client integrations" },
                  { name: "x402-stellar-express", desc: "Express middleware for protecting routes", use: "Node.js/Express servers" },
                  { name: "facilitator", desc: "Stellar x402 facilitator server", use: "Payment verification & settlement" },
                ].map((pkg, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 font-mono">{pkg.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pkg.desc}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">Roadmap</h2>
          <p className="text-gray-600 mb-4">
            See <a href="https://github.com/mertkaradayi/stellar-x402/blob/main/ROADMAP.md" className="text-blue-600 hover:underline">ROADMAP.md</a> for our development plans.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
             <h3 className="font-bold text-black mb-2">Upcoming</h3>
             <ul className="list-disc list-inside text-gray-600 space-y-1">
               <li>Mainnet support</li>
               <li>Additional client SDKs</li>
               <li>More example integrations</li>
             </ul>
          </div>
        </section>

        {/* Contributing & License */}
        <section className="mb-16">
           <h2 className="text-2xl font-bold text-black mb-4">Contributing & License</h2>
           <p className="text-gray-600 mb-4">
             Contributions are welcome! This project is open source under the <strong>MIT License</strong>.
           </p>
           <p className="text-gray-600">
             Built with ❤️ for the Stellar ecosystem.
           </p>
        </section>

      </article>

      {/* Right Sidebar - On This Page */}
      <aside className="hidden xl:block w-64 flex-shrink-0 border-l border-gray-100 bg-white sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">On this page</h3>
          <nav className="space-y-2">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors ${
                  activeSection === item.id
                    ? "text-black font-medium bg-gray-100"
                    : "text-gray-500 hover:text-black hover:bg-gray-50"
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}
