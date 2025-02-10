type Card = {
    id: number,
    type: string,
    content: string,
    lastFlipTime: number,
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

type highScores = {
    easy: number;
    medium: number;
    hard: number;
}

interface GameState {
    cards: Card[];
    flippedCards: number[];
    moves: number;
    gameStatus: GameStatus;
    theme: Themes;
    level: Levels;
    gridSize: GridSize;
    countDownTimer: number;
    highScores: highScores;
}

type GameContextType = {
    gameState: GameState,
    timeIncreaseEffect: boolean,
    flipCard: (id: number) => void,
    resetGame: () => void,
    startNewGame: (theme: Themes, level: Levels) => void
};


export type {
    Card,
    GameState,
    Themes,
    Levels,
    GameStatus,
    GameContextType
}
