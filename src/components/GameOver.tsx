import { useNavigate } from 'react-router-dom';

import styles from '../styles/GamePage.module.scss'
import { randomLostQuote } from '../utils/quotes';
import gameOver from '../assets/gameOver.gif';
import { useGameContext } from '../context/gameContext';

const GameOver = () => {
    const { resetGame } = useGameContext();
    const navigate = useNavigate();

    const onPlayAgain = () => {
        resetGame()
        navigate("/")
    }

    return (
        <>
            <div className={styles.secondaryPage}>
                <img src={gameOver} alt='game over' />
                <p>{randomLostQuote}</p>
                <button onClick={() => onPlayAgain()} id={styles.tryAgainButton}>Try Again</button>
            </div>
        </>

    )
}

export default GameOver