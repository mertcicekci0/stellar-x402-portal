"use client"

import { AnimatedTerminal } from "@/components/animated-terminal"
import { useEffect, useRef, useState } from "react"

export function TerminalSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.3,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-black mb-6">
              Get Started
            </h2>
            <p className="text-lg sm:text-xl font-light text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Install <span className="text-black font-normal">@402-stellar</span> and start building internet-native payments
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <AnimatedTerminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
