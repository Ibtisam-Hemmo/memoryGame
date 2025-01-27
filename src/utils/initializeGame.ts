import { cards } from "../assets/Cards";
import { Card } from "../types/gameType";
import { getGameFromLocalStorage } from "./localStorage";
import { shuffle } from "./shuffleFunction";

export const initializeGame = (): {
    cards: Card[];
    flippedCards: number[];
    moves: number;
    gameStatus: "in-progress" | "completed";
} => {
    const savedGame = getGameFromLocalStorage();
    if (savedGame) {
        return savedGame;
    }
    return {
        cards: shuffle(cards),
        flippedCards: [],
        moves: 0,
        gameStatus: "in-progress",
    };
};

// export const initializeGame = (
//     setCards: React.Dispatch<React.SetStateAction<Card[]>>,
//     setFlippedCards: React.Dispatch<React.SetStateAction<number[]>>,
//     setMoves: React.Dispatch<React.SetStateAction<number>>,
//     setGameStatus: React.Dispatch<React.SetStateAction<'in-progress' | 'completed'>>

// ) => {
//     const savedGame = getGameFromLocalStorage();
//     if (savedGame) {
//         console.log('there is savedGame: ', savedGame);

//         const { cards, flippedCards, moves, gameStatus } = savedGame;
//         setCards(cards);
//         setFlippedCards(flippedCards);
//         setMoves(moves);
//         setGameStatus(gameStatus || 'in-progress');
//     } else {
//         setCards(shuffle(cards))
//     }
// };
