import { Card, Levels, Themes } from "../types/gameType";
import { shuffle } from "./shuffleFunction.js";
import {
    strawberry, yogiBear, winnieThePooh,
    tweetyBird, tigger, spongeBob,
    scoobyDoo, bunny, popeye,
    patrickStar, mickeyMouse, helloKitty,
    duck, Tom, Shrek,
    PapaSmurf, jerry, mcCormick
} from '../assets/images/index.ts';

const themesConfig = {
    letters: [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "a", "b", "c", "d", "e", "f", "g", "h"
    ],
    icons: [
        "🎮", "🎲", "🕹️", "🎧", "🎸",
        "🛸", "🚁", "🔮", "🚀", "📷",
        "💡", "🧩", "🎭", "🚦", "🎨",
        "🛍️", "🕰️", "🔑"
    ],
    images: [
        strawberry, yogiBear, winnieThePooh,
        tweetyBird, tigger, spongeBob,
        scoobyDoo, bunny, popeye,
        patrickStar, mickeyMouse, helloKitty,
        duck, Tom, Shrek,
        PapaSmurf, jerry, mcCormick
    ]
};

const levelConfig = {
    easy: { cardsCount: 12, grid: { rows: 3, columns: 4 }, timer: 150 },
    medium: { cardsCount: 20, grid: { rows: 4, columns: 5 }, timer: 120 },
    hard: { cardsCount: 36, grid: { rows: 6, columns: 6 }, timer: 100 }
};

const getCardContent = (theme: Themes, level: Levels) => {
    const { cardsCount } = levelConfig[level];
    return themesConfig[theme].slice(0, Math.ceil(cardsCount / 2));
};

const createCardPairs = (content: string[], theme: Themes): Card[] => {
    return content.flatMap((item, index) => [
        { id: index * 2, type: theme, content: item, lastFlipTime: 0, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, type: theme, content: item, lastFlipTime: 0, isFlipped: false, isMatched: false }
    ]);
};

export const generateCards = (theme: Themes, level: Levels) => {
    const content = getCardContent(theme, level);
    const cards = createCardPairs(content, theme);
    return shuffle(cards);
};

export const getGridSize = (level: Levels) => {
    return levelConfig[level]?.grid || { rows: 3, columns: 4 };
};

export const getTimerByLevel = (level: Levels) => {
    return levelConfig[level]?.timer || 150;
};
