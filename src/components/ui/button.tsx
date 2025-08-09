import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring/50 shadow-md hover:shadow-lg",
  {
    variants: {
      variant: {
        default:
          "bg-green-500 text-white hover:bg-green-600 active:scale-[0.98]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400/50",
        outline:
          "border border-white/20 text-white bg-white/5 hover:bg-white/10",
        secondary: "bg-zinc-700 text-white hover:bg-zinc-600",
        ghost: "text-zinc-300 hover:bg-white/10",
        link: "text-green-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-2 text-sm",
        sm: "px-4 py-1.5 text-sm",
        lg: "px-6 py-3 text-base",
        icon: "p-2 w-10 h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
