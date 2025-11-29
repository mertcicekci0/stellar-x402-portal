"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    category: "SPEED LAYER",
    title: "Instant Settlement",
    description: "Transactions finalize in 3-5 seconds on the Stellar network. No waiting, no friction.",
    icon: "/lightning.png",
  },
  {
    category: "COST EFFICIENCY",
    title: "Near-Zero Fees",
    description: "Average transaction costs less than $0.0001. Perfect for micropayments at any scale.",
    icon: "/dollars.png",
  },
  {
    category: "DEV TOOLS",
    title: "Developer First",
    description: "Clean APIs, comprehensive SDKs, and extensive documentation to get you shipping fast.",
    icon: "/code.png",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

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
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative p-12 sm:p-14 rounded-2xl bg-[#0a0e14] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
              {/* Wavy vertical lines background with distortion effect */}
              <div 
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 3px,
                    rgba(255, 255, 255, 0.08) 3px,
                    rgba(255, 255, 255, 0.08) 6px
                  )`,
                  maskImage: 'radial-gradient(ellipse 80% 60% at center, black 30%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at center, black 30%, transparent 80%)',
                  transform: 'perspective(1000px) rotateY(0deg)',
                }}
              />
              
              {/* Enhanced glow around icon area */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4A853]/10 rounded-full blur-3xl opacity-70" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#D4A853]/15 rounded-full blur-2xl opacity-60" />
              
              {/* Icon container - much larger with animation */}
              <div className="relative flex items-center justify-center mb-8 h-40 sm:h-48">
                <div
                  className={`relative w-40 h-40 sm:w-48 sm:h-48 drop-shadow-[0_0_40px_rgba(212,168,83,1)] drop-shadow-[0_0_80px_rgba(212,168,83,0.6)] transition-all duration-500 ease-out group-hover:scale-125 group-hover:drop-shadow-[0_0_80px_rgba(212,168,83,1.5)] group-hover:drop-shadow-[0_0_120px_rgba(212,168,83,1)] ${
                    isVisible
                      ? "opacity-100 scale-100 rotate-0 animate-pulse-slow"
                      : "opacity-0 scale-75 rotate-12"
                  }`}
                  style={{
                    transitionDelay: `${index * 150 + 200}ms`,
                  }}
                >
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={192}
                    height={192}
                    className="object-contain w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
                    priority
                  />
                </div>
              </div>
              
              {/* Category label */}
              <div
                className={`text-center mb-5 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${index * 150 + 400}ms`,
                }}
              >
                <span className="text-xs font-bold tracking-[0.15em] text-[#D4A853] uppercase">
                  {feature.category}
                </span>
              </div>
              
              {/* Title */}
              <h3
                className={`text-2xl sm:text-3xl font-bold mb-5 text-center text-white transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${index * 150 + 500}ms`,
                }}
              >
                {feature.title}
              </h3>
              
              {/* Description */}
              <p
                className={`text-white/60 leading-relaxed text-center text-sm max-w-sm mx-auto transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${index * 150 + 600}ms`,
                }}
              >
                {feature.description}
              </p>
            </div>
  )
}

export function FeaturesSection() {
  const [titleVisible, setTitleVisible] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTitleVisible(true)
          }
        })
      },
      {
        threshold: 0.3,
      }
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current)
      }
    }
  }, [])

  return (
    <section id="features" className="py-24 bg-stellar-navy text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-6 sm:mb-8 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="relative inline-block group cursor-pointer">
            <div
              className={`relative transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_40px_rgba(212,168,83,0.8)] ${
                titleVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              <Image
                src="/whyx402.png"
                alt="Why @402-stellar?"
                width={600}
                height={150}
                className="object-contain w-full h-auto max-w-3xl mx-auto"
                priority
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
