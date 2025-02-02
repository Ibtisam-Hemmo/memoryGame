import { Card, GameState } from "../types/gameType";

export const gameLogic = (
    cardId: number,
    gameState: GameState,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
    const { cards, flippedCards } = gameState;

    if (flippedCards.length === 2) return;

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

    if (updatedFlippedCards.length === 2) {
        checkForMatched(updatedFlippedCards, updatedCards, gameState.countDownTimer, setGameState);
    }
};

export const checkForMatched = (
    flippedCards: number[],
    cards: Card[],
    countdownTimer: number,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
    const [firstCardId, secondCardId] = flippedCards;

    const firstCard = cards.find((card) => card.id === firstCardId);
    const secondCard = cards.find((card) => card.id === secondCardId);

    if (!firstCard || !secondCard) return;

    if (firstCard.content === secondCard.content) {
        const matchedCards = cards.map((card) =>
            card.id === firstCardId || card.id === secondCardId
                ? { ...card, isMatched: true }
                : card
        );

        console.log('firstCard.lastFlipTime: ', firstCard.lastFlipTime);

        const timeDifference = Math.abs(firstCard.lastFlipTime - secondCard.lastFlipTime);
        console.log('timeDifference: ', timeDifference);
        let newTime = countdownTimer;

        if (timeDifference <= 2000) {
            console.log("matched quickly")
            newTime += 3;
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
    } else {
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
    }
};
