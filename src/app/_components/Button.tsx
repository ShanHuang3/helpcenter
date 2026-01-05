import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

/**
 * 可重用的按鈕組件
 * 支持多種變體和尺寸，提高靈活性和可訪問性
 */

export default function Button({
  text,
  icon,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantStyles = {
    primary: "bg-[var(--color-background-blue)] hover:opacity-80",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border-2 border-[var(--color-primary-light)] text-[var(--color-primary-light)] hover:bg-[var(--color-primary-light)]/10 focus:ring-[var(--color-primary-light)]",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{text}</span>
    </button>
  );
}
