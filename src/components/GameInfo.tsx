"use client";

import { useGameContext } from "../context/gameContext";
import styles from "../styles/gamePage.module.scss";

const GameInfo = ({
  playerId,
  isActive,
}: {
  playerId: string;
  isActive: boolean;
}) => {
  const { gameState } = useGameContext();
  const player = gameState.players.find((player) => player.id === playerId);

  if (!player) return null;

  return (
    <div
      className={`${styles.gameInfo} ${
        gameState.mode === "multi" && isActive ? styles.activePlayer : ""
      }`}
    >
      <div className={styles.infoItem}>
        <span>MOVES:</span>
        <strong>{player.moves}</strong>
      </div>
      <div className={styles.infoItem}>
        <span>MATCHES:</span>
        <strong>{player.matches}</strong>
      </div>
    </div>
  );
};

export default GameInfo;
