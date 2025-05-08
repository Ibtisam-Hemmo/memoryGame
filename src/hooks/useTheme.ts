"use client";

import { GameTheme } from "@/types/gameType";
import { getInitialTheme } from "@/utils/localStorage";
import { useEffect, useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState<GameTheme>('light');
    
    useEffect(() => {
      setTheme(getInitialTheme());
    }, []);
  
    const toggleTheme = () => {
      setTheme(prev => {
        const newTheme = prev === 'light' ? 'dark' : 'light';
        localStorage.setItem("gameTheme", newTheme);
        return newTheme;
      });
    };
  
    return { theme, toggleTheme };
  };