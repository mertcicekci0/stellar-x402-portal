"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PaymentDialog } from "@/components/payment-dialog"

export function HeroSection() {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)

  return (
    <section className="relative min-h-screen bg-white overflow-visible">
      {/* Video Background - Right Side, Vertically Centered, Masked, Huge */}
      <div className="absolute top-1/2 right-[-35%] transform -translate-y-1/2 w-[100vw] max-w-none h-[150vh] z-10 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain mix-blend-multiply [mask-image:radial-gradient(circle,black_50%,transparent_70%)]"
        >
          <source src="/landingvideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
        <div className="max-w-4xl text-left min-h-[80vh] flex flex-col justify-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10">
              <span className="text-xs font-medium text-black">Built on Stellar</span>
              <span className="h-1 w-1 rounded-full bg-[#d4a853]" />
              <span className="text-xs text-gray-600">402 Protocol</span>
            </div>

            {/* Main Headline - Base.org style */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight tracking-tight">
              <span className="block">An open protocol</span>
              <span className="block">for internet-native</span>
              <span className="block">payments</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
              @402-stellar is built to empower builders, creators, and people everywhere to build apps, grow businesses, create what they love, and earn onchain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => setPaymentDialogOpen(true)}
                className="bg-black hover:bg-black/90 text-white font-medium px-8 h-12 rounded-none"
              >
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black/20 text-black hover:bg-black/5 px-8 h-12 rounded-none bg-transparent"
                asChild
              >
                <a href="/docs">Read the Docs</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
      />
    </section>
  )
}
