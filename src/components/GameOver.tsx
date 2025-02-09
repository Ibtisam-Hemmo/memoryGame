import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/GamePage.module.scss'
import { RestartModal } from './index';


const GameOver = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handlecancel = () => {
        setShowModal(false)
    }
    const handleRestart = () => {
        setShowModal(true)
    }

    const onRestart = () => {
        navigate("/")
        setShowModal(false);
    }

    return (
        <>
            {showModal && <RestartModal cancel={handlecancel} restart={onRestart} />}

            <div className={styles.failureScreen}>
                <h2>Game Over!</h2>
                <p>“Failure is just a stepping stone to success. Try again!”</p>
                <button onClick={() => handleRestart()}>Try Again</button>
            </div>
        </>

    )
}

export default GameOver