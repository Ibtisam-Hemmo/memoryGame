import {
  GameMode,
  GameState,
  GameTheme,
  Levels,
  Themes,
} from "../types/gameType";
import { generateCards, getGridSize } from "./generateCards";

const GAME_VERSION = "1.3.1";
const STORAGE_KEY = "memoryGame";
const DEFAULT_LEVEL: Levels = "easy";
const DEFAULT_THEME: Themes = "letters";
const DEFAULT_MODE: GameMode = "single";
const DEFAULT_TIMER = 150;

type ParsedData = {
  version?: string;
  state: Partial<GameState>;
};

export const saveGameToLocalStorage = (gameState: GameState) => {
  const gameData = {
    version: GAME_VERSION,
    state: gameState,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
  }
};

const loadGameFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : null;
  }
  return null;
};

const needsMigration = (savedVersion: string | null) => {
  return !savedVersion || savedVersion !== GAME_VERSION;
};

const migrateGameState = (parsedData: ParsedData): GameState => {
  console.log(
    `Migrating from v ${parsedData.version || "unknown"} to ${GAME_VERSION}`
  );
  const mode = parsedData.state.mode || DEFAULT_MODE;
  const defaultHighScores =
    mode === "multi"
      ? {
          "1": { easy: 0, medium: 0, hard: 0 },
          "2": { easy: 0, medium: 0, hard: 0 },
        }
      : {
          "1": { easy: 0, medium: 0, hard: 0 },
          "2": {},
        };
        console.log('defaultHighScores: ', defaultHighScores);

  const migratedState: GameState = {
    ...parsedData.state,
    level: parsedData.state.level || DEFAULT_LEVEL,
    theme: parsedData.state.theme || DEFAULT_THEME,
    cards: generateCards(
      parsedData.state.theme || DEFAULT_THEME,
      parsedData.state.level || DEFAULT_LEVEL
    ),
    gridSize: getGridSize(parsedData.state.level || DEFAULT_LEVEL),
    countDownTimer: parsedData.state.countDownTimer || DEFAULT_TIMER,
    highScores:
      parsedData.state.highScores &&
      typeof parsedData.state.highScores["1"] === "object"
        ? parsedData.state.highScores
        : defaultHighScores,
    flippedCards: parsedData.state.flippedCards || [],
    gameStatus: parsedData.state.gameStatus || "paused",
    previousMatchTime: parsedData.state.previousMatchTime || 0,
    currentPlayerId: "1",
    players: parsedData.state.players || [
      { id: "1", name: "Player 1", moves: 0, matches: 0, score: 0 },
      { id: "2", name: "Player 2", moves: 0, matches: 0, score: 0 },
    ],
    winner: parsedData.state.winner || " ",
    mode: parsedData.state.mode || DEFAULT_MODE,
  };

  console.log("After migration: ", migratedState);

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
  if (typeof window === "undefined") return "light";
  const savedTheme = localStorage.getItem("gameTheme");
  return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
};
