import { Card } from "../types/gameType";

export const saveGameToLocalStorage = (
    cards: Card[],
    flippedCards: number[],
    moves: number,
    gameStatus: "in-progress" | "completed"
) => {
    const gameData = {
        cards,
        flippedCards,
        moves,
        gameStatus
    };
    localStorage.setItem('memoryGame', JSON.stringify(gameData));
};

export const getGameFromLocalStorage = (): {
    cards: Card[];
    flippedCards: number[];
    moves: number;
    gameStatus: "in-progress" | "completed"
} | null => {
    const savedData = localStorage.getItem('memoryGame');
    return savedData ? JSON.parse(savedData) : null;
};