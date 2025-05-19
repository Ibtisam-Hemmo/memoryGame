"use client";

import { useEffect, useRef } from "react";

interface UseTimerProps {
  isActive: boolean;
  timeLeft: number;
  onTick: () => void;
  onFinish: () => void;
}

export const useTimer = ({
  isActive,
  timeLeft,
  onTick,
  onFinish,
}: UseTimerProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    intervalRef.current = setInterval(() => {
      onTick();

      if (timeLeft <= 1) {
        clearInterval(intervalRef.current!);
        onFinish();
      }
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isActive, timeLeft, onTick, onFinish]);
};
