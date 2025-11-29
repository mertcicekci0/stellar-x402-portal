"use client"

import { useEffect, useRef } from "react"

interface DitherArtCanvasProps {
  className?: string
}

export function DitherArtCanvas({ className }: DitherArtCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Dither art parameters
    const lineCount = 200
    const lines: Array<{
      x: number
      y: number
      length: number
      opacity: number
      color: "gold" | "gray" | "white"
      baseLength: number
      baseY: number
    }> = []

    // Initialize lines
    for (let i = 0; i < lineCount; i++) {
      const x = (i / lineCount) * canvas.width
      const baseY = canvas.height * 0.3 + Math.random() * canvas.height * 0.4
      const baseLength = 20 + Math.random() * 100
      const colorRand = Math.random()
      const color: "gold" | "gray" | "white" =
        colorRand < 0.15
          ? "gold"
          : colorRand < 0.5
            ? "gray"
            : "white"

      lines.push({
        x,
        y: baseY,
        length: baseLength,
        opacity: 0.3 + Math.random() * 0.7,
        color,
        baseLength,
        baseY,
      })
    }

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line) => {
        // Calculate distance from mouse
        const dx = line.x - mousePosRef.current.x
        const dy = line.y - mousePosRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        // Interactive effect - lines react to mouse
        let currentLength = line.baseLength
        let currentY = line.baseY
        let currentOpacity = line.opacity

        if (distance < maxDistance) {
          const influence = 1 - distance / maxDistance
          // Lines grow and move towards mouse
          currentLength = line.baseLength * (1 + influence * 0.5)
          currentY = line.baseY - influence * 30
          currentOpacity = Math.min(1, line.opacity + influence * 0.3)
        }

        // Color mapping - optimized for white background
        let color: string
        switch (line.color) {
          case "gold":
            color = `rgba(212, 168, 83, ${currentOpacity})` // stellar-gold
            break
          case "gray":
            color = `rgba(60, 60, 60, ${currentOpacity * 0.8})` // darker gray for white bg
            break
          default:
            color = `rgba(100, 100, 100, ${currentOpacity * 0.5})` // darker for visibility
        }

        // Draw vertical line
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(line.x, currentY)
        ctx.lineTo(line.x, currentY - currentLength)
        ctx.stroke()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        cursor: "crosshair",
      }}
    />
  )
}

