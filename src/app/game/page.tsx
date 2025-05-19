"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Footer, GameBoard, Header, GameInfo } from "../../components";
import { useGameContext } from "../../context/gameContext";
import styles from "../../styles/gamePage.module.scss";
import { useSoundOnMount } from "@/hooks";
import { sounds } from "@/utils";
import GameTimer from "@/components/GameTimer";

const GamePage = () => {
  const {
    gameState: { gameStatus, players, currentPlayerId, mode },
  } = useGameContext();
  const router = useRouter();

  useSoundOnMount(sounds.gameStart);

  useEffect(() => {
    if (gameStatus === "failed") {
      router.push("/game/failed");
    } else if (gameStatus === "completed") {
      router.push("/game/completed");
    }
  }, [gameStatus]);

  // Getting the current player data
  const currentPlayer = players.find((player) => player.id === currentPlayerId);

  return (
    <>
      <main className={styles.main}>
        <Header />
        <h1 className={styles.gameTitle}>Game Board</h1>
        {mode === "multi" && (
          <p className={styles.turnIndicator}>
            🎮 It's <strong>{currentPlayer?.name || "Player"}</strong>'s turn!
          </p>
        )}

        <div className={styles.multiPlayerContainer}>
          <div className={styles.gameBoardWrapper}>
            <GameBoard />
          </div>
          <div className={styles.playersInfoWrapper}>
            <GameTimer />
            <div className={styles.playersWrapper}>
              {players.map((player) => (
                <GameInfo
                  key={player.id}
                  playerId={player.id}
                  isActive={player.id === currentPlayerId}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GamePage;
