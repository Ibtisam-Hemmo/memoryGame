import { useGameContext } from '../context/gameContext';
import styles from '../styles/GamePage.module.scss'
import { Card } from '../types/gameType';

const GameBoard = () => {
  const { gameState, flipCard } = useGameContext();

  const renderCardContent = (card: Card) => {
    if (card.isFlipped || card.isMatched) {
      return card.type === "images" ? (
        <img
          src={card.content}
          alt="Card"
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
          gridTemplateColumns: `repeat(${gameState.gridSize.columns}, minmax(60px, 1fr))`,
          gridTemplateRows: `repeat(${gameState.gridSize.rows}, minmax(60px, 1fr))`,
        }}
      >
        {gameState.cards.map((card, index) => {
          const colIndex = index % gameState.gridSize.columns;
          const delay = `${colIndex * 150}ms`;

          return (
            <div
              key={card.id}
              onClick={() => !card.isMatched && !card.isFlipped && flipCard(card.id)}
              className={`${styles.cellFace} ${card.isFlipped || card.isMatched ? styles.flipped : ""}`}
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
