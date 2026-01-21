import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EntropyBackgroundProps {
  category?: string;
  className?: string;
  intensity?: number; // 0..1, controls saturation/opacity of the effect
}

/*
  Simple palette mapping. Use HSL strings so you can tweak hues easily.
  Add or tweak palettes to taste.
*/
const PALETTES: Record<string, string[]> = {
  All: ["hsl(260 60% 68% / 0.12)", "hsl(320 65% 58% / 0.08)"],
  "AI Ethics": ["hsl(200 60% 66% / 0.12)", "hsl(260 50% 60% / 0.09)"],
  Governance: ["hsl(140 45% 54% / 0.12)", "hsl(180 40% 46% / 0.08)"],
  Security: ["hsl(12 70% 56% / 0.12)", "hsl(340 60% 48% / 0.09)"],
  Services: ["hsl(45 80% 60% / 0.12)", "hsl(25 75% 50% / 0.08)"],
  default: ["hsl(250 50% 60% / 0.10)", "hsl(300 55% 52% / 0.07)"],
};

export const EntropyBackground: React.FC<EntropyBackgroundProps> = ({
  category = "All",
  className,
  intensity = 1,
}) => {
  const colors = useMemo(() => {
    return PALETTES[category] ?? PALETTES["default"];
  }, [category]);

  // Compose two layered gradients for depth
  const gradientA = `radial-gradient(60% 60% at 10% 20%, ${colors[0]})`;
  const gradientB = `linear-gradient(135deg, ${colors[1]}, transparent 60%)`;
  const composed = `${gradientA}, ${gradientB}`;

  return (
    <motion.div
      key={category} // ensures framer-motion crossfades/animates between categories
      initial={{ opacity: 0 }}
      animate={{ opacity: Math.min(0.95 * intensity, 0.95) }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundImage: composed,
        // Force hardware acceleration & 3D compositing on mobile
        transform: "translateZ(0)",
        willChange: "opacity, background-image",
      }}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 mix-blend-normal saturate-110 filter",
        className
      )}
      aria-hidden
    />
  );
};

export default EntropyBackground;
