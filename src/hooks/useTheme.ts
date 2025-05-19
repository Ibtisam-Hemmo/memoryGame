"use client";

import { GameTheme } from "@/types/gameType";
import { getInitialTheme } from "@/utils/localStorage";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<GameTheme>("light");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.body.className = `${initialTheme}-theme`;
  }, []);

  useEffect(() => {
    localStorage.setItem("gameTheme", theme);
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
