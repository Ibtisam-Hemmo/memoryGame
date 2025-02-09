import { useGameContext } from '../context/gameContext';
import styles from '../styles/GamePage.module.scss'
import { useNavigate } from 'react-router-dom';


const NotFoundPage = () => {
    const { resetGame } = useGameContext();
    const navigate = useNavigate();


    const onRestart = () => {
        resetGame();
        navigate("/")
    }

    return (
        <>

            <div className={styles.failureScreen}>
                <h2>Oops! The page you are looking for doesn't exist.</h2>
                <button onClick={() => onRestart()}>Go Back</button>
            </div>
        </>

    )
}

export default NotFoundPage