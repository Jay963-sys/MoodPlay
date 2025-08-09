"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  className,
  type = "text",
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          {leftIcon}
        </div>
      )}

      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border border-zinc-700 bg-white/5 backdrop-blur-sm px-3 py-2 text-sm text-white placeholder:text-muted-foreground shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF3100]/80 focus:border-[#FF3100]",
          leftIcon && "pl-10",
          rightIcon && "pr-10",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />

      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
