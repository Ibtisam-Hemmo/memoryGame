import { GameState, GameTheme } from "../types/gameType";
import { generateCards, getGridSize } from "./generateCards";

const GAME_VERSION = "1.2";

export const saveGameToLocalStorage = (gameState: GameState) => {
    const gameData = {
        version: GAME_VERSION,
        state: gameState
    };
    localStorage.setItem('memoryGame', JSON.stringify(gameData));
}

export const getGameFromLocalStorage = (): GameState | null => {
    const savedData = localStorage.getItem("memoryGame");
    if (!savedData) return null;

    const parsedData = JSON.parse(savedData);
    console.log('parsedData: ', parsedData);

    if (!parsedData.version || parsedData.version !== GAME_VERSION) {
        console.log(`Migrating from v ${parsedData.version || "unknown"} to ${GAME_VERSION}`);

        const migratedData = {
            version: GAME_VERSION,
            state: {
                ...parsedData.state,
                level: parsedData.level || "easy",
                theme: parsedData.theme || "letters",
                cards: generateCards(parsedData.theme || "letters", parsedData.level || "easy"),
                gridSize: parsedData.gridSize || getGridSize(parsedData.level || "easy"),
                countDownTimer: parsedData.countDownTimer || 150,
                highScores: parsedData.highScores || { easy: 0, medium: 0, hard: 0 }
            },
        };

        console.log('After migration: ', migratedData);

        saveGameToLocalStorage(migratedData.state);

        return migratedData.state;
    }

    return parsedData.state;
};

export const getInitialTheme = (): GameTheme => {
    const savedTheme = localStorage.getItem("gameTheme");
    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
};
