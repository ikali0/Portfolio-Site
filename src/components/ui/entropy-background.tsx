import { useEffect, useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface EntropyBackgroundProps {
  className?: string;
}

export const EntropyBackground = forwardRef<HTMLDivElement, EntropyBackgroundProps>(
  ({ className = "" }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      return { width, height };
    };

    let { width, height } = resizeCanvas();

    // New pink/teal palette colors
    const pinkColor = '#d04f99';     // primary pink
    const tealColor = '#8acfd1';     // secondary teal
    const accentColor = '#e670ab';   // lighter pink accent
    const lineColor = '#50afb6';     // teal for lines

    class Particle {
      x: number;
      y: number;
      size: number;
      order: boolean;
      velocity: { x: number; y: number };
      originalX: number;
      originalY: number;
      influence: number;
      neighbors: Particle[];

      constructor(x: number, y: number, order: boolean) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.size = 2;
        this.order = order;
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        };
        this.influence = 0;
        this.neighbors = [];
      }

      update(w: number, h: number) {
        if (this.order) {
          const dx = this.originalX - this.x;
          const dy = this.originalY - this.y;

          const chaosInfluence = { x: 0, y: 0 };
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y);
              const strength = Math.max(0, 1 - distance / 150);
              chaosInfluence.x += (neighbor.velocity.x * strength);
              chaosInfluence.y += (neighbor.velocity.y * strength);
              this.influence = Math.max(this.influence, strength);
            }
          });

          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence;
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence;
          this.influence *= 0.99;
        } else {
          this.velocity.x += (Math.random() - 0.5) * 0.5;
          this.velocity.y += (Math.random() - 0.5) * 0.5;
          this.velocity.x *= 0.95;
          this.velocity.y *= 0.95;
          this.x += this.velocity.x;
          this.y += this.velocity.y;

          if (this.x < w / 2 || this.x > w) this.velocity.x *= -1;
          if (this.y < 0 || this.y > h) this.velocity.y *= -1;
          this.x = Math.max(w / 2, Math.min(w, this.x));
          this.y = Math.max(0, Math.min(h, this.y));
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.order ? 0.7 - this.influence * 0.3 : 0.8;
        const color = this.order ? tealColor : pinkColor;
        ctx.fillStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particle grid
    const particles: Particle[] = [];
    const gridSize = 30;
    const spacingX = width / gridSize;
    const spacingY = height / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacingX * i + spacingX / 2;
        const y = spacingY * j + spacingY / 2;
        const order = x < width / 2;
        particles.push(new Particle(x, y, order));
      }
    }

    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false;
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          return distance < 150;
        });
      });
    }

    let time = 0;
    let animationId: number;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      if (time % 30 === 0) {
        updateNeighbors();
      }

      particles.forEach(particle => {
        particle.update(width, height);
        particle.draw(ctx);

        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y);
          if (distance < 80) {
            const alpha = 0.2 * (1 - distance / 80);
            // Blend colors for connection lines
            const connectionColor = particle.order && neighbor.order ? tealColor :
                                   !particle.order && !neighbor.order ? accentColor : lineColor;
            ctx.strokeStyle = connectionColor + Math.round(alpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
        });
      });

      // Animated pulsing divider line
      const pulseAlpha = 0.3 + Math.sin(time * 0.03) * 0.15;
      const pulseWidth = 1 + Math.sin(time * 0.02) * 0.5;
      
      // Gradient for divider - pink to teal
      const gradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);
      gradient.addColorStop(0, `${tealColor}00`);
      gradient.addColorStop(0.2, tealColor + Math.round(pulseAlpha * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(0.5, pinkColor + Math.round(pulseAlpha * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(0.8, tealColor + Math.round(pulseAlpha * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, `${pinkColor}00`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = pulseWidth;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      time++;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      const dims = resizeCanvas();
      width = dims.width;
      height = dims.height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn("absolute inset-0 bg-background", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
});

EntropyBackground.displayName = "EntropyBackground";

export default EntropyBackground;
