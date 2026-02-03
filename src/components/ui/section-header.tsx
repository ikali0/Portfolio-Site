/**
 * SectionHeader Component
 *
 * A consistent header for page sections:
 * - Optional overline label
 * - Main title
 * - Optional description
 * - Alignment: 'center' or 'left'
 * - Mobile-first, fade-in + slide-up animation using Framer Motion
 */

import { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Small uppercase label above the title */
  overline?: string;
  /** Main section title */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Alignment: 'center' (default) or 'left' */
  align?: "center" | "left";
  /** Additional className for the container */
  className?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ overline, title, description, align = "center", className }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      className={cn("mb-10 md:mb-14", align === "center" ? "text-center" : "text-left", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
    >
      {overline && <p className="text-overline uppercase text-accent font-semibold mb-2">{overline}</p>}

      <h2 className="text-display-sm md:text-display-md font-display text-foreground mb-3">{title}</h2>

      {description && (
        <p
          className={cn(
            "text-body-sm md:text-body text-muted-foreground",
            align === "center" ? "mx-auto max-w-lg" : "max-w-full",
          )}
        >
          {description}
        </p>
      )}
    </motion.header>
  );
};

export default SectionHeader;
