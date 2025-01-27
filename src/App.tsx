import React from 'react';
import { useGameContext } from './context/gameContext';

const App = () => {

  const { cards, moves, gameStatus, flipCard, resetGame } = useGameContext();


  return (
    <div>
      <h1>Memory Game</h1>
      <p>Moves: {moves}</p>
      <p>Game Status: {gameStatus}</p>
      <button onClick={resetGame}>Reset Game</button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: '5px' }}>
        {cards.map((card) => (
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
            {card.isFlipped || card.isMatched ? card.content : 'Not-Flipped'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
