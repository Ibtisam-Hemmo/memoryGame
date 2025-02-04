import { Card, GameState, Levels, Themes } from "../types/gameType";
import { generateCards, getGridSize, getTimerByLevel } from "./generateCards";
import { getGameFromLocalStorage } from "./localStorage";

export const initializeGame = (theme: Themes, level: Levels): GameState => {
    const savedGame = getGameFromLocalStorage();
    console.log('savedGame: ', savedGame);

    if (savedGame) {
        return {
            ...savedGame,
            theme: theme,
            level: level,
            cards: savedGame.cards.map((card: Card) =>
                card.isMatched ? card : { ...card, isFlipped: false }
            ),
            flippedCards: [],
        };
    }
    return {
        flippedCards: [],
        moves: 0,
        gameStatus: "inProgress",
        theme,
        level,
        cards: generateCards(theme, level),
        gridSize: getGridSize(level),
        countDownTimer: getTimerByLevel(level)
    };
};
