type Card = {
    id: number,
    type: string,
    content: string,
    lastFlipTime:number,
    isFlipped: boolean,
    isMatched: boolean,
}

type GameStatus = "inProgress" | "completed" | "failed"

type Themes = "letters" | "images" | "icons"

type Levels = "easy" | "medium" | "hard"

type GridSize = {
    rows: number;
    columns: number;
};

interface GameState {
    cards: Card[];
    flippedCards: number[];
    moves: number;
    gameStatus: GameStatus;
    theme:Themes;
    level:Levels;
    gridSize:GridSize;
    countDownTimer: number;
}

type GameContextType = {
    gameState: GameState,
    flipCard: (id: number) => void,
    resetGame: () => void,
};


export type {
    Card,
    GameState,
    Themes,
    Levels,
    GameStatus,
    GameContextType
}
