import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({
  className,
  type,
  ...props
}, ref) => {
  return <input type={type} className={cn("absolute inset-0 size-full shadow-md sm:shadow-sm", className)} ref={ref} {...props} />;
});
Input.displayName = "Input";
export { Input };