import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { GameContextType, GameState } from '../types/gameType';
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
    flipCard: () => { },
    resetGame: () => { },
};

const GameContext = createContext<GameContextType>(initialState);


export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialGameState = useMemo(() => {
        return initializeGame(
            initialState.gameState.theme,
            initialState.gameState.level
        );
    }, []);

    const [gameState, setGameState] = useState(initialGameState)
    // const [lockBoard, setLockBoard] = useState<boolean>(false);

    const flipCard = (cardId: number) => {
        if (gameState.gameStatus !== "inProgress") {
            return;
        }
        gameLogic(
            cardId,
            gameState,
            setGameState
        );
    };

    const resetGame = () => {
        setGameState({
            ...gameState,
            cards: generateCards(gameState.theme, gameState.level),
            moves: 0,
            gameStatus: "inProgress",
            flippedCards: [],
            gridSize: getGridSize(gameState.level),
            countDownTimer: getTimerByLevel(gameState.level)
        });
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
            previousGameState.current = gameState; // Update the reference after saving
        }
    }, [gameState]);

    return (
        <GameContext.Provider
            value={{
                gameState,
                flipCard,
                resetGame
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);


// TODO: useMemo + track rendering + proiler exte