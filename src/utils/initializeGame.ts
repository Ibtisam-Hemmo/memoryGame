import { Card, GameState, HighScores, Levels, Themes } from "../types/gameType";
import { generateCards, getGridSize, getTimerByLevel } from "./generateCards";
import { getGameFromLocalStorage } from "./localStorage";

export const initializeGame = (theme: Themes, level: Levels): GameState => {
    const savedGame = getGameFromLocalStorage();

    if (savedGame && savedGame.gameStatus === "inProgress") {
        return {
            ...savedGame,
            theme: savedGame.theme || theme,
            level: savedGame.level || level,
            cards: resetUnmatchedCards(savedGame.cards),
            flippedCards: [],
        };
    }

    return createNewGameState(theme, level, savedGame?.highScores || { easy: 0, medium: 0, hard: 0 });
};

const resetUnmatchedCards = (cards: Card[]): Card[] => {
    return cards.map((card) =>
        card.isMatched ? card : { ...card, isFlipped: false }
    );
};

const createNewGameState = (theme: Themes, level: Levels, highScores: HighScores): GameState => ({
    flippedCards: [],
    moves: 0,
    gameStatus: "paused",
    theme,
    level,
    cards: generateCards(theme, level),
    gridSize: getGridSize(level),
    countDownTimer: getTimerByLevel(level),
    highScores
});

