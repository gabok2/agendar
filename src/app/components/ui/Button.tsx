// components/buttons/Button.tsx
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Typography } from "./Typography";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: ReactNode;
  readonly onClick?: () => void;
  readonly variant: "filled" | "outlined";
  readonly color: "blue";
  readonly disabled?: boolean;
  readonly className?: string;
}

export function Button({
  children,
  onClick,
  variant,
  color,
  disabled = false,
  className = "",
  ...rest
}: ButtonProps) {
  const baseClasses =
    "rounded-lg transition-colors duration-200 flex items-center justify-center";

  const variantClasses = {
    filled: {
      blue: "bg-primary text-white hover:bg-blue-600 border-none",
    },
    outlined: {
      blue: "border border-primary text-primary hover:bg-blue-50",
    },
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant][color]}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
    px-8
    py-3
  `;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <Typography
        variant="caption"
        color={variant === "filled" ? "text-white" : `text-primary`}
        fontWeight="medium"
      >
        {children}
      </Typography>
    </button>
  );
}
