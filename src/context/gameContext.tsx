import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { GameContextType, GameState, Levels, Themes } from '../types/gameType';
import { gameLogic } from '../utils/gameLogic';
import { saveGameToLocalStorage } from '../utils/localStorage';
import { initializeGame } from '../utils/initializeGame';
import { generateCards, getGridSize, getTimerByLevel } from '../utils/generateCards';

const initialState: GameContextType = {
    gameState: {
        cards: [],
        flippedCards: [],
        moves: 0,
        gameStatus: "inProgress",
        theme: "letters",
        level: "easy",
        gridSize: getGridSize("easy"),
        countDownTimer: getTimerByLevel("easy")
    },
    timeIncreaseEffect: false,
    flipCard: () => { },
    resetGame: () => { },
    startNewGame: () => { }
};

const GameContext = createContext<GameContextType>(initialState);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameState, setGameState] = useState(() => {
        return initializeGame(
            initialState.gameState.theme,
            initialState.gameState.level);
    });

    const [timeIncreaseEffect, setTimeIncreaseEffect] = useState(false);

    const flipCard = (cardId: number) => {
        if (gameState.gameStatus !== "inProgress") {
            return;
        }
        gameLogic(cardId, gameState, setTimeIncreaseEffect, setGameState);
    };

    const resetGame = () => {
        setGameState({
            theme: gameState.theme,
            level: gameState.level,
            cards: generateCards(gameState.theme, gameState.level),
            moves: 0,
            gameStatus: "inProgress",
            flippedCards: [],
            gridSize: getGridSize(gameState.level),
            countDownTimer: getTimerByLevel(gameState.level)
        });
    };

    const startNewGame = (theme: Themes, level: Levels) => {
        setGameState({
            theme: theme,
            level: level,
            cards: generateCards(theme, level),
            moves: 0,
            gameStatus: "inProgress",
            flippedCards: [],
            gridSize: getGridSize(level),
            countDownTimer: getTimerByLevel(level)
        });
        console.log("here is selected theme and level ", theme, level);
    };

    useEffect(() => {
        if (gameState.gameStatus === "inProgress" && gameState.countDownTimer > 0) {
            const interval = setInterval(() => {
                setGameState((prevState) => ({
                    ...prevState,
                    countDownTimer: prevState.countDownTimer - 1,
                }));
            }, 1000);

            return () => clearInterval(interval);
        } else if (gameState.countDownTimer === 0) {
            setGameState((prevState) => ({
                ...prevState,
                gameStatus: "failed",
            }));
        }
    }, [gameState.countDownTimer, gameState.gameStatus]);

    const previousGameState = useRef<GameState | null>(null);

    useEffect(() => {
        if (!previousGameState.current || JSON.stringify(gameState) !== JSON.stringify(previousGameState.current)) {
            saveGameToLocalStorage(gameState);
            previousGameState.current = gameState;
        }
    }, [gameState]);

    useEffect(() => {
        if (gameState.gameStatus === "failed") {
            localStorage.removeItem("memoryGame");
        }
    }, [gameState.gameStatus])

    return (
        <GameContext.Provider
            value={{
                gameState,
                timeIncreaseEffect,
                flipCard,
                resetGame,
                startNewGame
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
