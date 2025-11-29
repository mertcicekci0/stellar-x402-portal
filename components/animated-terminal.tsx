"use client"

import { useState, useEffect } from "react"

interface AnimatedTerminalProps {
  onComplete?: () => void
}

export function AnimatedTerminal({ onComplete }: AnimatedTerminalProps) {
  const [step, setStep] = useState<"typing" | "installing" | "ascii" | "complete">("typing")
  const [commandText, setCommandText] = useState("")
  const [asciiText, setAsciiText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  const fullCommand = "npm install @402-stellar"
  const asciiArt = `██╗  ██╗ ██████╗ ██████╗ ███████╗████████╗███████╗██╗      █████╗ ██████╗ 
╚██╗██╔╝██╔═══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝██║     ██╔══██╗██╔══██╗
 ╚███╔╝ ██║   ██║██████╔╝█████╗     ██║   ███████╗██║     ███████║██████╔╝
 ██╔██╗ ██║   ██║██╔══██╗██╔══╝     ██║   ╚════██║██║     ██╔══██║██╔══██╗
██╔╝ ██╗╚██████╔╝██║  ██║███████╗   ██║   ███████║███████╗██║  ██║██║  ██║
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝`

  useEffect(() => {
    // Step 1: Type command
    if (step === "typing") {
      let charIndex = 0
      const typingInterval = setInterval(() => {
        if (charIndex < fullCommand.length) {
          setCommandText(fullCommand.slice(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => {
            setStep("installing")
          }, 500)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }

    // Step 2: Installing
    if (step === "installing") {
      const installingTimer = setTimeout(() => {
        setStep("ascii")
      }, 1500)

      return () => clearTimeout(installingTimer)
    }

    // Step 3: Type ASCII art
    if (step === "ascii") {
      const lines = asciiArt.split("\n")
      let currentLine = 0
      let currentChar = 0
      let displayText = ""

      const asciiInterval = setInterval(() => {
        if (currentLine < lines.length) {
          if (currentChar < lines[currentLine].length) {
            displayText += lines[currentLine][currentChar]
            currentChar++
            setAsciiText(displayText + (currentLine < lines.length - 1 ? "\n" : ""))
          } else {
            displayText += "\n"
            currentLine++
            currentChar = 0
            if (currentLine < lines.length) {
              setAsciiText(displayText)
            }
          }
        } else {
          clearInterval(asciiInterval)
          setTimeout(() => {
            setStep("complete")
            setShowCursor(false)
            onComplete?.()
          }, 500)
        }
      }, 15)

      return () => clearInterval(asciiInterval)
    }
  }, [step, fullCommand, asciiArt, onComplete])

  // Cursor blink
  useEffect(() => {
    if (step === "complete") return

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [step])

  return (
    <div className="bg-black rounded-lg border border-gray-800 overflow-hidden font-mono">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-gray-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="ml-3 text-xs text-gray-500">terminal</span>
      </div>

      {/* Terminal content */}
      <div className="p-6 text-sm">
        {/* Command line */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#d4a853]">$</span>
          <span className="text-gray-300">{commandText}</span>
          {step === "typing" && showCursor && (
            <span className="inline-block w-2 h-4 bg-[#d4a853] animate-pulse"></span>
          )}
        </div>

        {/* Installing message */}
        {step === "installing" && (
          <div className="text-gray-500 text-xs mb-3">
            <span className="inline-block animate-pulse">Installing packages...</span>
          </div>
        )}

        {/* ASCII Art */}
        {step === "ascii" && (
          <div className="mt-4 mb-2">
            <pre className="text-[#d4a853] font-mono text-[9px] sm:text-[10px] leading-tight overflow-x-auto">
              {asciiText}
              {showCursor && <span className="inline-block w-1 h-3 bg-[#d4a853] ml-0.5"></span>}
            </pre>
          </div>
        )}

        {/* Complete message */}
        {step === "complete" && (
          <>
            <div className="mt-4 mb-2">
              <pre className="text-[#d4a853] font-mono text-[9px] sm:text-[10px] leading-tight overflow-x-auto">
                {asciiArt}
              </pre>
            </div>
            <div className="text-green-400 text-xs mt-2">
              ✓ Installed @402-stellar successfully
            </div>
          </>
        )}
      </div>
    </div>
  )
}

