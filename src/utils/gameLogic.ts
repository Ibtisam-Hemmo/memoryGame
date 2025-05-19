import { Card, GameMode, GameState, Player } from "../types/gameType";
import { playSound, sounds } from "./index";

export const gameLogic = (
  cardId: number,
  gameState: GameState,
  setTimeIncreaseEffect: React.Dispatch<React.SetStateAction<boolean>>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
  const {
    cards,
    flippedCards,
    previousMatchTime,
    players,
    currentPlayerId,
    mode,
  } = gameState;

  if (flippedCards.length === 2) return;

  flipCard(
    gameState,
    currentPlayerId,
    players,
    cardId,
    cards,
    flippedCards,
    previousMatchTime,
    setGameState,
    setTimeIncreaseEffect,
    mode
  );
};

const flipCard = (
  gameState: GameState,
  currentPlayerId: string,
  players: Player[],
  cardId: number,
  cards: Card[],
  flippedCards: number[],
  previousMatchTime: number,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  setTimeIncreaseEffect: React.Dispatch<React.SetStateAction<boolean>>,
  mode: GameMode
) => {
  const updatedCards = cards.map((card) =>
    card.id === cardId
      ? { ...card, isFlipped: true, lastFlipTime: Date.now() }
      : card
  );
  const updatedFlippedCards = [...flippedCards, cardId];

  const updatedPlayers = players.map((player) =>
    player.id === currentPlayerId
      ? { ...player, moves: player.moves + 1 }
      : player
  );

  setGameState((prevState) => ({
    ...prevState,
    cards: updatedCards,
    flippedCards: updatedFlippedCards,
    players: updatedPlayers,
  }));

  if (updatedFlippedCards.length === 2) {
    setTimeout(() => {
      checkMatch(
        mode,
        currentPlayerId,
        updatedFlippedCards,
        updatedCards,
        gameState.countDownTimer,
        previousMatchTime,
        setGameState,
        setTimeIncreaseEffect
      );
    }, 0);
  }
};

const checkMatch = (
  mode: GameMode,
  currentPlayerId: string,
  flippedCards: number[],
  cards: Card[],
  countdownTimer: number,
  previousMatchTime: number,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  setTimeIncreaseEffect: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [firstCardId, secondCardId] = flippedCards;
  const firstCard = cards.find((card) => card.id === firstCardId);
  const secondCard = cards.find((card) => card.id === secondCardId);

  if (!firstCard || !secondCard) return;

  if (firstCard.content === secondCard.content) {
    handleMatchedCards(
      firstCardId,
      secondCardId,
      cards,
      countdownTimer,
      previousMatchTime,
      setGameState,
      setTimeIncreaseEffect,
      mode
    );
  } else {
    resetFlippedCards(
      firstCardId,
      secondCardId,
      cards,
      currentPlayerId,
      mode,
      setGameState
    );
  }
};

const handleMatchedCards = (
  firstCardId: number,
  secondCardId: number,
  cards: Card[],
  countdownTimer: number,
  previousMatchTime: number,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  setTimeIncreaseEffect: React.Dispatch<React.SetStateAction<boolean>>,
  mode: GameMode
) => {
  const matchedCards = cards.map((card) =>
    card.id === firstCardId || card.id === secondCardId
      ? { ...card, isMatched: true }
      : card
  );
  playSound(sounds.matchCard);

  const currentMatchTime = Date.now();
  const timeDifference = Math.abs(previousMatchTime - currentMatchTime);
  let newTime = countdownTimer;

  if (timeDifference <= 2000) {
    newTime += 3;
    setTimeIncreaseEffect(true);
    playSound(sounds.timeBonus);
    setTimeout(() => setTimeIncreaseEffect(false), 1000);
  }

  setGameState((prevState) => {
    const updatedPlayers = prevState.players.map((player) =>
      player.id === prevState.currentPlayerId
        ? { ...player, matches: player.matches + 1 }
        : player
    );

    const isCompleted = matchedCards.every((card) => card.isMatched);
    let winnerName = "";

    if (isCompleted) {
      let playersWithScores = updatedPlayers;
    
      if (mode === "multi") {
        playersWithScores = updatedPlayers.map((player) => ({
          ...player,
          score: player.matches * 10 - player.moves * 2,
        }));
    
        const sortedPlayers = [...playersWithScores].sort(
          (a, b) => b.score - a.score || a.moves - b.moves
        );
    
        winnerName = sortedPlayers[0]?.name || "Unknown";
      } else {
        const player = updatedPlayers[0];
        winnerName = player?.name || "Unknown";
        playersWithScores = [{
          ...player,
          score: player.matches * 10 - player.moves * 2,
        }];
      }
    
      return {
        ...prevState,
        cards: matchedCards,
        flippedCards: [],
        players: playersWithScores,
        gameStatus: "completed",
        countDownTimer: newTime,
        previousMatchTime: currentMatchTime,
        winner: winnerName,
      };
    }
    
    return {
      ...prevState,
      cards: matchedCards,
      flippedCards: [],
      players: updatedPlayers,
      gameStatus: "inProgress",
      countDownTimer: newTime,
      previousMatchTime: currentMatchTime,
    };
  });
};

const resetFlippedCards = (
  firstCardId: number,
  secondCardId: number,
  cards: Card[],
  currentPlayerId: string,
  mode: GameMode,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
  setTimeout(() => {
    setGameState((prevState) => {
      const resetCards = cards.map((card) =>
        card.id === firstCardId || card.id === secondCardId
          ? { ...card, isFlipped: false }
          : card
      );

      let nextPlayerId = currentPlayerId;

      if (mode === "multi") {
        nextPlayerId = currentPlayerId === "1" ? "2" : "1";
      }

      return {
        ...prevState,
        cards: resetCards,
        flippedCards: [],
        currentPlayerId: nextPlayerId,
      };
    });
  }, 400);
};
