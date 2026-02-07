/**
 * Hero – Cinematic 3D Editorial Edition
 */

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons"
import EntropyBackground from "./ui/entropy-background"

const NAME = "Inga K."

export default function Hero() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [typed, setTyped] = useState("")

  /* ---------------- Scroll Depth ---------------- */

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.96])

  /* ---------------- Typewriter ---------------- */

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTyped(NAME.slice(0, index + 1))
      index++
      if (index === NAME.length) clearInterval(interval)
    }, 120)
    return () => clearInterval(interval)
  }, [])

  /* ---------------- Click Sound ---------------- */

  const playClick = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }

  return (
    <>
      {/* Cinematic Intro Fade */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="fixed inset-0 bg-black z-[9999] pointer-events-none"
      />

      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-28 pb-20"
      >
        {/* ---------------- Vivid 3D Background ---------------- */}

        <div className="absolute inset-0 z-0">

          {/* Base entropy layer */}
          <EntropyBackground />

          {/* Radial light burst */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.25),transparent_50%)]" />

          {/* Secondary glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--accent)/0.18),transparent_60%)]" />

          {/* Moving depth gradient */}
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-30 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 bg-[length:200%_200%]"
          />

          {/* Subtle grain overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:3px_3px]" />
        </div>

        {/* Mobile-friendly blur layers */}
        <div className="absolute inset-0 bg-background/10 backdrop-blur-sm sm:backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90" />

        {/* ---------------- Content ---------------- */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs uppercase tracking-widest px-4 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/40 text-muted-foreground mb-10"
          >
            AI Engineer & Independent Consultant
          </motion.span>

          {/* Name – Typewriter */}
          <h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display tracking-tight leading-[1.05] mb-8">
            <span className="bg-gradient-to-r from-accent via-foreground to-secondary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradientMove">
              {typed}
            </span>

            {/* Blinking Cursor */}
            <span className="inline-block w-[2px] h-[1em] bg-foreground ml-1 animate-pulse" />
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-base sm:text-lg text-foreground/80 max-w-lg leading-relaxed mb-14 px-2"
          >
            I translate{" "}
            <span className="font-semibold italic text-foreground">
              policy into deployable controls
            </span>{" "}
            and build AI systems engineered for compliance,
            security, and operational reality.
          </motion.p>

          {/* Social Buttons */}
          <div className="flex gap-4 mb-16">
            <motion.a
              href="https://www.linkedin.com/in/ik11/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-primary transition-all shadow-md"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 text-primary" />
            </motion.a>

            <motion.a
              href="mailto:ingakali95@gmail.com"
              onClick={playClick}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-secondary transition-all shadow-md"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-accent" />
            </motion.a>
          </div>

          {/* Scroll Indicator */}
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-3">
              Explore
            </span>
            <FontAwesomeIcon icon={faArrowDown} className="w-4 h-4 text-accent" />
          </motion.a>
        </motion.div>

        {/* Audio */}
        <audio ref={audioRef} src="/click-soft.mp3" preload="auto" />

        {/* Gradient Animation */}
        <style>
          {`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradientMove {
              animation: gradientMove 10s ease infinite;
            }
          `}
        </style>
      </motion.section>
    </>
  )
}
