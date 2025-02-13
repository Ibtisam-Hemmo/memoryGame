import { GameState, GameTheme, Levels, Themes } from "../types/gameType";
import { generateCards, getGridSize } from "./generateCards";

const GAME_VERSION = "1.2";
const STORAGE_KEY = "memoryGame";
const DEFAULT_LEVEL: Levels = "easy";
const DEFAULT_THEME: Themes = "letters";
const DEFAULT_TIMER = 150;
const DEFAULT_HIGH_SCORES = { easy: 0, medium: 0, hard: 0 };

type ParsedData = {
    version?: string;
    state: Partial<GameState>
};

export const saveGameToLocalStorage = (gameState: GameState) => {
    const gameData = {
        version: GAME_VERSION,
        state: gameState
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
};

const loadGameFromLocalStorage = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : null;
};

const needsMigration = (savedVersion: string | null) => {
    return !savedVersion || savedVersion !== GAME_VERSION;
};

const migrateGameState = (parsedData: ParsedData): GameState => {
    console.log(`Migrating from v ${parsedData.version || "unknown"} to ${GAME_VERSION}`);

    const migratedState: GameState = {
        ...parsedData.state,
        level: parsedData.state.level || DEFAULT_LEVEL,
        theme: parsedData.state.theme || DEFAULT_THEME,
        cards: generateCards(parsedData.state.theme || DEFAULT_THEME, parsedData.state.level || DEFAULT_LEVEL),
        gridSize: getGridSize(parsedData.state.level || DEFAULT_LEVEL),
        countDownTimer: parsedData.state.countDownTimer || DEFAULT_TIMER,
        highScores: parsedData.state.highScores || DEFAULT_HIGH_SCORES,
        flippedCards: parsedData.state.flippedCards || [],
        moves: parsedData.state.moves || 0,
        gameStatus: parsedData.state.gameStatus || "paused"
    };

    console.log('After migration: ', migratedState);

    saveGameToLocalStorage(migratedState);
    return migratedState;
};


export const getGameFromLocalStorage = (): GameState | null => {
    const parsedData = loadGameFromLocalStorage();
    if (!parsedData) return null;

    if (needsMigration(parsedData.version)) {
        return migrateGameState(parsedData);
    }

    return parsedData.state;
};

export const getInitialTheme = (): GameTheme => {
    const savedTheme = localStorage.getItem("gameTheme");
    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
};
