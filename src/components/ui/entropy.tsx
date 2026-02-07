/**
 * Entropy Background Component
 * Animated 3D particle system with ambient rotation, vibrant colors, and enhanced glow
 */
import { useEffect, useRef } from 'react'

interface EntropyProps {
  className?: string
  width?: number
  height?: number
}

// Refined ethereal color palette with higher saturation
const COLORS = {
  violet: { h: 270, s: 85, l: 65 },
  cyan: { h: 185, s: 90, l: 55 },
  magenta: { h: 320, s: 80, l: 60 },
  amber: { h: 45, s: 95, l: 60 },
  emerald: { h: 160, s: 75, l: 50 },
}

const COLOR_ARRAY = Object.values(COLORS)

export function Entropy({ className = "", width = 800, height = 600 }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let canvasWidth = 0
    let canvasHeight = 0

    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const w = rect.width
      const h = rect.height
      
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      
      canvasWidth = w
      canvasHeight = h
    }

    updateSize()

    // Mouse tracking
    let mouseX = -1000
    let mouseY = -1000
    const mouseRadius = 180

    // Global rotation state
    let globalRotation = 0
    const rotationSpeed = 0.0003 // Very slow rotation

    class Particle {
      x: number
      y: number
      z: number
      baseSize: number
      size: number
      order: boolean
      velocity: { x: number; y: number; z: number }
      originalX: number
      originalY: number
      originalZ: number
      influence: number
      neighbors: Particle[]
      color: { h: number; s: number; l: number }
      glowIntensity: number
      pulseOffset: number
      driftOffset: { x: number; y: number }

      constructor(x: number, y: number, order: boolean, colorIndex: number) {
        this.x = x
        this.y = y
        this.z = Math.random() * 250 - 125
        this.originalX = x
        this.originalY = y
        this.originalZ = this.z
        this.baseSize = 2.5 + Math.random() * 2.5
        this.size = this.baseSize
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 0.5
        }
        this.influence = 0
        this.neighbors = []
        this.color = COLOR_ARRAY[colorIndex % COLOR_ARRAY.length]
        this.glowIntensity = 0.7 + Math.random() * 0.3
        this.pulseOffset = Math.random() * Math.PI * 2
        this.driftOffset = {
          x: (Math.random() - 0.5) * 50,
          y: (Math.random() - 0.5) * 50
        }
      }

      update(width: number, height: number, mx: number, my: number, mRadius: number, time: number, centerX: number, centerY: number, rotation: number) {
        // Ambient drift motion
        const driftX = Math.sin(time * 0.001 + this.pulseOffset) * this.driftOffset.x * 0.02
        const driftY = Math.cos(time * 0.0015 + this.pulseOffset) * this.driftOffset.y * 0.02
        
        // Apply global rotation around center
        const relX = this.originalX - centerX
        const relY = this.originalY - centerY
        const rotatedX = relX * Math.cos(rotation) - relY * Math.sin(rotation)
        const rotatedY = relX * Math.sin(rotation) + relY * Math.cos(rotation)
        const targetX = centerX + rotatedX
        const targetY = centerY + rotatedY

        // Gentle Z oscillation with pulsing
        this.z = this.originalZ + Math.sin(time * 0.015 + this.pulseOffset) * 30

        // Pulsing glow
        const basePulse = 0.7 + Math.sin(time * 0.03 + this.pulseOffset) * 0.2

        // Calculate 3D scale
        const perspective = 500
        const scale = perspective / (perspective + this.z)
        this.size = this.baseSize * scale

        // Mouse repulsion
        const distToMouse = Math.hypot(this.x - mx, this.y - my)
        if (distToMouse < mRadius && distToMouse > 0) {
          const force = (mRadius - distToMouse) / mRadius
          const angle = Math.atan2(this.y - my, this.x - mx)
          const pushX = Math.cos(angle) * force * 15
          const pushY = Math.sin(angle) * force * 15
          this.x += pushX
          this.y += pushY
          this.z += force * 40
          this.glowIntensity = Math.min(1.2, this.glowIntensity + force * 0.5)
        } else {
          this.glowIntensity = Math.max(basePulse, this.glowIntensity - 0.03)
        }

        if (this.order) {
          const dx = targetX + driftX - this.x
          const dy = targetY + driftY - this.y

          const chaosInfluence = { x: 0, y: 0 }
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 100)
              chaosInfluence.x += (neighbor.velocity.x * strength)
              chaosInfluence.y += (neighbor.velocity.y * strength)
              this.influence = Math.max(this.influence, strength)
            }
          })

          this.x += dx * 0.03 * (1 - this.influence) + chaosInfluence.x * this.influence
          this.y += dy * 0.03 * (1 - this.influence) + chaosInfluence.y * this.influence
          this.influence *= 0.98
        } else {
          this.velocity.x += (Math.random() - 0.5) * 0.4
          this.velocity.y += (Math.random() - 0.5) * 0.4
          this.velocity.x *= 0.96
          this.velocity.y *= 0.96
          this.x += this.velocity.x + driftX
          this.y += this.velocity.y + driftY

          if (this.x < 0 || this.x > width) this.velocity.x *= -1
          if (this.y < 0 || this.y > height) this.velocity.y *= -1
          this.x = Math.max(0, Math.min(width, this.x))
          this.y = Math.max(0, Math.min(height, this.y))
        }
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
        const { h, s, l } = this.color
        const alpha = this.order ? 0.95 - this.influence * 0.2 : 0.9
        
        // Calculate 3D position
        const perspective = 500
        const scale = perspective / (perspective + this.z)
        const drawX = centerX + (this.x - centerX) * scale
        const drawY = centerY + (this.y - centerY) * scale

        // Enhanced outer glow
        const outerGlow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, this.size * 5)
        outerGlow.addColorStop(0, `hsla(${h}, ${s}%, ${l + 25}%, ${alpha * this.glowIntensity * 0.6})`)
        outerGlow.addColorStop(0.3, `hsla(${h}, ${s}%, ${l + 15}%, ${alpha * this.glowIntensity * 0.4})`)
        outerGlow.addColorStop(0.6, `hsla(${h}, ${s}%, ${l}%, ${alpha * this.glowIntensity * 0.15})`)
        outerGlow.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`)
        
        ctx.fillStyle = outerGlow
        ctx.beginPath()
        ctx.arc(drawX, drawY, this.size * 5, 0, Math.PI * 2)
        ctx.fill()

        // Inner glow
        const innerGlow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, this.size * 2)
        innerGlow.addColorStop(0, `hsla(${h}, ${s - 10}%, ${l + 30}%, ${alpha})`)
        innerGlow.addColorStop(0.5, `hsla(${h}, ${s}%, ${l + 10}%, ${alpha * 0.8})`)
        innerGlow.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`)
        
        ctx.fillStyle = innerGlow
        ctx.beginPath()
        ctx.arc(drawX, drawY, this.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Bright core
        ctx.fillStyle = `hsla(${h}, ${s - 20}%, ${Math.min(95, l + 35)}%, ${alpha})`
        ctx.beginPath()
        ctx.arc(drawX, drawY, this.size * 0.8, 0, Math.PI * 2)
        ctx.fill()

        // Specular highlight
        ctx.fillStyle = `hsla(0, 0%, 100%, ${alpha * 0.7 * this.glowIntensity})`
        ctx.beginPath()
        ctx.arc(drawX - this.size * 0.25, drawY - this.size * 0.25, this.size * 0.3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particle grid
    const particles: Particle[] = []
    const gridSize = 22
    const spacingX = canvasWidth / gridSize
    const spacingY = canvasHeight / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacingX * i + spacingX / 2 + (Math.random() - 0.5) * spacingX * 0.6
        const y = spacingY * j + spacingY / 2 + (Math.random() - 0.5) * spacingY * 0.6
        const order = Math.random() > 0.35
        const colorIndex = Math.floor(Math.random() * COLOR_ARRAY.length)
        particles.push(new Particle(x, y, order, colorIndex))
      }
    }

    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < 100
        })
      })
    }

    let time = 0
    let animationId: number
    const context = ctx

    function animate() {
      context.clearRect(0, 0, canvasWidth, canvasHeight)

      // Update global rotation
      globalRotation += rotationSpeed
      
      const centerX = canvasWidth / 2
      const centerY = canvasHeight / 2

      if (time % 25 === 0) {
        updateNeighbors()
      }

      // Sort particles by Z for 3D layering
      const sortedParticles = [...particles].sort((a, b) => b.z - a.z)

      sortedParticles.forEach(particle => {
        particle.update(canvasWidth, canvasHeight, mouseX, mouseY, mouseRadius, time, centerX, centerY, globalRotation)
      })

      // Draw connections with gradient
      sortedParticles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 70) {
            const alpha = 0.35 * (1 - distance / 70)
            const avgZ = (particle.z + neighbor.z) / 2
            const perspective = 500
            const scale = perspective / (perspective + avgZ)
            
            // Gradient connection line
            const h = (particle.color.h + neighbor.color.h) / 2
            const s = (particle.color.s + neighbor.color.s) / 2
            const l = (particle.color.l + neighbor.color.l) / 2 + 10
            
            const p1Scale = perspective / (perspective + particle.z)
            const p2Scale = perspective / (perspective + neighbor.z)
            
            const x1 = centerX + (particle.x - centerX) * p1Scale
            const y1 = centerY + (particle.y - centerY) * p1Scale
            const x2 = centerX + (neighbor.x - centerX) * p2Scale
            const y2 = centerY + (neighbor.y - centerY) * p2Scale
            
            const gradient = context.createLinearGradient(x1, y1, x2, y2)
            gradient.addColorStop(0, `hsla(${particle.color.h}, ${particle.color.s}%, ${particle.color.l}%, ${alpha * scale})`)
            gradient.addColorStop(1, `hsla(${neighbor.color.h}, ${neighbor.color.s}%, ${neighbor.color.l}%, ${alpha * scale})`)
            
            context.strokeStyle = gradient
            context.lineWidth = 1.5 * scale
            context.lineCap = 'round'
            
            context.beginPath()
            context.moveTo(x1, y1)
            context.lineTo(x2, y2)
            context.stroke()
          }
        })
      })

      // Draw particles
      sortedParticles.forEach(particle => {
        particle.draw(context, centerX, centerY)
      })

      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      updateSize()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    window.addEventListener('resize', handleResize)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [width, height])

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}

export default Entropy
