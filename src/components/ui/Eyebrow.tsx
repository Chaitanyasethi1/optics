import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export default function Eyebrow({
  children,
  className = "",
  theme = "light",
}: EyebrowProps) {
  return (
    <span
      className={`inline-block font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.28em] font-medium ${
        theme === "dark" ? "text-[#D4BE96]" : "text-[#B89B6A]"
      } ${className}`}
    >
      {children}
    </span>
  );
}
