"use client";

import React, {
  createContext, useContext, useEffect,
  useState, useRef, useCallback,
  useMemo
} from 'react';
import { useDebounce } from "../hooks/useDebounce";
import { GameContextType, GameState, Levels, Themes } from '../types/gameType';
import {
  gameLogic, sounds, playSound,
  getTimerByLevel, getGridSize, generateCards,
  initializeGame, saveGameToLocalStorage
} from '../utils/index';
import { useTheme } from '@/hooks/useTheme';

const initialState: GameContextType = {
  gameState: initializeGame("letters", "easy"),
  gameTheme:"light",
  timeIncreaseEffect: false,
  flipCard: () => { },
  resetGame: () => { },
  startNewGame: () => { },
  toggleTheme: () => { }
};

const GameContext = createContext<GameContextType>(initialState);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialState.gameState);
  const {theme:gameTheme, toggleTheme} = useTheme();
  const [timeIncreaseEffect, setTimeIncreaseEffect] = useState(false);
  const previousGameState = useRef<GameState | null>(null);
  const debouncedGameState = useDebounce(gameState, 500);


  useEffect(() => {
      if (
          !previousGameState.current ||
          JSON.stringify(debouncedGameState) !== JSON.stringify(previousGameState.current)
      ) {
          saveGameToLocalStorage(debouncedGameState);
          previousGameState.current = debouncedGameState;
      }
  }, [debouncedGameState]);

  useEffect(() => {
      document.body.className = `${gameTheme}-theme`;
      localStorage.setItem("gameTheme", gameTheme);
  }, [gameTheme]);

  const flipCard = useCallback((cardId: number) => {
      if (gameState.gameStatus !== "inProgress") return;
      gameLogic(cardId, gameState, setTimeIncreaseEffect, setGameState);
      playSound(sounds.flipCard);
  }, [gameState]);

  const resetGame = useCallback(() => {
      setGameState((prevState) => ({
          ...prevState,
          cards: generateCards(prevState.theme, prevState.level),
          moves: 0,
          gameStatus: "paused",
          flippedCards: [],
          gridSize: getGridSize(prevState.level),
          countDownTimer: getTimerByLevel(prevState.level)
      }));
  }, []);

  const startNewGame = useCallback((theme: Themes, level: Levels) => {
      setGameState({
          ...gameState,
          theme,
          level,
          cards: generateCards(theme, level),
          moves: 0,
          gameStatus: "inProgress",
          flippedCards: [],
          gridSize: getGridSize(level),
          countDownTimer: getTimerByLevel(level)
      });
  }, [gameState]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.gameStatus === "inProgress") {
      if (gameState.countDownTimer === 9) {
        playSound(sounds.countDownTimer);
      }
  
      if (gameState.countDownTimer > 0) {
        interval = setInterval(() => {
          setGameState(prev => {
            const newTime = prev.countDownTimer - 1;
            
            if (newTime <= 0) {
              return { 
                ...prev, 
                countDownTimer: 0,
                gameStatus: "failed" 
              };
            }
            
            return { ...prev, countDownTimer: newTime };
          });
        }, 1000);
      } else {
        setGameState(prev => ({
          ...prev,
          gameStatus: "failed"
        }));
      }
    }
  
    return () => clearInterval(interval);
  }, [gameState.gameStatus, gameState.countDownTimer]);
  
  useEffect(() => {
      if (gameState.gameStatus === "failed") {
      } else if (gameState.gameStatus === "completed") {
          setGameState((prevState) => {
              const { level, moves, highScores } = prevState;
              if (highScores[level] === 0 || moves < highScores[level]!) {
                  return { ...prevState, highScores: { ...highScores, [level]: moves } };
              }
              return prevState;
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
          startNewGame
      }),
      [gameState, timeIncreaseEffect, flipCard, resetGame, startNewGame, gameTheme, toggleTheme]
  );

  return (
      <GameContext.Provider value={contextValue}>
          {children}
      </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
