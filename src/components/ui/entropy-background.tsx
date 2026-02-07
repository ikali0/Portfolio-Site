import {
  useEffect,
  useRef,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";

interface EntropyBackgroundProps {
  className?: string;
}

export const EntropyBackground = forwardRef<
  HTMLDivElement,
  EntropyBackgroundProps
>(({ className = "" }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile = window.innerWidth < 640;

    /* ---------------- Config ---------------- */

    const GRID = isMobile ? 14 : 26;
    const CONNECT_DISTANCE = isMobile ? 80 : 140;
    const LINE_DISTANCE = isMobile ? 55 : 75;

    const COLORS = {
      purple: "#8b5cf6",
      purpleGlow: "rgba(167,139,250,",
      green: "#10b981",
      greenGlow: "rgba(52,211,153,",
      blue: "#3b82f6",
    };

    /* ---------------- Resize (FIXED scaling bug) ---------------- */

    function resize() {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      ctx.setTransform(1, 0, 0, 1, 0, 0); // RESET transform
      ctx.scale(dpr, dpr);

      return {
        width: rect.width,
        height: rect.height,
      };
    }

    let { width, height } = resize();

    /* ---------------- Scroll-linked depth ---------------- */

    let scrollFactor = 0;

    const onScroll = () => {
      scrollFactor =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener("scroll", onScroll);

    /* ---------------- Particle Class ---------------- */

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      order: boolean;
      pulse: number;

      constructor(x: number, y: number, order: boolean) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.order = order;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        if (this.order) {
          // Subtle order stabilization
          this.x += (this.baseX - this.x) * 0.03;
          this.y += (this.baseY - this.y) * 0.03;
        } else {
          // Chaos side movement
          this.vx += (Math.random() - 0.5) * 0.1;
          this.vy += (Math.random() - 0.5) * 0.1;

          this.vx *= 0.98;
          this.vy *= 0.98;

          this.x += this.vx;
          this.y += this.vy;
        }

        // 3D subtle depth drift
        const drift = scrollFactor * 30;
        this.y += drift * 0.002;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse =
          0.6 + Math.sin(time * 0.03 + this.pulse) * 0.4;

        const color = this.order
          ? COLORS.green
          : COLORS.purple;

        ctx.fillStyle = color;
        ctx.globalAlpha = pulse * 0.8;

        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }
    }

    /* ---------------- Generate Grid ---------------- */

    const particles: Particle[] = [];

    const spacingX = width / GRID;
    const spacingY = height / GRID;

    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const x = spacingX * i + spacingX / 2;
        const y = spacingY * j + spacingY / 2;
        particles.push(
          new Particle(x, y, x < width / 2)
        );
      }
    }

    /* ---------------- Animation Loop ---------------- */

    let frame: number;
    let time = 0;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        particles.forEach((p) => p.update(time));
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINE_DISTANCE) {
            const alpha =
              (1 - dist / LINE_DISTANCE) * 0.15;

            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) =>
        p.draw(ctx, time)
      );

      // Divider glow (smoother, layered)
      const glow =
        0.4 +
        Math.sin(time * 0.02) * 0.2;

      ctx.strokeStyle = `rgba(139,92,246,${glow})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      time++;
      frame = requestAnimationFrame(animate);
    }

    animate();

    /* ---------------- Resize ---------------- */

    const handleResize = () => {
      const dims = resize();
      width = dims.width;
      height = dims.height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 bg-background overflow-hidden",
        className
      )}
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
