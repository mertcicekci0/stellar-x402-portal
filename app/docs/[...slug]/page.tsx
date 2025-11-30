import { notFound } from "next/navigation"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism"
import { FAQSection } from "@/components/faq-section"

const docsContent: Record<string, { title: string; content: React.ReactNode }> = {
  "faq": {
    title: "Frequently Asked Questions",
    content: <FAQSection />,
  },
  "getting-started": {
    title: "Getting Started",
    content: (
      <div className="space-y-8">
        <p className="text-lg text-gray-600">
          Get up and running with Stellar x402 in minutes. Whether you're building a wallet, dApp, or monetizing an API, we have you covered.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">For Wallet/dApp Developers (Pay for APIs)</h2>
          <div className="space-y-4">
            <p className="text-gray-600">Install the fetch wrapper to automatically handle payments:</p>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter language="bash" style={prism}>
                {`npm install x402-stellar-fetch @stellar/stellar-sdk`}
              </SyntaxHighlighter>
            </div>

            <h3 className="text-xl font-semibold text-black mt-6 mb-2">With Keypair (Backend/Scripts)</h3>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter language="typescript" style={prism}>
                {`import { wrapFetchWithPayment, createKeypairSigner } from "x402-stellar-fetch";
import { Keypair } from "@stellar/stellar-sdk";

const keypair = Keypair.fromSecret("SXXX...");
const signer = createKeypairSigner(keypair);
const fetchWithPay = wrapFetchWithPayment(fetch, signer);

// Automatically handles 402 Payment Required responses
const response = await fetchWithPay("https://api.example.com/premium");
const data = await response.json();`}
              </SyntaxHighlighter>
            </div>

            <h3 className="text-xl font-semibold text-black mt-6 mb-2">With Freighter (Browser)</h3>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter language="typescript" style={prism}>
                {`import { wrapFetchWithPayment, createFreighterSigner } from "x402-stellar-fetch";

const signer = createFreighterSigner();
const fetchWithPay = wrapFetchWithPayment(fetch, signer);

// Freighter will prompt user to approve payment
const response = await fetchWithPay("https://api.example.com/premium");`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">For API Developers (Charge for APIs)</h2>
          <div className="space-y-4">
            <p className="text-gray-600">Install the Express middleware to monetize your routes:</p>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter language="bash" style={prism}>
                {`npm install x402-stellar-express express`}
              </SyntaxHighlighter>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter language="typescript" style={prism}>
                {`import express from "express";
import { paymentMiddleware } from "x402-stellar-express";

const app = express();

// Protect routes with payments - that's it!
app.use(paymentMiddleware({
  payTo: "GXXXX...",  // Your Stellar address to receive payments
  routes: {
    "/api/premium/*": { price: "1.00" }  // 1 XLM
  },
  facilitator: { url: "http://localhost:4022" },
  // Optional: Enable browser-friendly paywall UI
  paywall: { appName: "My API" },
}));

app.get("/api/premium/data", (req, res) => {
  res.json({ premium: "content" });
});

app.listen(3000);`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Architecture</h2>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
{`┌─────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   CLIENT    │         │ RESOURCE SERVER │         │   FACILITATOR   │
│  (Wallet)   │         │   (API Owner)   │         │                 │
└──────┬──────┘         └────────┬────────┘         └────────┬────────┘
       │                         │                           │
       │ 1. Request              │                           │
       ├────────────────────────>│                           │
       │                         │                           │
       │ 2. 402 Payment Required │                           │
       │<────────────────────────┤                           │
       │                         │                           │
       │ 3. Sign payment (XDR)   │                           │
       │    with Freighter/      │                           │
       │    Keypair              │                           │
       │                         │                           │
       │ 4. Request + X-PAYMENT  │                           │
       ├────────────────────────>│                           │
       │                         │                           │
       │                         │ 5. Verify payment         │
       │                         ├──────────────────────────>│
       │                         │                           │
       │                         │ 6. Verification result    │
       │                         │<──────────────────────────┤
       │                         │                           │
       │                         │ 7. Serve content          │
       │                         │                           │
       │                         │ 8. Settle payment         │
       │                         ├──────────────────────────>│
       │                         │                           │
       │                         │ 9. Submit to Stellar      │
       │                         │    (with optional         │
       │                         │     fee-bump)             │
       │                         │                           │
       │                         │ 10. Settlement result     │
       │                         │<──────────────────────────┤
       │                         │                           │
       │ 11. 200 OK + Content    │                           │
       │     + X-PAYMENT-RESPONSE│                           │
       │<────────────────────────┤                           │
       │                         │                           │`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Development</h2>
          <h3 className="text-xl font-semibold text-black mb-2">Prerequisites</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Node.js v18 or higher</li>
            <li>pnpm v8 or higher</li>
            <li>Stellar testnet account (fund via <a href="https://friendbot.stellar.org" className="text-blue-600 hover:underline">friendbot</a>)</li>
          </ul>

          <h3 className="text-xl font-semibold text-black mb-2">Setup</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SyntaxHighlighter language="bash" style={prism}>
              {`# Clone the repository
git clone https://github.com/your-org/stellar-x402.git
cd stellar-x402

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Testing</h2>
          <p className="text-gray-600">
            See <a href="https://github.com/mertkaradayi/stellar-x402/blob/main/TESTING.md" className="text-blue-600 hover:underline">TESTING.md</a> for comprehensive testing guide.
          </p>
        </section>
      </div>
    ),
  },
  "protocol/comparison": {
    title: "Protocol Format Comparison",
    content: (
      <div className="space-y-8">
        <p className="text-lg text-gray-600">
          A detailed look at the actual JSON structures used in Stellar x402 vs the base x402 protocol (EVM). This helps you understand the differences at a glance.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">1. Payment Required Response (402 Response)</h2>
          <p className="text-gray-600 mb-4">When a server requires payment, it returns a <code>402 Payment Required</code> status.</p>
          
          <div className="grid xl:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-black mb-2">Base x402 Format (EVM Example)</h3>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <SyntaxHighlighter language="json" style={prism}>
                  {`{
  "x402Version": 1,
  "accepts": [
    {
      "scheme": "exact",
      "network": "base-sepolia",
      "maxAmountRequired": "1000000",
      "resource": "https://api.example.com/premium",
      "payTo": "0x2096...12287C",
      "asset": "0x036C...3dCF7e"
    }
  ]
}`}
                </SyntaxHighlighter>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">Stellar x402 Format</h3>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <SyntaxHighlighter language="json" style={prism}>
                  {`{
  "x402Version": 1,
  "accepts": [
    {
      "scheme": "exact",
      "network": "stellar-testnet",
      "maxAmountRequired": "10000000", // 1 XLM
      "resource": "https://api.example.com/premium",
      "payTo": "GC63P...W5BSIRT",
      "asset": "native", // Native XLM
      "extra": {
        "feeSponsorship": true
      }
    }
  ]
}`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
             <h4 className="font-semibold text-blue-900 mb-2">Key Differences</h4>
             <ul className="list-disc pl-5 text-sm text-blue-800 space-y-1">
               <li><code>network</code>: "stellar-testnet" vs "base-sepolia"</li>
               <li><code>asset</code>: "native" for XLM vs ERC-20 address</li>
               <li><code>maxAmountRequired</code>: Stroops (7 decimals) vs wei/token units</li>
               <li><code>payTo</code>: Stellar address (G...) vs EVM address (0x...)</li>
             </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">2. Payment Payload (X-PAYMENT Header)</h2>
          <p className="text-gray-600 mb-4">The client sends this as the <code>X-PAYMENT</code> header (base64-encoded JSON).</p>

          <div className="grid xl:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-black mb-2">Base x402 (Signature-based)</h3>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <SyntaxHighlighter language="json" style={prism}>
                  {`{
  "payload": {
    "signature": "0x2d6a...",
    "authorization": {
      "from": "0x857b...",
      "to": "0x2096...",
      "value": "1000000",
      "validBefore": "1740672154",
      "nonce": "0xf374..."
    }
  }
}`}
                </SyntaxHighlighter>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">Stellar x402 (XDR-based)</h3>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <SyntaxHighlighter language="json" style={prism}>
                  {`{
  "payload": {
    "signedTxXdr": "AAAAAg...", // Complete signed tx
    "sourceAccount": "GABC...",
    "destination": "GC63...",
    "amount": "10000000",
    "asset": "native",
    "validUntilLedger": 12345678,
    "nonce": "550e84..."
  }
}`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-black mb-2">Why XDR?</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Stellar uses XDR (eXternal Data Representation) for all transactions</li>
              <li>The <code>signedTxXdr</code> contains the complete, signed transaction ready for submission</li>
              <li>Facilitator can optionally fee-bump without modifying the client's transaction</li>
              <li>Built-in replay protection via Stellar's sequence numbers</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">3. Facilitator Verify Request</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
            <SyntaxHighlighter language="json" style={prism}>
              {`// Stellar x402 Format (Compatible, with flexibility)
{
  "x402Version": 1,
  "paymentPayload": { /* PaymentPayload object */ },  // OR
  "paymentHeader": "base64-encoded-payment-header",   // Alternative format
  "paymentRequirements": { /* PaymentRequirements object */ }
}`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Summary of Format Differences</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspect</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EVM (Coinbase)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stellar (Ours)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                <tr>
                  <td className="px-6 py-4 font-medium">Payment Structure</td>
                  <td className="px-6 py-4 text-gray-500">Signature + authorization object</td>
                  <td className="px-6 py-4 text-black font-medium">Complete signed XDR transaction</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Expiry</td>
                  <td className="px-6 py-4 text-gray-500">Unix timestamp (validBefore)</td>
                  <td className="px-6 py-4 text-black font-medium">Ledger sequence (validUntilLedger)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Native Asset</td>
                  <td className="px-6 py-4 text-gray-500">Requires ERC-20 contract</td>
                  <td className="px-6 py-4 text-black font-medium">"native" (no contract)</td>
                </tr>
                 <tr>
                  <td className="px-6 py-4 font-medium">Replay Protection</td>
                  <td className="px-6 py-4 text-gray-500">Nonce in authorization</td>
                  <td className="px-6 py-4 text-black font-medium">Sequence numbers (protocol-level)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
  },
  "core-concepts/x402-stellar": {
    title: "x402 Stellar",
    content: (
      <div className="space-y-8">
        <p className="text-lg">Core library with types, schemas, and facilitator client for building custom integrations.</p>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Installation</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SyntaxHighlighter language="bash" style={prism}>
              {`npm install x402-stellar`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Usage</h2>
          
          <h3 className="text-xl font-semibold text-black mb-3">Types and Schemas</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import {
  PaymentPayloadSchema,
  PaymentRequirementsSchema,
  type PaymentPayload,
  type PaymentRequirements,
} from "x402-stellar";

// Validate a payment payload
const result = PaymentPayloadSchema.safeParse(payload);
if (result.success) {
  const validPayload: PaymentPayload = result.data;
}`}
            </SyntaxHighlighter>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Facilitator Client</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import { useFacilitator } from "x402-stellar";

const { verify, settle, supported } = useFacilitator({
  url: "http://localhost:4022",
});

// Get supported payment kinds
const kinds = await supported();

// Verify a payment
const verifyResult = await verify(paymentPayload, paymentRequirements);

// Settle a payment
const settleResult = await settle(paymentPayload, paymentRequirements);`}
            </SyntaxHighlighter>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Network Configuration</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import { STELLAR_NETWORKS } from "x402-stellar";

const testnetConfig = STELLAR_NETWORKS["stellar-testnet"];
console.log(testnetConfig.horizonUrl);
// https://horizon-testnet.stellar.org`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Exports</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><code>x402-stellar</code> - Main entry point with all exports</li>
            <li><code>x402-stellar/types</code> - Types and Zod schemas only</li>
            <li><code>x402-stellar/shared</code> - Shared utilities (base64, JSON)</li>
            <li><code>x402-stellar/verify</code> - Facilitator client</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">License</h2>
          <p>MIT</p>
        </section>
      </div>
    ),
  },
  "core-concepts/x402-stellar-client": {
    title: "x402 Stellar Client",
    content: (
      <div className="space-y-8">
        <p className="text-lg">Client SDK for signing payments (Keypair + Freighter).</p>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Installation</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
            <SyntaxHighlighter language="bash" style={prism}>
              {`npm install x402-stellar-client @stellar/stellar-sdk`}
            </SyntaxHighlighter>
          </div>
          <p className="mb-2">For Freighter support in browsers:</p>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SyntaxHighlighter language="bash" style={prism}>
              {`npm install @stellar/freighter-api`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Usage</h2>
          
          <h3 className="text-xl font-semibold text-black mb-3">With Keypair (Backends/Scripts)</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import { createPaymentHeader, createKeypairSigner } from "x402-stellar-client";
import { Keypair } from "@stellar/stellar-sdk";

const keypair = Keypair.fromSecret("SXXX...");
const signer = createKeypairSigner(keypair);

const xPayment = await createPaymentHeader({
  signer,
  paymentRequirements: {
    scheme: "exact",
    network: "stellar-testnet",
    maxAmountRequired: "10000000", // 1 XLM in stroops
    payTo: "GXXXX...",
    asset: "native",
    resource: "https://api.example.com/premium",
    description: "Premium API access",
    mimeType: "application/json",
    maxTimeoutSeconds: 300,
  },
});

// Use in request
const response = await fetch("https://api.example.com/premium", {
  headers: {
    "X-PAYMENT": xPayment,
  },
});`}
            </SyntaxHighlighter>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">With Freighter (Browsers)</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import { createPaymentHeader, createFreighterSigner } from "x402-stellar-client";

const signer = createFreighterSigner();

const xPayment = await createPaymentHeader({
  signer,
  paymentRequirements: requirements,
});

// Freighter will prompt the user to approve the transaction`}
            </SyntaxHighlighter>
          </div>
        </section>
      </div>
    ),
  },
  "core-concepts/x402-stellar-fetch": {
    title: "x402 Stellar Fetch",
    content: (
      <div className="space-y-8">
        <p className="text-lg">Fetch wrapper that auto-pays 402 responses for simple client integrations.</p>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Installation</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SyntaxHighlighter language="bash" style={prism}>
              {`npm install x402-stellar-fetch @stellar/stellar-sdk`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Usage</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import { wrapFetchWithPayment, createKeypairSigner } from "x402-stellar-fetch";
import { Keypair } from "@stellar/stellar-sdk";

const keypair = Keypair.fromSecret("SXXX...");
const signer = createKeypairSigner(keypair);

// Automatically handles 402 Payment Required responses
const fetchWithPay = wrapFetchWithPayment(fetch, signer);
const response = await fetchWithPay("https://api.example.com/premium");`}
            </SyntaxHighlighter>
          </div>
        </section>
      </div>
    ),
  },
  "core-concepts/x402-stellar-express": {
    title: "x402 Stellar Express",
    content: (
      <div className="space-y-8">
        <p className="text-lg">Express middleware for protecting routes with x402 payments.</p>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Installation</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SyntaxHighlighter language="bash" style={prism}>
              {`npm install x402-stellar-express express`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Usage</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import express from "express";
import { paymentMiddleware } from "x402-stellar-express";

const app = express();

app.use(paymentMiddleware({
  payTo: "GXXXX...", // Your Stellar address
  routes: {
    "/api/premium/*": { price: "1.00" }
  },
  facilitator: { url: "http://localhost:4022" }
}));

app.listen(3000);`}
            </SyntaxHighlighter>
          </div>
        </section>
      </div>
    ),
  },
  "core-concepts/facilitator": {
    title: "Facilitator",
    content: (
      <div className="space-y-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-bold text-green-800 mb-2">Protocol Compliance</h3>
          <p className="text-sm text-green-700 mb-2">
            This implementation is <strong>100% compliant</strong> with the x402 specification.
          </p>
          <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
             <li>✅ All facilitator endpoints (/verify, /settle, /supported)</li>
             <li>✅ Payment payload and requirements schemas</li>
             <li>✅ Error codes and response formats</li>
             <li>✅ Replay protection and idempotency</li>
             <li>✅ Trust-minimized payment flows</li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Overview</h2>
          <p className="text-gray-600 mb-4">
            The facilitator is a server component responsible for verifying and settling payments on behalf of resource servers. It abstracts away blockchain complexity from your API.
          </p>
          <p className="text-gray-600">
            See <a href="https://github.com/mertkaradayi/stellar-x402/tree/main/packages/facilitator" className="text-blue-600 hover:underline">packages/facilitator</a> for the full implementation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">API Reference</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-black mb-2">POST /verify</h3>
              <p className="mb-4 text-gray-600">Verifies a payment is valid before settlement. Checks signature, expiry, and balance.</p>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <SyntaxHighlighter language="json" style={prism}>
                  {`{
  "isValid": true,
  "payer": "GXXXX..."
}`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">POST /settle</h3>
              <p className="mb-4 text-gray-600">Submits payment to the Stellar network. Handles fee-bumping if configured.</p>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <SyntaxHighlighter language="json" style={prism}>
                  {`{
  "success": true,
  "payer": "GXXXX...",
  "transaction": "abc123...",
  "network": "stellar-testnet"
}`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>
      </div>
    ),
  },
}

export default async function DynamicDocsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const slugPath = slug.join("/")
  const doc = docsContent[slugPath]

  if (!doc) {
    // Fallback for "Getting Started" parent if accessed directly
    if (slugPath === "getting-started") {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <h1 className="text-4xl font-bold text-black mb-8">{docsContent["getting-started"].title}</h1>
           {docsContent["getting-started"].content}
        </div>
      )
    }
    return notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-black mb-8">{doc.title}</h1>
      <div className="prose prose-lg max-w-none text-gray-600">
        {doc.content}
      </div>
    </div>
  )
}
