import { useNavigate } from 'react-router-dom';

import styles from '../styles/GamePage.module.scss'
import { randomLostQuote } from '../utils/quotes';
import gameOver from '../assets/gameOver.gif';

const GameOver = () => {
    const navigate = useNavigate();

    const onPlayAgain = () => {
        navigate("/")
    }

    return (
        <>
            <div className={styles.failureScreen}>
                <img src={gameOver} alt='game over' />
                <p>{randomLostQuote}</p>
                <button onClick={() => onPlayAgain()} id={styles.tryAgainButton}>Try Again</button>
            </div>
        </>

    )
}

export default GameOver