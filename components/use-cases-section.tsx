"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const useCases = [
  {
    category: "API MONETIZATION",
    title: "API Monetization",
    description: "Charge per-request for your APIs without complex subscription models. Pay-per-use made simple.",
    icon: "/settings.png",
  },
  {
    category: "CONTENT ACCESS",
    title: "Content Access and Subscription Mechanism",
    description: "Gate premium content, articles, or media with instant micropayments. No accounts required. Seamless subscription management.",
    icon: "/security.png",
  },
  {
    category: "SECURITY LAYER",
    title: "Enterprise Solutions",
    description: "Deploy permissioned payment rails for B2B integrations with full audit trails and enterprise-grade security.",
    icon: "/locked.png",
  },
]

function UseCaseCard({ useCase, index }: { useCase: typeof useCases[0]; index: number }) {
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
            src={useCase.icon}
            alt={useCase.title}
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
          {useCase.category}
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
        {useCase.title}
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
        {useCase.description}
      </p>
    </div>
  )
}

export function UseCasesSection() {
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
    <section id="use-cases" className="relative py-24 bg-white overflow-hidden">
      {/* Sharp transition gradient from dark to white */}
      <div 
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, oklch(0.18 0.04 250) 0%, oklch(0.18 0.04 250) 40%, white 60%, white 100%)',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-6 sm:mb-8 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-balance text-stellar-navy">Real Use Case Ideas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            See how developers are using @402-stellar to build the future of web monetization
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={index} useCase={useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
