import React, { createContext, useContext, useEffect, useState } from 'react';
import { GameContextType, Card } from '../types/gameType';
import { cards as initialCards } from '../assets/Cards';
import { gameLogic } from '../utils/gameLogic';
import { saveGameToLocalStorage } from '../utils/localStorage';
import { shuffle } from '../utils/shuffleFunction';
import { initializeGame } from '../utils/initializeGame';

const initialState: GameContextType = {
    cards: [],
    moves: 0,
    gameStatus: 'in-progress',
    flipCard: () => { },
    resetGame: () => { },
};

const GameContext = createContext<GameContextType>(initialState); //undefined type

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        cards: savedCards,
        flippedCards: initialFlippedCards,
        moves: initialMoves,
        gameStatus: initialGameStatus
    } = initializeGame();
    const [cards, setCards] = useState<Card[]>(savedCards);
    const [flippedCards, setFlippedCards] = useState<number[]>(initialFlippedCards);
    const [moves, setMoves] = useState<number>(initialMoves);
    const [gameStatus, setGameStatus] = useState<'in-progress' | 'completed'>(initialGameStatus);
    // const [lockBoard, setLockBoard] = useState<boolean>(false);

    const flipCard = (cardId: number) => {
        gameLogic(cardId, cards, flippedCards, moves,
            setCards, setFlippedCards, setGameStatus, setMoves);
        // gameLogic(cardId, cards, flippedCards, moves,lockBoard,
        //     setCards, setFlippedCards, setGameStatus, setMoves, setLockBoard);
    };

    const resetGame = () => {
        setCards(shuffle(initialCards));
        setMoves(0);
        setGameStatus('in-progress');
        setFlippedCards([]);
        saveGameToLocalStorage(cards, [], 0, 'in-progress');
    };

    useEffect(() => {
        saveGameToLocalStorage(cards, flippedCards, moves, gameStatus);
    }, [cards, flippedCards, moves, gameStatus]);

    return (
        <GameContext.Provider
            value={{
                cards,
                moves,
                gameStatus,
                flipCard,
                resetGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
