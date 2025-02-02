import { Card, Levels, Themes } from "../types/gameType";
import { shuffle } from "./shuffleFunction.js";
import { apple, orange, banana, strawberry, grape } from '../assets/images/index.ts';

export const generateCards = (theme: Themes, level: Levels) => {
    console.log('theme, level: ', theme, level);

    const themes = {
        letters: ["A", "B", "C", "D", "E",
            "F", "G", "H", "I", "J",
            "K", "L", "M", "N", "O"],
        icons: ["🔥", "🌟", "🚀", "💎", "🎯",
            "🔔", "💥", "🌈", "💣", "🍀",
            "🍕", "🎁", "💌", "🎤", "📱", "🌙"],
        images: [apple, orange, banana, strawberry, grape]
    };

    const levelConfig = {
        easy: { cardsCount: 8 },
        medium: { cardsCount: 20 },
        hard: { cardsCount: 25 },
    };

    const { cardsCount } = levelConfig[level];
    const selectedContent = themes[theme].slice(0, Math.ceil(cardsCount / 2));

    const cards: Card[] = selectedContent.flatMap((content, index) => [
        { id: index * 2, type: theme, content, lastFlipTime: 0, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, type: theme, content, lastFlipTime: 0, isFlipped: false, isMatched: false },
    ]);

    return shuffle(cards);
};


export const getGridSize = (level: Levels) => {
    switch (level) {
        case "easy":
            return { rows: 4, columns: 4 };
        case "medium":
            return { rows: 4, columns: 5 };
        case "hard":
            return { rows: 5, columns: 5 };
        default:
            return { rows: 4, columns: 4 };
    }
};

export const getTimerByLevel = (level: Levels) => {
    switch (level) {
        case "easy":
            return 150;
        case "medium":
            return 120;
        case "hard":
            return 100;
        default:
            return 150;
    }
};