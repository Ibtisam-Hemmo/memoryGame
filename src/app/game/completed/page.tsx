"use client";

import { useRouter } from 'next/navigation';
import styles from '../../../styles/gamePage.module.scss';
import { winningQuotes } from '../../../utils/quotes';
import { useGameContext } from '../../../context/gameContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRandomQuote } from '@/hooks/useRandomQuote';
import useSoundOnMount from '@/hooks/useSoundOnMount';
import { sounds } from '@/utils';

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
    router.push('/');
  };

  if (!hasMounted) return null;

  const currentScore = gameState.highScores?.[gameState.level] ?? 0;

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
      {quote? <p>{quote}</p> : <p>Loading...</p> }
      <p>Your highest score is: {currentScore}</p>
      <button onClick={onPlayAgain}>Play another</button>
    </div>
  );
};

export default CompletedGame;
