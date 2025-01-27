import { Card } from "../types/gameType";

export const gameLogic = (
    cardId: number,
    cards: Card[],
    flippedCards: number[],
    moves: number,
    // lockBoard: boolean,
    setCards: React.Dispatch<React.SetStateAction<Card[]>>,
    setFlippedCards: React.Dispatch<React.SetStateAction<number[]>>,
    setGameStatus: React.Dispatch<React.SetStateAction<'in-progress' | 'completed'>>,
    setMoves: React.Dispatch<React.SetStateAction<number>>,
    // setLockBoard: React.Dispatch<React.SetStateAction<boolean>> // Function to update lockBoard
) => {
    // if (lockBoard || flippedCards.length === 2) return; // Prevent when already 2 cards are flipped
    if (flippedCards.length === 2) return; 

    setMoves((prevMoves) => prevMoves + 1);

    // Flip the clicked card
    const updatedCards = cards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const updatedFlippedCards = [...flippedCards, cardId];
    setFlippedCards(updatedFlippedCards);

    if (updatedFlippedCards.length === 2) {
        // setLockBoard(true); // Lock the board to avoid further clicks

        // setTimeout(() => {
            checkForMatched(
                updatedFlippedCards,
                updatedCards,
                moves,
                setCards,
                setGameStatus,
                setFlippedCards
            );
            // setLockBoard(false); // Unlock the board after resolving logic
        // }, 1000);
    }
};

export const checkForMatched = (
    updatedFlippedCards: number[],
    cards: Card[],
    moves: number,
    setCards: React.Dispatch<React.SetStateAction<Card[]>>,
    setGameStatus: React.Dispatch<React.SetStateAction<'in-progress' | 'completed'>>,
    setFlippedCards: React.Dispatch<React.SetStateAction<number[]>>
) => {
    const [firstCardId, secondCardId] = updatedFlippedCards;

    const firstCard = cards.find((card) => card.id === firstCardId);
    const secondCard = cards.find((card) => card.id === secondCardId);

    if (firstCard && secondCard) {
        if (firstCard.content === secondCard.content) {
            const matchedCards = cards.map((card) =>
                card.id === firstCardId || card.id === secondCardId
                    ? { ...card, isMatched: true }
                    : card
            );
            setCards(matchedCards);

            if (matchedCards.every((card) => card.isMatched)) {
                setGameStatus("completed");
            }
        } else {
            setTimeout(() => {
                const resetCards = cards.map((card) =>
                    card.id === firstCardId || card.id === secondCardId
                        ? { ...card, isFlipped: false }
                        : card
                );
                setCards(resetCards);
            }, 400);
        }
    }

    // Clear flipped cards after processing
    setFlippedCards([]);
};
