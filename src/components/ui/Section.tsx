import React from "react";

interface SectionProps {
  id?: string;
  theme?: "ivory" | "sand" | "ink" | "graphite";
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fullHeight?: boolean;
}

export default function Section({
  id,
  theme = "ivory",
  children,
  className = "",
  containerClassName = "",
  fullHeight = true,
}: SectionProps) {
  const themeStyles = {
    ivory: "bg-[#F7F3EC] text-[#14110F]",
    sand: "bg-[#EDE5D8] text-[#14110F]",
    ink: "bg-[#14110F] text-[#F7F3EC]",
    graphite: "bg-[#2A2623] text-[#F7F3EC]",
  };

  return (
    <section
      id={id}
      className={`relative w-full ${
        fullHeight ? "min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame" : ""
      } py-20 sm:py-24 xl:py-32 ${themeStyles[theme]} ${className}`}
    >
      <div
        className={`w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
