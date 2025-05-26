"use client"

import { useEffect, useRef } from "react"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let mouseX = 0, mouseY = 0

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const particleCount = 80
    const maxDistance = 120
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      particles.forEach(p => {
        // Parallax: add mouse-influenced offset
        const offsetX = (mouseX - width / 2) * 0.0001
        const offsetY = (mouseY - height / 2) * 0.0001
        p.x += p.vx + offsetX
        p.y += p.vy + offsetY

        if (p.x <= 0 || p.x >= width) p.vx *= -1
        if (p.y <= 0 || p.y >= height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`
        ctx.shadowColor = `rgba(147, 197, 253, 0.3)`
        ctx.shadowBlur = 8
        ctx.fill()
      })

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(100, 116, 139, ${1 - dist / maxDistance})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(draw)
    }

    draw()

    // Random spark every few seconds
    const sparkInterval = setInterval(() => {
      const index = Math.floor(Math.random() * particleCount)
      ctx.beginPath()
      ctx.arc(particles[index].x, particles[index].y, particles[index].size * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.shadowColor = "rgba(255, 255, 255, 0.9)"
      ctx.shadowBlur = 15
      ctx.fill()
    }, 3000)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(sparkInterval)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-90"
      style={{ background: "transparent" }}
    />
  )
}
