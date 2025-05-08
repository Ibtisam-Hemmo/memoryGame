"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGameContext } from '../context/gameContext';
import styles from '../styles/gamePage.module.scss'
import { Card } from '../types/gameType';

const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const img = new window.Image();
    img.src = src;
  });
};

const GameBoard = () => {
  const { gameState, flipCard } = useGameContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const imagesToPreload = gameState.cards
      .filter((card) => card.type === 'images')
      .map((card) => card.content);

    preloadImages(imagesToPreload);
  }, [gameState.cards]);

  const renderCardContent = (card: Card) => {
    if (card.isFlipped || card.isMatched) {
      return card.type === "images" ? (
        <div className={styles.cardImageContainer}>
          <Image
            src={card.content}
            alt="Card content"
            fill
            className={styles.cardImage}
            style={{ objectFit: "cover" }}
            loading="eager"
            unoptimized={true}
          />
        </div>
      ) : (
        <div className={styles.cardText}>{card.content}</div>
      );
    }
    return <div className={styles.cardBack}>?</div>;
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${gameState.gridSize.columns}, minmax(${isMobile ? '50px' : '60px'}, 1fr))`,
          gridTemplateRows: `repeat(${gameState.gridSize.rows}, minmax(${isMobile ? '55px' : '60px'}, 1fr))`,
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