type Card = {
  id: number;
  type: string;
  content: string;
  lastFlipTime: number;
  isFlipped: boolean;
  isMatched: boolean;
};

type GameStatus = "paused" | "inProgress" | "completed" | "failed";

type Themes = "letters" | "images" | "icons";

type Levels = "easy" | "medium" | "hard";

type GameTheme = "dark" | "light";

type GameMode = "single" | "multi";

type GridSize = {
  rows: number;
  columns: number;
};

type HighScores = {
  [playerId: string]: {
    easy?: number;
    medium?: number;
    hard?: number;
  };
};

interface Player {
  id: string;
  name: string;
  moves: number;
  matches: number;
  score: number;
}

interface GameState {
  mode: GameMode;
  players: Player[];
  currentPlayerId: string;
  cards: Card[];
  flippedCards: number[];
  winner: string;
  gameStatus: GameStatus;
  theme: Themes;
  level: Levels;
  gridSize: GridSize;
  countDownTimer: number;
  highScores: HighScores;
  previousMatchTime: number;
}

type GameContextType = {
  gameState: GameState;
  gameTheme: GameTheme;
  timeIncreaseEffect: boolean;
  toggleTheme: () => void;
  flipCard: (id: number) => void;
  resetGame: () => void;
  startNewGame: (theme: Themes, level: Levels, mode: GameMode) => void;
};

export type {
  Player,
  Card,
  GameState,
  GameMode,
  GameTheme,
  HighScores,
  Themes,
  Levels,
  GameStatus,
  GameContextType,
};
