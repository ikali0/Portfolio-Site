/**
 * HERO — AI LAB OS EDITION
 *
 * - Layered 3D name shadows
 * - Retro floating window
 * - Depth stack with perspective
 * - AI Lab aesthetic
 * - Email updated
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const Hero = () => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientY / innerHeight - 0.5) * -8;
      const y = (e.clientX / innerWidth - 0.5) * 8;
      rotateX.set(x);
      rotateY.set(y);
    };

    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    }
  }, [rotateX, rotateY]);

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden px-4 pt-24 pb-16 bg-background">

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        {/* Depth Stack Layers */}
        <div className="absolute inset-0 translate-x-6 translate-y-6 bg-secondary/10 border border-secondary/20 rounded-none" />
        <div className="absolute inset-0 translate-x-3 translate-y-3 bg-accent/10 border border-accent/20 rounded-none" />

        {/* Main Window */}
        <div className="relative bg-card border-2 border-border shadow-2xl rounded-none overflow-hidden">

          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-primary text-primary-foreground text-sm font-mono tracking-wide">
            <span>AI_LAB_OS.exe</span>
            <div className="flex gap-1">
              <span className="w-3 h-3 bg-muted rounded-sm" />
              <span className="w-3 h-3 bg-muted rounded-sm" />
              <span className="w-3 h-3 bg-destructive rounded-sm" />
            </div>
          </div>

          {/* Window Content */}
          <div className="p-8 sm:p-12 text-center md:text-left">

            {/* Status */}
            <div className="text-xs font-mono text-muted-foreground mb-6">
              SYSTEM STATUS: <span className="text-accent">ONLINE</span>
            </div>

            {/* 3D Layered Name */}
            <div className="relative inline-block mb-8">
              <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-display tracking-tight text-foreground z-10">
                Inga K.
              </h1>

              {/* Shadow Layers */}
              <h1 className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl font-display tracking-tight text-accent translate-x-2 translate-y-2 -z-10">
                Inga K.
              </h1>

              <h1 className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl font-display tracking-tight text-secondary translate-x-4 translate-y-4 -z-20">
                Inga K.
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed mb-10">
              Translating <span className="font-semibold italic text-foreground">
                policy into deployable controls
              </span>{" "}
              and building AI systems engineered for compliance,
              resilience, and operational reality.
            </p>

            {/* Social Actions */}
            <div className="flex gap-4 justify-center md:justify-start">

              <motion.a
                href="https://www.linkedin.com/in/ik11/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-accent bg-accent/10 hover:bg-accent/20 font-mono text-sm"
              >
                LINKEDIN
              </motion.a>

              <motion.a
                href="mailto:ingakali95@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-secondary bg-secondary/10 hover:bg-secondary/20 font-mono text-sm"
              >
                EMAIL
              </motion.a>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12 flex justify-center md:justify-start">
              <motion.a
                href="#about"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-muted-foreground hover:text-foreground font-mono text-sm flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faArrowDown} />
                ENTER SYSTEM
              </motion.a>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
