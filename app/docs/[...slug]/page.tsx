import { notFound } from "next/navigation"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism"

const docsContent: Record<string, { title: string; content: React.ReactNode }> = {
  "getting-started": {
    title: "Getting Started",
    content: (
      <div className="space-y-8">
        <p>
          Welcome to the Stellar x402 ecosystem. This guide will help you get started with building x402-enabled applications on Stellar.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">For Wallet/dApp Developers (Pay for APIs)</h2>
          <div className="space-y-4">
            <p>If you want to consume x402-protected APIs:</p>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter language="bash" style={prism}>
                {`npm install x402-stellar-fetch`}
              </SyntaxHighlighter>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter language="typescript" style={prism}>
                {`import { wrapFetchWithPayment } from "x402-stellar-fetch";
import { Keypair } from "@stellar/stellar-sdk";

const keypair = Keypair.fromSecret("SXXX...");
const fetchWithPay = wrapFetchWithPayment(fetch, { type: "keypair", keypair });

// Automatically handles 402 Payment Required responses
const response = await fetchWithPay("https://api.example.com/premium");`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">For API Developers (Charge for APIs)</h2>
          <div className="space-y-4">
            <p>If you want to monetize your API endpoints:</p>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter language="bash" style={prism}>
                {`npm install x402-stellar-express`}
              </SyntaxHighlighter>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <SyntaxHighlighter language="typescript" style={prism}>
                {`import express from "express";
import { paymentMiddleware } from "x402-stellar-express";

const app = express();

app.use(paymentMiddleware(
  "GXXXX...",  // Your Stellar address to receive payments
  {
    "/api/premium/*": { price: "1.00" }  // 1 XLM
  },
  { url: "http://localhost:4022" }  // Facilitator URL
));

app.get("/api/premium/data", (req, res) => {
  res.json({ premium: "content" });
});`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  "core-concepts/x402-stellar": {
    title: "x402 Stellar",
    content: (
      <div className="space-y-8">
        <p className="text-lg">Core library for the Stellar x402 payment protocol.</p>

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
        <p className="text-lg">Client SDK for signing Stellar x402 payments. Supports both Stellar Keypair (for backends/scripts) and Freighter wallet (for browsers).</p>

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

          <h3 className="text-xl font-semibold text-black mb-3">Selecting Payment Requirements</h3>
          <p className="mb-2">When you receive a 402 response with multiple payment options:</p>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import { selectPaymentRequirements } from "x402-stellar-client";

// From 402 response
const accepts = response.accepts;

// Select Stellar payment option
const requirements = selectPaymentRequirements(
  accepts,
  "stellar-testnet", // preferred network
  "exact" // scheme
);`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">API</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-mono font-bold text-lg">createPaymentHeader(options)</h4>
              <p>Main entry point for creating signed X-PAYMENT headers.</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><code>signer</code> - The signer to use (keypair or Freighter)</li>
                <li><code>paymentRequirements</code> - The payment requirements from 402 response</li>
                <li><code>x402Version</code> - The x402 version (default: 1)</li>
                <li><code>timeoutSeconds</code> - Optional timeout override</li>
              </ul>
              <p className="mt-2">Returns: Base64-encoded payment header string</p>
            </div>

            <div>
              <h4 className="font-mono font-bold text-lg">createPaymentPayload(options)</h4>
              <p>Same as createPaymentHeader but returns the raw PaymentPayload object.</p>
            </div>

            <div>
              <h4 className="font-mono font-bold text-lg">createKeypairSigner(keypair)</h4>
              <p>Create a signer from a Stellar Keypair.</p>
            </div>

            <div>
              <h4 className="font-mono font-bold text-lg">createFreighterSigner()</h4>
              <p>Create a signer that uses the Freighter wallet.</p>
            </div>

            <div>
              <h4 className="font-mono font-bold text-lg">selectPaymentRequirements(requirements, network?, scheme?)</h4>
              <p>Select payment requirements from a list of options.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">License</h2>
          <p>MIT</p>
        </section>
      </div>
    ),
  },
  "core-concepts/x402-stellar-fetch": {
    title: "x402 Stellar Fetch",
    content: (
      <div className="space-y-8">
        <p className="text-lg">Fetch wrapper that automatically handles x402 payments for Stellar.</p>

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
          
          <h3 className="text-xl font-semibold text-black mb-3">Basic Example</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import { wrapFetchWithPayment, createKeypairSigner } from "x402-stellar-fetch";
import { Keypair } from "@stellar/stellar-sdk";

// Create a signer
const keypair = Keypair.fromSecret("SXXX...");
const signer = createKeypairSigner(keypair);

// Wrap fetch with automatic payment handling
const fetchWithPay = wrapFetchWithPayment(fetch, signer);

// Make requests - payments are handled automatically
const response = await fetchWithPay("https://api.example.com/premium");
const data = await response.json();`}
            </SyntaxHighlighter>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">With Options</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`const fetchWithPay = wrapFetchWithPayment(fetch, signer, {
  // Maximum payment amount (in stroops, default: 1 XLM)
  maxAmount: BigInt(50_000_000), // 5 XLM max

  // Custom requirement selector
  requirementSelector: (requirements) => {
    // Custom logic to select from multiple payment options
    return requirements.find((r) => r.network === "stellar-testnet")!;
  },
});`}
            </SyntaxHighlighter>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">With Freighter (Browser)</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import { wrapFetchWithPayment, createFreighterSigner } from "x402-stellar-fetch";

const signer = createFreighterSigner();
const fetchWithPay = wrapFetchWithPayment(fetch, signer);

// Freighter will prompt user to approve each payment
const response = await fetchWithPay("https://api.example.com/premium");`}
            </SyntaxHighlighter>
          </div>

          <h3 className="text-xl font-semibold text-black mb-3">Getting Payment Info</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import { wrapFetchWithPayment, decodePaymentResponse } from "x402-stellar-fetch";

const fetchWithPay = wrapFetchWithPayment(fetch, signer);
const response = await fetchWithPay("https://api.example.com/premium");

// Get payment details from response header
const paymentInfo = decodePaymentResponse(response);
if (paymentInfo) {
  console.log(\`Transaction: \${paymentInfo.transaction}\`);
  console.log(\`Network: \${paymentInfo.network}\`);
  console.log(\`Payer: \${paymentInfo.payer}\`);
}`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Makes the initial request</li>
            <li>If response is 402 Payment Required:
              <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-600">
                <li>Parses accepts array from response body</li>
                <li>Selects a Stellar-compatible payment option</li>
                <li>Verifies amount is within maxAmount</li>
                <li>Creates and signs a payment transaction</li>
                <li>Retries request with X-PAYMENT header</li>
              </ul>
            </li>
            <li>Returns the final response</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">API</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-mono font-bold text-lg">wrapFetchWithPayment(fetch, signer, options?)</h4>
              <p>Wraps fetch to automatically handle 402 responses.</p>
            </div>
            <div>
              <h4 className="font-mono font-bold text-lg">decodePaymentResponse(response)</h4>
              <p>Decodes the X-PAYMENT-RESPONSE header from a paid request.</p>
            </div>
            <div>
              <h4 className="font-mono font-bold text-lg">createKeypairSigner(keypair)</h4>
              <p>Create a signer from a Stellar Keypair.</p>
            </div>
            <div>
              <h4 className="font-mono font-bold text-lg">createFreighterSigner()</h4>
              <p>Create a signer that uses the Freighter wallet.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">License</h2>
          <p>MIT</p>
        </section>
      </div>
    ),
  },
  "core-concepts/x402-stellar-express": {
    title: "x402 Stellar Express",
    content: (
      <div className="space-y-8">
        <p className="text-lg">Express middleware for x402 payments on Stellar. Protect your API routes with instant Stellar payments.</p>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Installation</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SyntaxHighlighter language="bash" style={prism}>
              {`npm install x402-stellar-express express`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Quick Start</h2>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`import express from "express";
import { paymentMiddleware } from "x402-stellar-express";

const app = express();

// Protect routes with payments
app.use(
  paymentMiddleware({
    payTo: "GXXXX...", // Your Stellar address
    routes: {
      "/api/premium/*": { price: "1.00" }, // 1 XLM
      "/api/data": { price: "0.50" }, // 0.5 XLM
    },
    facilitator: {
      url: "http://localhost:4022", // Your facilitator URL
    },
  })
);

// Protected routes - payment required!
app.get("/api/premium/content", (req, res) => {
  res.json({ premium: "content" });
});

// Unprotected routes - no payment required
app.get("/api/free", (req, res) => {
  res.json({ free: "content" });
});

app.listen(3000);`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Configuration</h2>
          <h3 className="text-xl font-semibold text-black mb-3">Full Configuration</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`app.use(
  paymentMiddleware({
    // Required: Your Stellar address to receive payments
    payTo: "GXXXX...",

    // Required: Routes to protect
    routes: {
      "/api/premium/*": {
        price: "1.00", // Amount in XLM (or stroops as number)
        asset: "native", // "native" for XLM or SAC address
        description: "Premium API access",
        mimeType: "application/json",
        maxTimeoutSeconds: 300,
      },
    },

    // Optional: Facilitator configuration
    facilitator: {
      url: "http://localhost:4022",
      createAuthHeaders: async () => ({
        verify: { Authorization: "Bearer xxx" },
        settle: { Authorization: "Bearer xxx" },
        supported: {},
      }),
    },

    // Optional: Default network (default: "stellar-testnet")
    network: "stellar-testnet",

    // Optional: Default asset (default: "native")
    asset: "native",
  })
);`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Route Patterns</h2>
          <p className="mb-2">Supports flexible route matching:</p>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <SyntaxHighlighter language="typescript" style={prism}>
              {`routes: {
  // Exact match
  "/api/data": "1.00",

  // Wildcard (matches /api/premium/*, /api/premium/foo/bar, etc.)
  "/api/premium/*": "1.00",

  // Parameter syntax (matches /users/123, /users/abc, etc.)
  "/users/[id]": "0.50",

  // HTTP method specific
  "GET /api/read": "0.10",
  "POST /api/write": "0.50",

  // All methods (default)
  "* /api/any": "1.00",
}`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">License</h2>
          <p>MIT</p>
        </section>
      </div>
    ),
  },
  "core-concepts/facilitator": {
    title: "Facilitator",
    content: (
      <div className="space-y-8">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Stellar x402 Facilitator - Compliance Status</h3>
          <ul className="space-y-1 text-sm">
            <li><strong>Last Updated:</strong> November 29, 2025</li>
            <li><strong>Status:</strong> ✅ 100% Compliant with x402 Facilitator Specification</li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Executive Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Core Facilitator API</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">✅ Complete</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">/verify, /settle, /supported endpoints</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Zod Validation</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">✅ Complete</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">All schemas match Coinbase x402 patterns</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Error Codes</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">✅ Complete</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Stellar-specific codes following Coinbase naming</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Replay Protection</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">✅ Complete</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Redis-backed with memory fallback</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Idempotency</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">✅ Complete</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Cached settlement results</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Fee Sponsorship</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">✅ Complete</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Optional fee-bump support</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-medium">The Stellar x402 Facilitator is 100% compliant with the Coinbase x402 specification for facilitator implementations.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">API Reference</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-black mb-2">POST /verify</h3>
              <p className="mb-4">Verifies a payment is valid before settlement.</p>
              <h4 className="font-semibold mb-2">Request:</h4>
              <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                <SyntaxHighlighter language="json" style={prism}>
                  {`{
  "x402Version": 1,
  "paymentPayload": {
    "x402Version": 1,
    "scheme": "exact",
    "network": "stellar-testnet",
    "payload": {
      "signedTxXdr": "AAAAAgAAAA...",
      "sourceAccount": "GXXXX...",
      "amount": "10000000",
      "destination": "GXXXX...",
      "asset": "native",
      "validUntilLedger": 12345678,
      "nonce": "unique-nonce-123"
    }
  },
  "paymentRequirements": {
    "scheme": "exact",
    "network": "stellar-testnet",
    "maxAmountRequired": "10000000",
    "resource": "https://api.example.com/resource",
    "description": "API access",
    "mimeType": "application/json",
    "payTo": "GXXXX...",
    "maxTimeoutSeconds": 300,
    "asset": "native"
  }
}`}
                </SyntaxHighlighter>
              </div>
              <h4 className="font-semibold mb-2">Response:</h4>
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
              <p className="mb-4">Submits payment to the Stellar network.</p>
              <h4 className="font-semibold mb-2">Response:</h4>
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

        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Recommendations</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Immediate (Before Production)</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Enable Mainnet Support</strong>
                  <div className="rounded-lg overflow-hidden border border-gray-200 mt-2">
                    <SyntaxHighlighter language="typescript" style={prism}>
                      {`// In types/verify/facilitator.ts
export const SUPPORTED_KINDS = [
  { x402Version: 1, scheme: "exact", network: "stellar-testnet" },
  { x402Version: 1, scheme: "exact", network: "stellar" }, // Uncomment this
] as const;`}
                    </SyntaxHighlighter>
                  </div>
                </li>
                <li>
                  <strong>Add Transaction Expiry Validation</strong>
                  <div className="rounded-lg overflow-hidden border border-gray-200 mt-2">
                    <SyntaxHighlighter language="typescript" style={prism}>
                      {`// In schemes/exact/stellar/facilitator/verify.ts
const latestLedger = await server.ledgers().order('desc').limit(1).call();
if (stellarPayload.validUntilLedger <= latestLedger.records[0].sequence) {
  return { isValid: false, invalidReason: "payment_expired" };
}`}
                    </SyntaxHighlighter>
                  </div>
                </li>
              </ol>
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
           <h1 className="text-4xl font-bold text-black mb-8">Getting Started</h1>
           <p>Select a guide from the sidebar to get started.</p>
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