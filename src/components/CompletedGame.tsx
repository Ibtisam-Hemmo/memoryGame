import { useNavigate } from 'react-router-dom';

import styles from '../styles/GamePage.module.scss'


const CompletedGame = () => {
    const navigate = useNavigate();

    const handleNewgame = () => {
        navigate("/")
    }

    return (
        <>
            <div className={styles.failureScreen}>
                <h2>Congrats</h2>
                <p>“You have done it Hero”</p>
                <button onClick={() => handleNewgame()}>Play another</button>
            </div>
        </>

    )
}

export default CompletedGame;
