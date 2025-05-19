"use client";

import { useRouter } from "next/navigation";
import styles from '../../../styles/gamePage.module.scss';
import { losingQuotes } from '../../../utils/quotes';
import { useGameContext } from '../../../context/gameContext';
import Image from 'next/image';
import { useRandomQuote } from "@/hooks/useRandomQuote";
import { useSoundOnMount } from "@/hooks";
import { sounds } from "@/utils";

const GameOver = () => {
    const { resetGame } = useGameContext();
    const router = useRouter();
    const quote = useRandomQuote(losingQuotes);
    useSoundOnMount(sounds.lose);

    const onPlayAgain = () => {
        resetGame();
        router.push("/");
    };

    return (
        <div className={styles.secondaryPage}>
            <Image 
                src="/images/gameOver.gif" 
                alt="Game Over"
                width={300}
                height={200}
                unoptimized
                priority
            />
            {quote? <p>{quote}</p> : <p>Loading...</p> }
            <button onClick={onPlayAgain} className={styles.tryAgainButton}>
                Try Again
            </button>
        </div>
    );
};

export default GameOver;