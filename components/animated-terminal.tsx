"use client"

import { useState, useEffect, useRef } from "react"

interface AnimatedTerminalProps {
  onComplete?: () => void
}

type TerminalStep = 
  | "typing_1" 
  | "installing_1" 
  | "complete_1" 
  | "typing_2" 
  | "installing_2" 
  | "complete"

export function AnimatedTerminal({ onComplete }: AnimatedTerminalProps) {
  const [step, setStep] = useState<TerminalStep>("typing_1")
  const [command1Text, setCommand1Text] = useState("")
  const [command2Text, setCommand2Text] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)

  const cmd1 = "npm install x402-stellar-fetch @stellar/stellar-sdk"
  const cmd2 = "npm install x402-stellar-express express"

  // Auto-scroll effect
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [step, command1Text, command2Text])

  useEffect(() => {
    // 1. Type first command
    if (step === "typing_1") {
      let charIndex = 0
      const typingInterval = setInterval(() => {
        if (charIndex < cmd1.length) {
          setCommand1Text(cmd1.slice(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => setStep("installing_1"), 200)
        }
      }, 25) // Fast typing

      return () => clearInterval(typingInterval)
    }

    // 2. Install first command
    if (step === "installing_1") {
      const timer = setTimeout(() => {
        setStep("complete_1")
      }, 800) // Fast install (0.8s)
      return () => clearTimeout(timer)
    }

    // 3. Pause before second command
    if (step === "complete_1") {
      const timer = setTimeout(() => {
        setStep("typing_2")
      }, 400)
      return () => clearTimeout(timer)
    }

    // 4. Type second command
    if (step === "typing_2") {
      let charIndex = 0
      const typingInterval = setInterval(() => {
        if (charIndex < cmd2.length) {
          setCommand2Text(cmd2.slice(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => setStep("installing_2"), 200)
        }
      }, 25)

      return () => clearInterval(typingInterval)
    }

    // 5. Install second command
    if (step === "installing_2") {
      const timer = setTimeout(() => {
        setStep("complete")
        onComplete?.()
      }, 1000) // Fast install (1s)
      return () => clearTimeout(timer)
    }
  }, [step, onComplete])

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className={`bg-black rounded-lg border border-gray-800 overflow-hidden font-mono shadow-2xl transition-all duration-700 ease-in-out ${
      step === "complete" ? "scale-[1.01]" : "scale-100"
    }`}>
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-gray-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="ml-3 text-xs text-gray-500">terminal — zsh — 80x24</span>
      </div>

      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className={`p-6 text-sm overflow-y-auto transition-all duration-700 ease-in-out scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent ${
          step === "complete" ? "h-[450px]" : "h-[300px]"
        }`}
      >
        {/* Command 1 */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#d4a853]">➜</span>
            <span className="text-cyan-400">~</span>
            <span className="text-gray-300">{command1Text}</span>
            {step === "typing_1" && showCursor && (
              <span className="inline-block w-2 h-4 bg-[#d4a853] animate-pulse"></span>
            )}
          </div>
          
          {(step === "installing_1" || step === "complete_1" || step === "typing_2" || step === "installing_2" || step === "complete") && (
            <div className="mt-2 text-xs text-gray-400 animate-fade-in">
              {step === "installing_1" ? (
                <span className="animate-pulse">⠋ Installing packages...</span>
              ) : (
                <div className="space-y-1">
                  <div className="text-green-400">✓ x402-stellar-fetch installed</div>
                  <div className="text-green-400">✓ @stellar/stellar-sdk installed</div>
                  <div className="text-gray-500">added 2 packages in 0.8s</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Command 2 */}
        {(step === "typing_2" || step === "installing_2" || step === "complete") && (
          <div className="mb-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-[#d4a853]">➜</span>
              <span className="text-cyan-400">~</span>
              <span className="text-gray-300">{command2Text}</span>
              {step === "typing_2" && showCursor && (
                <span className="inline-block w-2 h-4 bg-[#d4a853] animate-pulse"></span>
              )}
            </div>

            {(step === "installing_2" || step === "complete") && (
              <div className="mt-2 text-xs text-gray-400">
                {step === "installing_2" ? (
                  <span className="animate-pulse">⠙ Resolving dependencies...</span>
                ) : (
                  <div className="animate-fade-in opacity-0" style={{ animation: 'fade-in 0.5s ease-out forwards' }}>
                    <pre className="whitespace-pre-wrap font-mono leading-relaxed">
                      <span className="text-gray-400">  ╭─ Installing x402 Middleware ──────────────────────╮</span>
                      <br />
                      <span className="text-gray-400">  │                                                   │</span>
                      <br />
                      <span className="text-gray-400">  │ </span>
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300"> x402-stellar-express@0.1.0</span>
                      <span className="text-gray-400">                   │</span>
                      <br />
                      <span className="text-gray-400">  │ </span>
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300"> express@4.18.2</span>
                      <span className="text-gray-400">                               │</span>
                      <br />
                      <span className="text-gray-400">  │                                                   │</span>
                      <br />
                      <span className="text-gray-400">  │ </span>
                      <span className="text-gray-500">added 2 packages in 1.0s</span>
                      <span className="text-gray-400">                          │</span>
                      <br />
                      <span className="text-gray-400">  ╰───────────────────────────────────────────────────╯</span>
                      <br /><br />
                      <span className="text-[#d4a853]">  ✨</span>
                      <span className="text-gray-300"> Stellar x402 Ecosystem ready!</span>
                      <br />
                      <span className="text-gray-500">  ➜ Documentation: </span>
                      <span className="text-blue-400 underline">http://localhost:3000/docs</span>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Final cursor */}
        {step === "complete" && (
          <div className="flex items-center gap-2">
            <span className="text-[#d4a853]">➜</span>
            <span className="text-cyan-400">~</span>
            {showCursor && (
              <span className="inline-block w-2 h-4 bg-[#d4a853] animate-pulse"></span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
