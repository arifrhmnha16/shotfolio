import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-2xl border border-[#E8DED1] bg-white px-4 text-sm text-[#1F1B16] shadow-sm outline-none transition placeholder:text-[#8A7F73] focus:border-[#B48A57] focus:ring-4 focus:ring-[#B48A57]/10",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
