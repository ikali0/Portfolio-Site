/**
 * Hero Section – Vibrant 3D animated hero with orbiting icons
 * Features a swipeable category carousel for project filtering
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import HeroFloatingIcons from "./ui/hero-floating-icons";
import HeroCategoryCarousel from "./ui/hero-category-carousel";
import { Entropy } from "./ui/entropy";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-gradient-to-b from-background via-background to-muted/20 px-4 py-5">
      {/* 3D Animated floating icons */}
      <HeroFloatingIcons />

      {/* Main content - Two column layout */}
      <div className="relative z-20 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left column - Text content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Accent label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold tracking-wide mb-6 px-3 text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI Engineer & Consultant
          </motion.span>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground leading-[1.1] tracking-tight mb-6"
          >
            Building AI systems
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-neural bg-clip-text text-primary">
              that hold up
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-muted-foreground max-w-md leading-relaxed mb-8"
          >
            From policy to production-grade control.
            AI systems engineered for compliance, audit, and real-world pressure.
          </motion.p>

          {/* CTA Buttons - Improved sizing and layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto"
          >
            <a
              href="#portfolio"
              className="lighting-button group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-200 w-full sm:w-auto min-w-[160px]"
            >
              View Projects
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 w-full sm:w-auto min-w-[160px]"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 pt-6 border-t border-border/30"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://www.linkedin.com/in/ik11/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center shadow-[0_3px_0_0_hsl(var(--primary)/0.4)] hover:shadow-[0_1px_0_0_hsl(var(--primary)/0.4)] hover:translate-y-[2px] active:shadow-none active:translate-y-[3px] transition-all duration-150 hover:bg-primary/20"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Connect on LinkedIn</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://medium.com/@altruisticxai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center shadow-[0_3px_0_0_hsl(var(--accent)/0.4)] hover:shadow-[0_1px_0_0_hsl(var(--accent)/0.4)] hover:translate-y-[2px] active:shadow-none active:translate-y-[3px] transition-all duration-150 hover:bg-accent/20"
                  >
                    <FontAwesomeIcon icon={faMedium} className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Read on Medium</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="mailto:hello@ingakali.com"
                    className="w-10 h-10 rounded-full bg-neural/10 border border-neural/30 text-neural flex items-center justify-center shadow-[0_3px_0_0_hsl(var(--neural)/0.4)] hover:shadow-[0_1px_0_0_hsl(var(--neural)/0.4)] hover:translate-y-[2px] active:shadow-none active:translate-y-[3px] transition-all duration-150 hover:bg-neural/20"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Send an email</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>

        {/* Right column - Entropy visualization + Category carousel */}
        <div className="flex flex-col items-center gap-6">
          {/* Entropy visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-lg blur-xl" />
            <Entropy size={280} className="relative z-10 bg-background/80 backdrop-blur-sm border border-border/50" />
          </motion.div>

          {/* Category Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full max-w-sm"
          >
            <HeroCategoryCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;