import React from "react";

interface TypographyProps {
  readonly children: React.ReactNode;
  readonly variant: "h1" | "h2" | "body" | "caption";
  readonly fontWeight?: "bold" | "medium" | "regular" | "semibold";
  readonly color: string;
  readonly className?: string;
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
