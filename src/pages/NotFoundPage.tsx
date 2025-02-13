import { useGameContext } from '../context/gameContext';
import styles from '../styles/GamePage.module.scss'
import Image from '../assets/404Page.gif';
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
            <div className={styles.secondaryPage}>
                <img src={Image} alt="404 page" />
                <h2>Oops! The page you are looking for doesn't exist.</h2>
                <button onClick={() => onRestart()}>Go Back</button>
            </div>
        </>

    )
}

export default NotFoundPage