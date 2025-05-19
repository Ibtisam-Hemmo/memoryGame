"use Client";

import { useEffect } from "react";
import { playSound } from "@/utils";

export const useSoundOnMount = (sound: string) => {
  useEffect(() => {
    playSound(sound);
  }, []);
};
