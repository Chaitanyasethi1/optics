import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "dark" | "outline-dark" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  target,
  rel,
  type = "button",
  disabled = false,
  title,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] font-medium transition-all duration-300 rounded-[2px] disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-[11px]",
    lg: "px-8 py-3.5 text-[12px]",
  };

  const variantStyles = {
    primary:
      "bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] shadow-xs hover:shadow-sm",
    secondary:
      "border border-[#B89B6A] text-[#14110F] hover:bg-[#B89B6A] hover:text-[#14110F]",
    dark:
      "bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F]",
    "outline-dark":
      "border border-[#14110F]/20 text-[#14110F] hover:border-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC]",
    ghost:
      "text-[#14110F] hover:text-[#B89B6A] underline-offset-4 hover:underline px-0",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (href.startsWith("http") || href.startsWith("https") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={combinedClasses}
          title={title}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} title={title}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      title={title}
    >
      {children}
    </button>
  );
}
