"use client";

import { useRouter } from "next/navigation";
import styles from "../../../styles/gamePage.module.scss";
import { winningQuotes } from "../../../utils/quotes";
import { useGameContext } from "../../../context/gameContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRandomQuote } from "@/hooks/useRandomQuote";
import { useSoundOnMount } from "@/hooks";
import { sounds } from "@/utils";

const CompletedGame = () => {
  const { gameState } = useGameContext();
  const quote = useRandomQuote(winningQuotes);
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  useSoundOnMount(sounds.win);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const onPlayAgain = () => {
    router.push("/");
  };

  if (!hasMounted) return null;

  const winner = gameState.players.find(
    (player) => player.name === gameState.winner
  );

  return (
    <div className={styles.secondaryPage}>
      <Image
        src="/images/yay.gif"
        alt="win Image"
        width={300}
        height={300}
        priority
        unoptimized
      />
      {quote ? <p>{quote}</p> : <p>Loading...</p>}
      <h2>Winner: {gameState.winner}</h2>

      {winner && (
        <div key={winner.id}>
          {winner.score !== undefined && <p>Score: {winner.score}</p>}
        </div>
      )}

      <button onClick={onPlayAgain}>Play another</button>
    </div>
  );
};

export default CompletedGame;
