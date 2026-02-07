/**
 * Hero – Cinematic Production Edition
 */

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import EntropyBackground from "./ui/entropy-background";

const Hero = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ---------------- Scroll Fade Transition ---------------- */

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.96]);

  /* ---------------- Micro Sound Feedback ---------------- */

  const playClick = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  /* ---------------- Intro Fade ---------------- */

  return (
    <>
      {/* Cinematic Fade From Black */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="fixed inset-0 bg-black z-[9999] pointer-events-none"
      />

      <motion.section
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-28 pb-20"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <EntropyBackground />
        </div>

        {/* Glass Depth Layers */}
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90" />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-block text-xs uppercase tracking-widest px-4 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/50 text-muted-foreground mb-10"
          >
            AI Engineer & Independent Consultant
          </motion.span>

          {/* Name with Slow Zoom */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-display tracking-tight bg-gradient-to-r from-accent via-foreground to-secondary bg-[length:200%_200%] animate-gradientMove bg-clip-text text-transparent mb-8"
          >
            Inga K.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex gap-4 mb-16"
          >
            <motion.a
              href="https://www.linkedin.com/in/ik11/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-accent transition-all shadow-md"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 text-[#0A66C2]" />
            </motion.a>

            <motion.a
              href="mailto:ingakali95@gmail.com"
              onClick={playClick}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/70 backdrop-blur-md border border-border hover:border-secondary transition-all shadow-md"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-accent" />
            </motion.a>
          </motion.div>

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

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="/click-soft.mp3"
          preload="auto"
        />

        {/* Gradient Animation */}
        <style>
          {`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            .animate-gradientMove {
              animation: gradientMove 8s ease infinite;
            }
          `}
        </style>
      </motion.section>
    </>
  );
};

export default Hero;
