import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  variant: "h1" | "h2" | "body" | "caption";
  fontWeight?: "bold" | "medium" | "regular" | "semibold";
  color: string;
  className?: string;
}

export function Typography({
  children,
  variant,
  color,
  className,
  fontWeight,
}: TypographyProps) {
  const variantClasses = {
    h1: "text-2xl",
    h2: "text-xl ",
    body: "text-sm",
    caption: "text-xs",
  };

  return (
    <p
      className={`${variantClasses[variant]} ${color} font-${fontWeight} ${className}`}
    >
      {children}
    </p>
  );
}
