'use client';

import { motion, Variants, useReducedMotion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  children: ReactNode;
  className?: string;
  animateIn?: "blurIn" | "fadeIn" | "slideUp" | "scaleIn";
  delay?: number;
  duration?: number;
  custom?: number;
  variants?: Variants;
}

const defaultVariants: Record<string, Variants> = {
  blurIn: {
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
    visible: (i: number = 0) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
  },
  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: (i: number = 0) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
  },
  slideUp: {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: (i: number = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  },
  scaleIn: {
    hidden: {
      scale: 0.9,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: (i: number = 0) => ({
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
  },
};

/**
 * TimelineContent - A scroll-triggered animation wrapper
 * Uses framer-motion's whileInView for viewport-based triggering
 */
export function TimelineContent({
  children,
  className,
  animateIn = "blurIn",
  delay = 0,
  duration = 0.5,
  custom = 0,
  variants,
}: TimelineContentProps) {
  const shouldReduceMotion = useReducedMotion();

  const selectedVariants = useMemo(() => {
    if (variants) return variants;
    
    const base = defaultVariants[animateIn];
    if (delay > 0 || duration !== 0.5) {
      return {
        hidden: base.hidden,
        visible: (i: number = 0) => ({
          ...((base.visible as (i: number) => object)(i)),
          transition: {
            delay: delay + i * 0.4,
            duration,
          },
        }),
      };
    }
    return base;
  }, [animateIn, delay, duration, variants]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={selectedVariants}
      custom={custom}
    >
      {children}
    </motion.div>
  );
}

/**
 * TimelineScale - A simpler scale/opacity animation wrapper
 */
interface TimelineScaleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  custom?: number;
}

export function TimelineScale({
  children,
  className,
  delay = 0,
  custom = 0,
}: TimelineScaleProps) {
  const shouldReduceMotion = useReducedMotion();

  const scaleVariants: Variants = {
    hidden: {
      scale: 0.95,
      opacity: 0,
    },
    visible: (i: number = 0) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: delay + i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={scaleVariants}
      custom={custom}
    >
      {children}
    </motion.div>
  );
}
