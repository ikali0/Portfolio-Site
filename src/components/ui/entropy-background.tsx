import { memo, useId } from "react";

const EntropyBackground = memo(() => {
  const patternId = useId();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="25" cy="25" r="1" fill="hsl(var(--primary))" opacity="0.1" />
            <circle cx="75" cy="75" r="1" fill="hsl(var(--accent))" opacity="0.1" />
            <circle cx="50" cy="10" r="1" fill="hsl(var(--secondary))" opacity="0.1" />
            <circle cx="10" cy="90" r="1" fill="hsl(var(--primary))" opacity="0.1" />
            <circle cx="90" cy="40" r="1" fill="hsl(var(--accent))" opacity="0.1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-teal-50/20 to-lime-50/30 dark:from-purple-950/20 dark:via-teal-950/10 dark:to-lime-950/20" />
    </div>
  );
});

EntropyBackground.displayName = "EntropyBackground";
export default EntropyBackground;
