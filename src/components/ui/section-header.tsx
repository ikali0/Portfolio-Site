/**
 * SectionHeader Component
 *
 * A consistent header for page sections with:
 * - Overline label (optional)
 * - Title
 * - Description (optional)
 * - Centered or left-aligned variants
 */

import React from "react";
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

export function SectionHeader({
  overline,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps): JSX.Element {
  // Generate an ID for aria-labelledby if needed
  const titleId = React.useId();

  return (
    <header
      role="region"
      aria-labelledby={titleId}
      className={cn("mb-10 md:mb-14", align === "center" && "text-center", align === "left" && "text-left", className)}
    >
      {overline && <p className="text-overline uppercase text-accent font-semibold mb-2">{overline}</p>}
      <h2 id={titleId} className="text-display-sm md:text-display-md font-display text-foreground mb-3">
        {title}
      </h2>
      {description && <p className="text-body-sm md:text-body text-muted-foreground max-w-lg mx-auto">{description}</p>}
    </header>
  );
}

export default SectionHeader;
