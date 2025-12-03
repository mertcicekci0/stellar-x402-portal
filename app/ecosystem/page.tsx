"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ExternalLink, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  "All Projects",
  "Client-Side Integrations",
  "Services/Endpoints",
  "Infrastructure & Tooling",
  "Learning & Community Resources",
  "Facilitators"
]

const projects = [
  {
    title: "1Shot API",
    category: "Infrastructure & Tooling",
    description: "A general purpose facilitator to monetize any n8n workflow with your favorite ERC-20 token.",
    logo: "/code.png", // Using existing placeholder
    link: "#",
    color: "bg-cyan-500/20 text-cyan-400"
  },
  {
    title: "402104",
    category: "Infrastructure & Tooling",
    description: "Generate expirable, paywalled links to private ANS-104 DataItems on Arweave. Compatible with both S3 and ANS-104 data standards.",
    logo: "/locked.png", // Using existing placeholder
    link: "#",
    color: "bg-yellow-500/20 text-yellow-400"
  },
  {
    title: "AEON",
    category: "Services/Endpoints",
    description: "The omnichain settlement layer that enables AI agents to seamlessly pay millions of real-world merchants across SEA, LATAM, and Africa – powered by x402 and USDC.",
    logo: "/dollars.png", // Using existing placeholder
    link: "#",
    color: "bg-green-500/20 text-green-400"
  }
]

export default function EcosystemPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === "All Projects" || project.category === activeCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Explore the <span className="text-blue-400">x402 Ecosystem</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover innovative projects, tools, and applications built by our growing community of partners and developers leveraging x402 technology.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="space-y-8 mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white border border-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className="group bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <div className="mb-4">
                <span className="text-xs font-medium text-gray-500 bg-slate-800 px-2 py-1 rounded-md">
                  {project.category}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${project.color}`}>
                  <div className="relative w-8 h-8">
                    <Image
                      src={project.logo}
                      alt={project.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 h-20 overflow-hidden">
                {project.description}
              </p>
              
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Visit website <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects found matching your criteria.
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

