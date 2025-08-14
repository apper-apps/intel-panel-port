import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ className, variant = "default", size = "md", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:from-primary-600 hover:to-primary-700 hover:shadow-xl hover:scale-105",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg hover:from-secondary-600 hover:to-secondary-700 hover:shadow-xl hover:scale-105",
    success: "bg-gradient-to-r from-success-500 to-success-600 text-white shadow-lg hover:from-success-600 hover:to-success-700 hover:shadow-xl hover:scale-105",
    outline: "border border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:border-primary-500 hover:text-white backdrop-blur-sm",
    ghost: "text-slate-300 hover:bg-slate-800/50 hover:text-white"
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;