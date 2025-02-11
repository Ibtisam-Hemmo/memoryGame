import { useGameContext } from "../context/gameContext";
import styles from "../styles/GamePage.module.scss";
import time from '../assets/timer.gif';
import highScore from '../assets/high-score.png';

const GameInfo = () => {
    const { gameState, timeIncreaseEffect } = useGameContext();

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return (
        <div className={styles.gameInfo}>
            <div className={styles.infoItem}>
                <img src={time} alt="count down timer" />
                <strong>{formatTime(gameState.countDownTimer)} s</strong>
                {timeIncreaseEffect && (
                    <span className={styles.timeEffect}>+3 s</span>
                )}
            </div>
            <div className={styles.infoItem}>
                <span>MOVES:</span>
                <strong>{gameState.moves}</strong>
            </div>
            <div className={styles.infoItem}>
                <img src={highScore} alt="high score"  className={styles.highScore}/>
                <strong>{gameState.highScores[gameState.level]}</strong>
            </div>
        </div>
    );
};

export default GameInfo;
