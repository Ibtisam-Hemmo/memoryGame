type Card = {
    id: number,
    content: string,
    isFlipped: boolean,
    isMatched: boolean,
}

type GameStatus = "in-progress" | "completed"

type GameContextType = {
    cards: Card[],
    moves: number,
    gameStatus: GameStatus,
    flipCard: (id: number) => void,
    resetGame: () => void,
    };


export type {
    Card,
    GameStatus,
    GameContextType
}
