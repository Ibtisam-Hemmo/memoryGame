import { useNavigate } from 'react-router-dom';

import styles from '../styles/GamePage.module.scss'
import { randomWinnerQuote } from '../utils/quotes';
import { useGameContext } from '../context/gameContext';
import winImage from '../assets/yay.gif';

const CompletedGame = () => {
    const { gameState } = useGameContext();
    const navigate = useNavigate();

    const onPlayAgain = () => {
        navigate("/")
    }

    return (
        <>
            <div className={styles.failureScreen}>
                <img src={winImage} alt='win Image'/>
                <p>{randomWinnerQuote}</p>
                <p>Your highest Score is: {gameState.highScores[gameState.level]}</p>
                <button onClick={() => onPlayAgain()}>Play another</button>
            </div>
        </>

    )
}

export default CompletedGame;
