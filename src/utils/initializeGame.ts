import {
  Card,
  GameMode,
  GameState,
  GameStatus,
  HighScores,
  Levels,
  Themes,
} from "../types/gameType";
import { generateCards, getGridSize, getTimerByLevel } from "./generateCards";
import { getGameFromLocalStorage } from "./localStorage";

export const initializeGame = (
  theme: Themes,
  level: Levels,
  mode: GameMode,
  status:GameStatus
): GameState => {
  const savedGame = getGameFromLocalStorage();

  if (savedGame && savedGame.gameStatus === "inProgress") {
    return {
      ...savedGame,
      theme: savedGame.theme || theme,
      level: savedGame.level || level,
      cards: resetUnmatchedCards(savedGame.cards),
      flippedCards: [],
      previousMatchTime: savedGame.previousMatchTime || 0,
      currentPlayerId: savedGame.currentPlayerId || "1",
      players: savedGame.players || [
        { playerId: "1", name: "Player 1", moves: 0, matches: 0, score: 0 },
        { playerId: "2", name: "Player 2", moves: 0, matches: 0, score: 0},
      ],
      winner: savedGame.winner || " ",
      mode: savedGame.mode || mode,
      gameStatus: "paused" 
    };
  }

  return createNewGameState(
    theme,
    level,
    savedGame?.highScores || {
      "1": { easy: 0, medium: 0, hard: 0 },
      ...(mode === "multi" && { "2": { easy: 0, medium: 0, hard: 0 } }),
    },
    mode,
    status
  );
};

const resetUnmatchedCards = (cards: Card[]): Card[] => {
  return cards.map((card) =>
    card.isMatched ? card : { ...card, isFlipped: false }
  );
};

export const createNewGameState = (
  theme: Themes,
  level: Levels,
  highScores: HighScores,
  mode: GameMode,
  status: GameStatus
): GameState => ({
  flippedCards: [],
  currentPlayerId: "1",
  players:
    mode === "multi"
      ? [
          { id: "1", name: "Player 1", moves: 0, matches: 0, score: 0 },
          { id: "2", name: "Player 2", moves: 0, matches: 0, score: 0 },
        ]
      : [{ id: "1", name: "Player 1", moves: 0, matches: 0, score: 0 }],
  winner: " ",
  gameStatus: status,
  mode,
  theme,
  level,
  cards: generateCards(theme, level),
  gridSize: getGridSize(level),
  countDownTimer: getTimerByLevel(level),
  highScores,
  previousMatchTime: 0,
});
