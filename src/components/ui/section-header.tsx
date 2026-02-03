/**
 * SectionHeader Component
 *
 * A consistent header for page sections:
 * - Optional overline label
 * - Main title
 * - Optional description
 * - Alignment: 'center' or 'left'
 */

import { FC } from "react";
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
  return (
    <header className={cn("mb-10 md:mb-14", align === "center" ? "text-center" : "text-left", className)}>
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
    </header>
  );
};

export default SectionHeader;
