import React from 'react';
import { useGameContext } from './context/gameContext';
import { Card } from './types/gameType';

const App = () => {

  const { gameState, flipCard, resetGame } = useGameContext();
  const renderCardContent = (card: Card) => {
    if (card.isFlipped || card.isMatched) {
      return card.type === "images" ? (
        <img
          src={card.content}
          alt="Card"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      ) : (
        card.content
      );
    }
    return "Not-Flipped";
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <p>Moves: {gameState.moves}</p>
      <p>Game Status: {gameState.gameStatus}</p>
      <div>Timer: {gameState.countDownTimer}s</div>
      <button onClick={resetGame}>Reset Game</button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: '5px' }}>
        {gameState.cards.map((card) => (
          <div
            key={card.id}
            onClick={() => !card.isMatched && !card.isFlipped && flipCard(card.id)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: card.isFlipped || card.isMatched ? 'pink' : 'gray',
              textAlign: 'center'
            }}
          >
            {renderCardContent(card)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
