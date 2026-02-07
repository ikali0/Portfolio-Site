/**
 * SectionHeader Component
 * 
 * A consistent header for page sections with:
 * - Overline label (optional)
 * - Title
 * - Description (optional)
 * - Centered or left-aligned variants
 */
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
  className
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", align === "center" && "text-center", className)}>
      {overline && (
        <span className="text-overline uppercase tracking-widest text-accent font-semibold">
          {overline}
        </span>
      )}
      <h2 className="font-display text-h2 md:text-display-sm font-bold text-foreground mt-2">
        {title}
      </h2>
      {description && (
        <p className="text-body text-muted-foreground mt-4 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
export default SectionHeader;