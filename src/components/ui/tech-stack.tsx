"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export interface Tech {
  name: string;
  url: string;
  color: string;
}

interface TechStackProps {
  techStack: Tech[];
  className?: string;
}

export const TechStack: React.FC<TechStackProps> = ({ techStack, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lightSize = 80;

  const lightX = useTransform(x, (v) => v - lightSize / 2);
  const lightY = useTransform(y, (v) => v - lightSize / 2);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className="relative bg-card/50 overflow-hidden w-full max-w-md h-60 pb-3 rounded-lg shadow-lg border border-border/40"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-background/60 rounded-lg backdrop-blur-xl" />

        {isHovered && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: lightSize,
              height: lightSize,
              background: "hsl(var(--primary) / 0.2)",
              filter: "blur(30px)",
              x: lightX,
              y: lightY,
            }}
          />
        )}

        <div className="relative z-10 flex flex-col justify-between p-6 h-full">
          <div className="flex items-center gap-2 text-foreground">
            <span className="text-base font-semibold">Skills</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {techStack.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground hover:bg-muted/50 transition-colors"
              >
                <span
                  className="w-2 h-2 mr-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                {tech.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
