"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="relative min-h-screen bg-white overflow-visible">
      {/* Video Background - Right Side, Vertically Centered, Masked, Huge, Interactive */}
      <div className="absolute top-1/2 right-[-40%] transform -translate-y-1/2 w-[120vw] max-w-none h-[150vh] z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain mix-blend-multiply [mask-image:radial-gradient(circle,black_40%,transparent_65%)] transition-all duration-700 ease-out hover:scale-105 cursor-pointer"
          onMouseEnter={() => videoRef.current?.pause()}
          onMouseLeave={() => videoRef.current?.play()}
        >
          <source src="/landingvideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32 pointer-events-none">
        <div className="max-w-4xl text-left min-h-[80vh] flex flex-col justify-center pointer-events-auto">
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
              <span className="block">Stellar x402</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
              @402-stellar is built to empower builders, creators, and people everywhere to build apps, grow businesses, create what they love, and earn onchain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="bg-black hover:bg-black/90 text-white font-medium px-8 h-12 rounded-none"
              >
                <a href="https://stellar-x402-examples-server-example-production.up.railway.app/" target="_blank" rel="noopener noreferrer">
                  Try it Out
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
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
    </section>
  )
}
 
