"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: "Design", level: 95 },
  { name: "Development", level: 90 },
  { name: "Branding", level: 85 },
  { name: "Motion", level: 78 },
  { name: "Strategy", level: 82 },
];

export function Skills(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      aria-label="Skills"
      className="flex flex-col w-full max-w-md"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-12 bg-foreground/20 dark:bg-foreground/10" />
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
          Expertise
        </span>
      </div>

      {/* Skills list */}
      <div className="flex flex-col gap-1">
        {skills.map((skill, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={skill.name}
              className="group relative"
            >
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                className={cn(
                  "relative w-full flex items-center justify-between py-5 px-4 -mx-4",
                  "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "rounded-lg outline-none",
                  isActive
                    ? "bg-foreground/[0.03] dark:bg-foreground/[0.05]"
                    : "bg-transparent"
                )}
              >
                {/* Left side */}
                <div className="relative flex items-center gap-4">
                  <div
                    className={cn(
                      "h-5 w-0.5 rounded-full transition-all duration-500",
                      isActive
                        ? "bg-accent scale-y-100 opacity-100"
                        : "bg-border scale-y-50 opacity-0"
                    )}
                  />

                  <span
                    className={cn(
                      "text-base font-medium tracking-tight transition-all duration-500",
                      isActive
                        ? "text-foreground translate-x-0"
                        : "text-muted-foreground -translate-x-5"
                    )}
                  >
                    {skill.name}
                  </span>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                  {/* Progress bar */}
                  <div
                    className="relative w-24 h-1 rounded-full overflow-hidden bg-border/50 dark:bg-border/30"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency`}
                  >
                    <div className="absolute inset-0 bg-muted/50 dark:bg-muted/20" />

                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full",
                        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "bg-gradient-to-r from-accent/80 to-accent"
                      )}
                      style={{
                        width: isActive ? `${skill.level}%` : "0%",
                        transitionDelay: isActive ? "100ms" : "0ms",
                      }}
                    />

                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
                        "transition-transform duration-700 ease-out",
                        isActive ? "translate-x-full" : "-translate-x-full"
                      )}
                      style={{
                        transitionDelay: isActive ? "300ms" : "0ms",
                      }}
                    />
                  </div>

                  {/* Percentage */}
                  <div className="relative w-10 overflow-hidden">
                    <span
                      className={cn(
                        "block text-sm font-mono tabular-nums text-right",
                        "transition-all duration-500",
                        isActive
                          ? "text-foreground opacity-100 translate-y-0 blur-0"
                          : "text-muted-foreground/40 opacity-0 translate-y-3 blur-sm"
                      )}
                    >
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </button>

              {/* Divider */}
              {index < skills.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-px transition-all duration-500",
                    isActive || activeIndex === index + 1
                      ? "bg-transparent"
                      : "bg-border/30 dark:bg-border/20"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border/30 dark:border-border/20">
        <div className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
        <p className="text-[11px] text-muted-foreground tracking-wide">
          Hover or focus to explore
        </p>
      </div>
    </section>
  );
}
