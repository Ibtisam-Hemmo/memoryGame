
"use Client";

import { useEffect } from "react";
import { playSound } from "@/utils";

const useSoundOnMount = (sound: string) => {
  useEffect(() => {
    playSound(sound);
  }, []);
};

export default useSoundOnMount;
