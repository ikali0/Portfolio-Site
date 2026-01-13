import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export const FlippingCard = forwardRef<HTMLDivElement, FlippingCardProps>(
  ({ className, frontContent, backContent, height = 120, width = 100 }, ref) => {
    return (
      <div
        ref={ref}
        className="group/flipping-card [perspective:600px] sm:[perspective:800px] md:[perspective:1000px]"
        style={
          {
            "--height": `${height}px`,
            "--width": `${width}px`,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "relative rounded-md border border-border/50 bg-card shadow-sm transition-all duration-500",
            "[transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)]",
            "h-[var(--height)] w-[var(--width)]",
            // Notebook paper effect
            "bg-[linear-gradient(to_bottom,transparent_0px,transparent_19px,hsl(var(--border)/0.3)_19px,hsl(var(--border)/0.3)_20px)] bg-[length:100%_20px]",
            className
          )}
        >
          {/* Front Face */}
          <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-card/95 text-card-foreground [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)]">
            <div className="[transform:translateZ(20px)_scale(.97)] sm:[transform:translateZ(30px)_scale(.96)] h-full w-full">
              {frontContent}
            </div>
          </div>
          {/* Back Face */}
          <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-secondary/90 text-secondary-foreground [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="[transform:translateZ(20px)_scale(.97)] sm:[transform:translateZ(30px)_scale(.96)] h-full w-full">
              {backContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FlippingCard.displayName = "FlippingCard";

export default FlippingCard;
