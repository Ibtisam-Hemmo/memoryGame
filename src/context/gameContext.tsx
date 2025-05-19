"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

import {
  GameContextType,
  GameMode,
  GameState,
  Levels,
  Themes,
} from "../types/gameType";
import {
  gameLogic,
  sounds,
  playSound,
  initializeGame,
  saveGameToLocalStorage,
  createNewGameState,
} from "../utils/index";
import { useTheme, useTimer, useDebounce } from "@/hooks";

const initialState: GameContextType = {
  gameState: initializeGame("icons", "medium", "single", "paused"),
  gameTheme: "light",
  timeIncreaseEffect: false,
  flipCard: () => {},
  resetGame: () => {},
  startNewGame: () => {},
  toggleTheme: () => {},
};

const GameContext = createContext<GameContextType>(initialState);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>(initialState.gameState);
  const { theme: gameTheme, toggleTheme } = useTheme();
  const [timeIncreaseEffect, setTimeIncreaseEffect] = useState(false);
  const previousGameState = useRef<GameState | null>(null);
  const debouncedGameState = useDebounce(gameState, 500);

  useEffect(() => {
    if (
      !previousGameState.current ||
      JSON.stringify(debouncedGameState) !==
        JSON.stringify(previousGameState.current)
    ) {
      saveGameToLocalStorage(debouncedGameState);
      previousGameState.current = debouncedGameState;
    }
  }, [debouncedGameState]);

  const flipCard = useCallback(
    (cardId: number) => {
      if (gameState.gameStatus !== "inProgress") return;
      gameLogic(cardId, gameState, setTimeIncreaseEffect, setGameState);
      playSound(sounds.flipCard);
    },
    [gameState]
  );

  const resetGame = useCallback(() => {
    setGameState((prevState) =>
      createNewGameState(
        prevState.theme,
        prevState.level,
        prevState.highScores,
        prevState.mode,
        "paused"
      )
    );
  }, []);

  const startNewGame = useCallback(
    (theme: Themes, level: Levels, mode: GameMode) => {
      setGameState((prevState) =>
        createNewGameState(
          theme,
          level,
          prevState.highScores,
          mode,
          "inProgress"
        )
      );
    },
    []
  );

  useTimer({
    isActive: gameState.gameStatus === "inProgress",
    timeLeft: gameState.countDownTimer,
    onTick: () => {
      setGameState((prev) => {
        const newTime = prev.countDownTimer - 1;

        if (newTime === 9) {
          playSound(sounds.countDownTimer);
        }

        return {
          ...prev,
          countDownTimer: newTime > 0 ? newTime : 0,
        };
      });
    },
    onFinish: () => {
      setGameState((prev) => ({
        ...prev,
        gameStatus: "failed",
        countDownTimer: 0,
      }));
    },
  });

  useEffect(() => {
    if (gameState.gameStatus === "completed") {
      setGameState((prevState) => {
        const { level, players, highScores } = prevState;
        const updatedHighScores = { ...highScores };

        players.forEach((player) => {
          const currentPlayerScores = updatedHighScores[player.id] || {
            easy: 0,
            medium: 0,
            hard: 0,
          };

          if (
            !currentPlayerScores[level] ||
            player.moves < currentPlayerScores[level]
          ) {
            currentPlayerScores[level] = player.moves;
          }

          updatedHighScores[player.id] = currentPlayerScores;
        });

        return { ...prevState, highScores: updatedHighScores };
      });
    }
  }, [gameState.gameStatus]);

  const contextValue = useMemo(
    () => ({
      gameState,
      gameTheme,
      toggleTheme,
      timeIncreaseEffect,
      flipCard,
      resetGame,
      startNewGame,
    }),
    [
      gameState,
      timeIncreaseEffect,
      flipCard,
      resetGame,
      startNewGame,
      gameTheme,
      toggleTheme,
    ]
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
