"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

export function FAQSection() {
  return (
    <div className="space-y-8">
      <Accordion type="single" collapsible className="w-full">
        {/* General */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4">General</h3>
          <AccordionItem value="what-is-x402">
            <AccordionTrigger className="text-left">What is x402 in a single sentence?</AccordionTrigger>
            <AccordionContent>
              x402 is an open‑source protocol that turns the dormant HTTP 402 Payment Required status code into a fully‑featured, on‑chain payment layer for APIs, websites, and autonomous agents.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="is-cdp-product">
            <AccordionTrigger className="text-left">Is x402 a proprietary product?</AccordionTrigger>
            <AccordionContent>
              No. While Coinbase Developer Platform created the standard, it is an open protocol (Apache-2.0 license). You don't need any specific products to use it. This implementation (x402-stellar) is a community-driven adaptation for the Stellar network.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="why-not-traditional">
            <AccordionTrigger className="text-left">Why not use traditional payment rails or API keys?</AccordionTrigger>
            <AccordionContent>
              Traditional rails require credit‑card networks, user accounts, and multi‑step UI flows. x402 removes those dependencies, enabling programmatic, HTTP-native payments (perfect for AI agents) while dropping fees to near‑zero and settling in seconds on Stellar.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="crypto-native-only">
            <AccordionTrigger className="text-left">Is x402 only for crypto‑native projects?</AccordionTrigger>
            <AccordionContent>
              No. Any web API or content provider—crypto or web2—can integrate x402 if it wants a lower‑cost, friction‑free payment path for small or usage‑based transactions.
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Language & Framework Support */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4">Language & Framework Support</h3>
          <AccordionItem value="languages">
            <AccordionTrigger className="text-left">What languages and frameworks are supported?</AccordionTrigger>
            <AccordionContent>
              TypeScript (Node.js) and Python are reference implementations, but x402 is an open protocol. Nothing prevents you from implementing the spec in Go, Rust, or other languages supported by the Stellar SDK ecosystem.
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Facilitators */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4">Facilitators</h3>
          <AccordionItem value="who-runs-facilitators">
            <AccordionTrigger className="text-left">Who runs facilitators today?</AccordionTrigger>
            <AccordionContent>
              The protocol is permissionless—anyone can run a facilitator. This x402-stellar project provides open-source facilitator code so you can run your own for verifying Stellar payments. Expect community-run facilitators and private facilitators for enterprises to emerge over time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="malicious-facilitator">
            <AccordionTrigger className="text-left">What stops a malicious facilitator from stealing funds?</AccordionTrigger>
            <AccordionContent>
              Every payment payload is signed by the buyer and settles directly on‑chain. A facilitator that tampers with the transaction will fail signature checks, making it impossible to steal funds or lie about settlement.
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Pricing & Schemes */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4">Pricing & Schemes</h3>
          <AccordionItem value="pricing-endpoint">
            <AccordionTrigger className="text-left">How should I price my endpoint?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">There is no single answer, but common patterns are:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Flat per‑call (e.g., 0.001 USDC or 1 XLM per request)</li>
                <li>Tiered (/basic vs /pro endpoints with different prices)</li>
                <li>Up‑to (work in progress): "pay‑up‑to" where the final cost equals usage.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="usage-managers">
            <AccordionTrigger className="text-left">Can I integrate x402 with a usage manager?</AccordionTrigger>
            <AccordionContent>
              Yes. x402 handles the payment execution. You can still meter usage, aggregate calls, or issue prepaid credits in external systems and only charge when limits are exceeded.
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Assets, Networks & Fees */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4">Assets, Networks & Fees</h3>
          <AccordionItem value="assets-networks">
            <AccordionTrigger className="text-left">Which assets and networks are supported today?</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2">Network</th>
                      <th className="px-4 py-2">Asset</th>
                      <th className="px-4 py-2">Fees</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Stellar Mainnet</td>
                      <td className="px-4 py-2">XLM / USDC</td>
                      <td className="px-4 py-2">Standard Network Fees</td>
                      <td className="px-4 py-2 text-green-600">Live</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Stellar Testnet</td>
                      <td className="px-4 py-2">XLM / USDC</td>
                      <td className="px-4 py-2">Standard Network Fees</td>
                      <td className="px-4 py-2 text-green-600">Live</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Support for additional assets (Stellar Assets/Tokens) is configurable in your facilitator.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fiat-offramps">
            <AccordionTrigger className="text-left">Does x402 support fiat off‑ramps?</AccordionTrigger>
            <AccordionContent>
              Not natively in the protocol. However, Stellar has a rich ecosystem of anchors (like MoneyGram). You can easily move earned XLM/USDC to fiat using existing Stellar anchors and off-ramps.
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Security */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4">Security</h3>
          <AccordionItem value="private-key-exposure">
            <AccordionTrigger className="text-left">Do I have to expose my private key to my backend?</AccordionTrigger>
            <AccordionContent>
              <p>No. The recommended pattern is:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li><strong>Buyers (Clients):</strong> Sign locally in their runtime (browser via Freighter, serverless, or agent VM).</li>
                <li><strong>Sellers (Servers):</strong> Never hold the buyer's key; they only verify signatures/transactions.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="refunds">
            <AccordionTrigger className="text-left">How do refunds work?</AccordionTrigger>
            <AccordionContent>
              The current scheme is a push payment—irreversible once executed on the Stellar ledger. Refunds must be handled via business logic (Seller sending a payment back to the Buyer). Future specs may support conditional transfers (e.g., HTLCs).
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Usage by AI Agents */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4">Usage by AI Agents</h3>
          <AccordionItem value="agent-payment">
            <AccordionTrigger className="text-left">How does an agent know what to pay?</AccordionTrigger>
            <AccordionContent>
              <p>Agents follow the same flow as humans:</p>
              <ol className="list-decimal pl-4 mt-2 space-y-1">
                <li>Make a request.</li>
                <li>Parse the 402 JSON (accepts array).</li>
                <li>Choose a suitable requirement and sign a payload via the x402 client SDKs.</li>
                <li>Retry with X‑PAYMENT.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="agent-wallets">
            <AccordionTrigger className="text-left">Do agents need wallets?</AccordionTrigger>
            <AccordionContent>
              Yes. Programmatic wallets (using the Stellar SDK) let agents sign payloads without exposing seed phrases directly in user interfaces.
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Governance & Roadmap */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4">Governance & Roadmap</h3>
          <AccordionItem value="formal-spec">
            <AccordionTrigger className="text-left">Is there a formal spec or whitepaper?</AccordionTrigger>
            <AccordionContent>
              Yes, the x402 Specification is available on GitHub. While the protocol is chain-agnostic, this site focuses on the Stellar implementation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="evolution">
            <AccordionTrigger className="text-left">How will x402 evolve?</AccordionTrigger>
            <AccordionContent>
              Major themes include multi‑asset support, additional schemes (upto, stream), and a discovery layer for service search & reputation.
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Troubleshooting */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4">Troubleshooting</h3>
          <AccordionItem value="troubleshooting-402">
            <AccordionTrigger className="text-left">I keep getting 402 Payment Required, even after attaching X‑PAYMENT. Why?</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-4 space-y-1">
                <li>Signature is invalid (wrong network passphrase or payload fields).</li>
                <li>Payment amount is less than maxAmountRequired.</li>
                <li>Source account has insufficient balance.</li>
                <li>Check the error field in the server's JSON response for details.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="testnet-mainnet">
            <AccordionTrigger className="text-left">My test works on Testnet but fails on Mainnet—what changed?</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-4 space-y-1">
                <li>Ensure you set the correct network passphrase and Horizon URL.</li>
                <li>Confirm your wallet has Mainnet XLM/USDC.</li>
                <li>Mainnet requires real funds for rent and fees.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </div>

        {/* Still have questions */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-2">Still have questions?</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <Link href="https://github.com/mertcicekci0/x402StellarWebsite" className="text-blue-600 hover:underline">
                Open a GitHub Issue
              </Link>
            </li>
          </ul>
        </div>
      </Accordion>
    </div>
  )
}
