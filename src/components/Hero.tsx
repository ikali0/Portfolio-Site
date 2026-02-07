/**
 * Hero Section (Clean + Mobile First)
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import EntropyBackground from "./ui/entropy-background";
const Hero = () => {
  return <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 pt-24 pb-16">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <EntropyBackground />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/20 via-transparent to-background/90 pointer-events-none" aria-hidden="true" />

      <div className="relative z-20 w-full max-w-4xl mx-auto text-center md:text-left flex flex-col items-center md:items-start">

        {/* Badge */}
        <motion.span initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="inline-block text-xs uppercase tracking-wide px-3 py-1.5 rounded-full bg-secondary/15 border border-secondary/25 text-secondary-foreground mb-6">
          AI Engineer & Independent Consultant
        </motion.span>

        {/* Name */}
        <motion.h1 initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.1
      }} className="text-4xl sm:text-5xl md:text-6xl font-display tracking-tight mb-6">
          Inga K.
        </motion.h1>

        {/* Description */}
        <motion.p initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="text-base sm:text-lg text-foreground/80 max-w-xl leading-relaxed mb-10">
          I translate{" "}
          <span className="font-semibold italic text-secondary-foreground">
            policy into deployable controls
          </span>{" "}
          and build AI systems that hold up under compliance,
          security, and real-world pressure.
        </motion.p>

        {/* Social Buttons (Smaller + Mobile First) */}
        <TooltipProvider>
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="flex gap-3 mb-12">
            {/* LinkedIn */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="flex items-center justify-center w-9 h-9 rounded-md border border-[#0A66C2]/30 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 transition-colors" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} className="w-3.5 h-3.5 text-[#0A66C2]" />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                Connect professionally
              </TooltipContent>
            </Tooltip>

            {/* Email (Updated) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a href="mailto:ingakali95@gmail.com" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="flex items-center justify-center w-9 h-9 rounded-md border border-accent/30 bg-accent/10 hover:bg-accent/20 transition-colors" aria-label="Email">
                  <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-accent" />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                Send email
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </TooltipProvider>

        {/* Scroll Indicator */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6
      }} className="w-full flex justify-center md:justify-start">
          <a href="#about" className="flex flex-col items-center md:items-start text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs uppercase tracking-widest mb-2 text-secondary-foreground">
              Explore
            </span>
            <motion.div animate={{
            y: [0, 6, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity
          }}>
              <FontAwesomeIcon icon={faArrowDown} className="w-4 h-4 text-accent" />
            </motion.div>
          </a>
        </motion.div>

      </div>
    </section>;
};
export default Hero;