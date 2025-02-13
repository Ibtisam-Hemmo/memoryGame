import { Card, GameState } from "../types/gameType";
import { playSound, sounds } from "./index";

export const gameLogic = (
    cardId: number,
    gameState: GameState,
    setTimeIncreaseEffect: React.Dispatch<React.SetStateAction<boolean>>,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
    const { cards, flippedCards } = gameState;

    if (flippedCards.length === 2) return;

    flipCard(cardId, cards, flippedCards, setGameState);

    if (flippedCards.length === 2) {
        checkMatch(
            flippedCards,
            cards,
            gameState.countDownTimer,
            setGameState,
            setTimeIncreaseEffect
        );
    }
};

const flipCard = (
    cardId: number,
    cards: Card[],
    flippedCards: number[],
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
    const updatedCards = cards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true, lastFlipTime: Date.now() } : card
    );
    const updatedFlippedCards = [...flippedCards, cardId];

    setGameState((prevState) => ({
        ...prevState,
        cards: updatedCards,
        flippedCards: updatedFlippedCards,
        moves: prevState.moves + 1,
    }));
};

const checkMatch = (
    flippedCards: number[],
    cards: Card[],
    countdownTimer: number,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
    setTimeIncreaseEffect: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const [firstCardId, secondCardId] = flippedCards;
    const firstCard = cards.find((card) => card.id === firstCardId);
    const secondCard = cards.find((card) => card.id === secondCardId);

    if (!firstCard || !secondCard) return;

    if (firstCard.content === secondCard.content) {
        handleMatchedCards(firstCardId, secondCardId, cards, countdownTimer, setGameState, setTimeIncreaseEffect);
    } else {
        resetFlippedCards(firstCardId, secondCardId, cards, setGameState);
    }
};

const handleMatchedCards = (
    firstCardId: number,
    secondCardId: number,
    cards: Card[],
    countdownTimer: number,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
    setTimeIncreaseEffect: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const matchedCards = cards.map((card) =>
        card.id === firstCardId || card.id === secondCardId
            ? { ...card, isMatched: true }
            : card
    );
    playSound(sounds.matchCard);

    const firstCard = cards.find((card) => card.id === firstCardId);
    const secondCard = cards.find((card) => card.id === secondCardId);

    if (!firstCard || !secondCard) return;

    const timeDifference = Math.abs(firstCard.lastFlipTime - secondCard.lastFlipTime);
    let newTime = countdownTimer;

    if (timeDifference <= 2000) {
        console.log("Matched quickly");
        newTime += 3;
        setTimeIncreaseEffect(true);
        playSound(sounds.timeBonus);
        setTimeout(() => setTimeIncreaseEffect(false), 1000);
    }

    setGameState((prevState) => ({
        ...prevState,
        cards: matchedCards,
        flippedCards: [],
        gameStatus: matchedCards.every((card) => card.isMatched)
            ? "completed"
            : "inProgress",
        countDownTimer: newTime
    }));
};

const resetFlippedCards = (
    firstCardId: number,
    secondCardId: number,
    cards: Card[],
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
    setTimeout(() => {
        const resetCards = cards.map((card) =>
            card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
        );

        setGameState((prevState) => ({
            ...prevState,
            cards: resetCards,
            flippedCards: [],
        }));
    }, 400);
};

