import { useEffect } from 'react';
import { useGameContext } from '../context/gameContext';
import styles from '../styles/GamePage.module.scss'
import { Card } from '../types/gameType';

const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};
const GameBoard = () => {
  const { gameState, flipCard } = useGameContext();

  useEffect(() => {
    const imagesToPreload = gameState.cards
      .filter((card) => card.type === 'images')
      .map((card) => card.content);

    preloadImages(imagesToPreload);
  }, [gameState.cards]);

  const renderCardContent = (card: Card) => {
    if (card.isFlipped || card.isMatched) {
      return card.type === "images" ? (
        <img
          src={card.content}
          alt="Card"
          loading="lazy"
          style={{ objectFit: "cover", height: "100%" }}
        />
      ) : (
        card.content
      );
    }
    return "?";
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${gameState.gridSize.columns}, minmax(${window.innerWidth < 600 ? '50px' : '60px'}, 1fr))`,
          gridTemplateRows: `repeat(${gameState.gridSize.rows}, minmax(${window.innerWidth < 600 ? '55px' : '60px'}, 1fr))`,
        }}
      >

        {gameState.cards.map((card, index) => {
          const colIndex = index % gameState.gridSize.columns;
          const delay = `${colIndex * 150}ms`;

          return (
            <div
              key={card.id}
              onClick={() => !card.isMatched && !card.isFlipped && flipCard(card.id)}
              className={`${styles.cardFace} ${card.isFlipped || card.isMatched ? styles.flipped : ""}`}
              style={{ animationDelay: delay }}
            >
              {renderCardContent(card)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
