import { cn } from "@/lib/utils";
import { useState } from "react";

interface RobotFlybyProps {
  className?: string;
}

export const RobotFlyby = ({ className }: RobotFlybyProps) => {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full transition-transform duration-500",
        isInteracting && "scale-105",
        className
      )}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      <iframe
        src="https://my.spline.design/untitled-rv0hx3zVdoM6t2ydngxuS7zi/"
        className={cn(
          "w-full h-full transition-opacity duration-300",
          isInteracting ? "opacity-100" : "opacity-80"
        )}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default RobotFlyby;
