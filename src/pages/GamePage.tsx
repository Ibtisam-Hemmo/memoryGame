import { useNavigate } from 'react-router-dom'
import { Footer, GameBoard, Header } from '../components'
import GameInfo from '../components/GameInfo'
import { useGameContext } from '../context/gameContext'
import styles from '../styles/GamePage.module.scss'
//TODO: do a container, pick more images, download Font, review style, effects , fix pages
const GamePage = () => {
    const { gameState: { countDownTimer, gameStatus } } = useGameContext();
    const navigate = useNavigate();
    if (countDownTimer === 0 && gameStatus === "failed") {
        navigate("/game/failed");
    } else if (gameStatus === "completed"){
        navigate("/game/completed")
    }
    return (
        <main>
            <Header />
            <h2 className={styles.gameTitle}>Game Board</h2>
            <div className={styles.gameContainer}>
                <GameBoard />
                <GameInfo />
            </div>
            <Footer />
        </main>
    )
}

export default GamePage