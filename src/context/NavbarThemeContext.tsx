"use client";

import React, { createContext, useContext, useState } from "react";

export type NavbarTheme = "light" | "dark";

interface NavbarThemeContextType {
  theme: NavbarTheme;
  setTheme: (theme: NavbarTheme) => void;
  isHomeSnapDeck: boolean;
  setIsHomeSnapDeck: (isDeck: boolean) => void;
}

const NavbarThemeContext = createContext<NavbarThemeContextType>({
  theme: "light",
  setTheme: () => {},
  isHomeSnapDeck: false,
  setIsHomeSnapDeck: () => {},
});

export function NavbarThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<NavbarTheme>("light");
  const [isHomeSnapDeck, setIsHomeSnapDeck] = useState(false);

  return (
    <NavbarThemeContext.Provider value={{ theme, setTheme, isHomeSnapDeck, setIsHomeSnapDeck }}>
      {children}
    </NavbarThemeContext.Provider>
  );
}

export function useNavbarTheme() {
  return useContext(NavbarThemeContext);
}
