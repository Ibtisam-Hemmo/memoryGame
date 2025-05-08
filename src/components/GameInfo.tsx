
"use client";

import { useGameContext } from "../context/gameContext";
import Image from 'next/image';
import styles from "../styles/gamePage.module.scss";
import { useEffect, useState } from 'react';

const GameInfo = () => {
    const { gameState, timeIncreaseEffect } = useGameContext();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return (
        <div className={styles.gameInfo}>
            <div className={styles.infoItem}>
                <div className={styles.imageContainer}>
                    <Image 
                        src="/images/time.gif"
                        alt="count down timer"
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100px, 150px"
                        unoptimized
                    />
                </div>
                <strong>
                    {isMounted ? formatTime(gameState.countDownTimer) + ' s' : '0:00 s'}
                </strong>
                {timeIncreaseEffect && isMounted && (
                    <span className={styles.timeEffect}>+3 s</span>
                )}
            </div>
            <div className={styles.infoItem}>
                <span>MOVES:</span>
                <strong>{gameState.moves}</strong>
            </div>
            <div className={styles.infoItem}>
                <div className={styles.imageContainer}>
                    <Image 
                        src="/images/high-score.webp" 
                        alt="High Score"
                        fill
                        sizes="(max-width: 768px) 100px, 150px"
                        className={styles.highScoreImage}
                    />
                </div>
                <strong>{isMounted ? gameState.highScores[gameState.level] : 0}</strong>
            </div>
        </div>
    );
};

export default GameInfo;