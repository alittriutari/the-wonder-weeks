import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-sage-500 hover:bg-sage-600 text-white dark:bg-dusk-500 dark:hover:bg-dusk-400 shadow-sm",
  secondary:
    "bg-sage-100 hover:bg-sage-200 text-sage-800 dark:bg-dusk-800 dark:hover:bg-dusk-700 dark:text-dusk-100",
  ghost:
    "bg-transparent hover:bg-sage-100 text-sage-700 dark:hover:bg-dusk-800 dark:text-dusk-300",
  danger:
    "bg-coral-500 hover:bg-coral-400 text-white shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:ring-2 focus-visible:ring-sage-500 dark:focus-visible:ring-dusk-400",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {loading && (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      )}
      {children}
    </button>
  );
}
