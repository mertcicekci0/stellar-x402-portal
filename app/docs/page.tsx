"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

const tocItems = [
  { id: "why-use-x402", title: "Why Use x402?" },
  { id: "who-is-x402-for", title: "Who is x402 for?" },
  { id: "what-can-you-build", title: "What Can You Build?" },
  { id: "how-does-it-work", title: "How Does It Work?" },
  { id: "roadmap", title: "Roadmap" },
  { id: "get-started", title: "Get Started" },
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
            <h1 className="text-4xl sm:text-5xl font-bold text-black">Welcome to x402</h1>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-black">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12 text-gray-600">
          <p className="leading-relaxed mb-6">
            This guide will help you understand x402, the open payment standard, and help you get started building or integrating services with x402.
          </p>
          <p className="leading-relaxed mb-6">
            x402 is the <strong className="text-black">open payment standard</strong> that enables services to charge for access to their APIs and content directly over HTTP. It is built around the{" "}
            <code className="px-2 py-1 rounded bg-gray-100 text-black font-mono text-sm border border-gray-200">
              HTTP 402 Payment Required
            </code>{" "}
            status code and allows clients to programmatically pay for resources without accounts, sessions, or credential management.
          </p>
          <p className="leading-relaxed mb-6">
            With x402, any web service can require payment before serving a response, using crypto-native payments for speed, privacy, and efficiency.
          </p>
        </div>

        {/* Contribution Note */}
        <div className="mb-12 p-4 rounded-lg border border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">
            <strong className="text-black">Want to contribute to our docs?</strong> The{" "}
            <a href="https://github.com/mertkaradayi/stellar-x402" target="_blank" rel="noopener noreferrer" className="text-black hover:underline inline-flex items-center gap-1">
              Open Source Github Repository
              <ExternalLink className="h-3 w-3" />
            </a>{" "}
            is open to PRs! Our only ask is that you keep these docs as a neutral resource, with no branded content other than linking out to other resources where appropriate.
          </p>
        </div>

        {/* Note about docs */}
        <div className="mb-12 p-4 rounded-lg border border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            <strong className="text-black">Note about the docs:</strong> These docs are the credibly neutral source of truth for x402, as x402 is a completely open standard under the Apache-2.0 license. Coinbase Developer Platform is currently sponsoring{" "}
            <a href="https://x402.gitbook.io/x402" target="_blank" rel="noopener noreferrer" className="text-black hover:underline inline-flex items-center gap-1">
              AI-powered docs for users here
              <ExternalLink className="h-3 w-3" />
            </a>
            , as we migrate to our own AI-powered solution on the main x402.org domain.
          </p>
        </div>

        {/* Why Use x402 */}
        <section id="why-use-x402" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">Why Use x402?</h2>
          <p className="text-gray-600 mb-6">
            x402 addresses key limitations of existing payment systems:
          </p>
          <ul className="space-y-3 list-none">
            <li className="flex items-start gap-3">
              <span className="text-black mt-1">•</span>
              <span className="text-gray-600">High fees and friction with traditional credit cards and fiat payment processors</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black mt-1">•</span>
              <span className="text-gray-600">Incompatibility with machine-to-machine payments, such as AI agents</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black mt-1">•</span>
              <span className="text-gray-600">Lack of support for micropayments, making it difficult to monetize usage-based services</span>
            </li>
          </ul>
        </section>

        {/* Who is x402 for */}
        <section id="who-is-x402-for" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">Who is x402 for?</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <div>
              <h3 className="font-semibold text-black mb-2">Sellers</h3>
              <p className="text-sm text-gray-600">
                Service providers who want to monetize their APIs or content. x402 enables direct, programmatic payments from clients with minimal setup.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">Buyers</h3>
              <p className="text-sm text-gray-600">
                Human developers and AI agents seeking to access paid services without accounts or manual payment flows.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Both sellers and buyers interact directly through HTTP requests, with payment handled transparently through the protocol.
          </p>
        </section>

        {/* What Can You Build */}
        <section id="what-can-you-build" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">What Can You Build?</h2>
          <p className="text-gray-600 mb-6">
            x402 enables a range of use cases, including:
          </p>
          <ul className="space-y-3 list-none">
            {[
              "API services paid per request",
              "AI agents that autonomously pay for API access",
              "Paywalls for digital content",
              "Microservices and tooling monetized via microtransactions",
              "Proxy services that aggregate and resell API capabilities",
            ].map((useCase, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-black mt-1">•</span>
                <span className="text-gray-600">{useCase}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How Does It Work */}
        <section id="how-does-it-work" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">How Does It Work?</h2>
          <p className="text-gray-600 mb-6">
            At a high level, the flow is simple:
          </p>
          <ol className="space-y-4 list-decimal list-inside">
            {[
              "A buyer requests a resource from a server.",
              "If payment is required, the server responds with HTTP 402 Payment Required, including payment instructions.",
              "The buyer prepares and submits a payment payload.",
              "The server verifies and settles the payment using an x402 facilitator's /verify and /settle endpoints.",
              "If payment is valid, the server provides the requested resource.",
            ].map((step, index) => (
              <li key={index} className="text-gray-600 pl-2">
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">Roadmap</h2>
          <p className="text-gray-600 mb-6">
            x402 is designed as an open standard, and we're excited to build x402 alongside our community. Some items in the roadmap we're excited about include:
          </p>
          <ul className="space-y-3 list-none">
            {[
              "Solutions guides and templates for proxy servers and tools to make an x402 integration as easy as possible",
              "`exact` scheme support on Solana (SVM)",
              "`upto` scheme EVM & SVM",
              "easier semantics for arbitrary tokens using permit as an alt method to `transferWithAuthorization` (likely via `permit` and an up to scheme)",
              "Arbitrary token support",
              "Production-ready marketplace and reputation system for x402-compatible endpoints",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-black mt-1">•</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 mt-6">
            The goal is to make programmatic commerce accessible, permissionless, and developer-friendly.
          </p>
        </section>

        {/* Get Started */}
        <section id="get-started" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-black mb-6">Get Started</h2>
          <p className="text-gray-600 mb-6">
            Ready to build? Start here:
          </p>
          <ul className="space-y-2 list-none mb-6">
            <li>
              <a
                href="/docs/getting-started/sellers"
                className="text-black hover:underline inline-flex items-center gap-1"
              >
                Quickstart for Sellers
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="/docs/getting-started/buyers"
                className="text-black hover:underline inline-flex items-center gap-1"
              >
                Quickstart for Buyers
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="/docs/core-concepts/http-402"
                className="text-black hover:underline inline-flex items-center gap-1"
              >
                Explore Core Concepts
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/x402"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline inline-flex items-center gap-1"
              >
                Join our community on Discord
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
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
