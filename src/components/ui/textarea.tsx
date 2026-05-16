import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-28 w-full resize-none rounded-2xl border border-[#E8DED1] bg-white px-4 py-3 text-sm text-[#1F1B16] shadow-sm outline-none transition placeholder:text-[#8A7F73] focus:border-[#B48A57] focus:ring-4 focus:ring-[#B48A57]/10",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
