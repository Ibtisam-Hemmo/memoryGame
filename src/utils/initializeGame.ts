import { Card, GameState, Levels, Themes } from "../types/gameType";
import { generateCards, getGridSize, getTimerByLevel } from "./generateCards";
import { getGameFromLocalStorage } from "./localStorage";

export const initializeGame = (theme: Themes, level: Levels): GameState => {
    const savedGame = getGameFromLocalStorage();

    if (savedGame && savedGame.gameStatus === "inProgress") {
        return {
            ...savedGame,
            theme: savedGame.theme || theme,
            level: savedGame.level || level,
            cards: savedGame.cards.map((card: Card) =>
                card.isMatched ? card : { ...card, isFlipped: false }
            ),
            flippedCards: [],
            highScores: savedGame.highScores
        };
    }

    return {
        flippedCards: [],
        moves: 0,
        gameStatus: "paused",
        theme,
        level,
        cards: generateCards(theme, level),
        gridSize: getGridSize(level),
        countDownTimer: getTimerByLevel(level),
        highScores: savedGame?.highScores || { easy: 0, medium: 0, hard: 0 }
    };
};

//fix the return when there is no game