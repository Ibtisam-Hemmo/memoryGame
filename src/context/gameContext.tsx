import React, {
    createContext, useContext, useEffect,
    useState, useRef, useCallback,
    useMemo
} from 'react';
import { useDebounce } from "../hooks/useDebounce";
import { GameContextType, GameState, GameTheme, Levels, Themes } from '../types/gameType';
import {
    gameLogic, sounds, playSound,
    getTimerByLevel, getGridSize, generateCards,
    initializeGame, saveGameToLocalStorage
} from '../utils/index';
import { getInitialTheme } from '../utils/localStorage';

const initialState: GameContextType = {
    gameState: initializeGame("letters", "easy"),
    gameTheme: getInitialTheme(),
    timeIncreaseEffect: false,
    flipCard: () => { },
    resetGame: () => { },
    startNewGame: () => { },
    toggleTheme: () => { }
};

const GameContext = createContext<GameContextType>(initialState);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>(initialState.gameState);
    const [gameTheme, setGameTheme] = useState<GameTheme>(getInitialTheme);
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
        document.body.className = gameTheme === "dark" ? "dark-theme" : "light-theme";
        localStorage.setItem("gameTheme", gameTheme);
    }, [gameTheme]);

    const toggleTheme = useCallback(() => {
        setGameTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
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
        playSound(sounds.gameStart);
    }, [gameState]);

    useEffect(() => {
        if (gameState.gameStatus === "inProgress" && gameState.countDownTimer > 0) {
            if (gameState.countDownTimer === 9) {
                playSound(sounds.countDownTimer);
            }
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

    useEffect(() => {
        if (gameState.gameStatus === "failed") {
            playSound(sounds.lose);
        } else if (gameState.gameStatus === "completed") {
            setGameState((prevState) => {
                const { level, moves, highScores } = prevState;
                if (highScores[level] === 0 || moves < highScores[level]!) {
                    return { ...prevState, highScores: { ...highScores, [level]: moves } };
                }
                return prevState;
            });
            playSound(sounds.win);
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