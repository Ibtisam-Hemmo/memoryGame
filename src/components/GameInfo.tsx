import { useGameContext } from "../context/gameContext";
import styles from "../styles/GamePage.module.scss";

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
                <span>Timer:</span>
                <strong>{formatTime(gameState.countDownTimer)} s</strong>
                {timeIncreaseEffect && (
                    <span className={styles.timeEffect}>+3</span>
                )}
            </div>
            <div className={styles.infoItem}>
                <span>Moves:</span>
                <strong>{gameState.moves}</strong>
            </div>
            <div className={styles.infoItem}>
                <span> High Score:</span>
                <strong>{gameState.highScores[gameState.level]}</strong>
            </div>
        </div>
    );
};

export default GameInfo;
