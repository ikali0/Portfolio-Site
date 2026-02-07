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
    <div className={cn(
      "mb-container md:mb-container-lg",
      align === "center" && "text-center",
      className
    )}>
      {overline && (
        <p className="text-overline uppercase text-accent font-semibold mb-element-sm">
          {overline}
        </p>
      )}
      <h2 className="font-display text-display-sm text-foreground mb-element-sm">
        {title}
      </h2>
      {description && (
        <p className="text-body-sm text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
export default SectionHeader;