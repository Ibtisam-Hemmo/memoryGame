import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/GamePage.module.scss'
import { RestartModal } from './index';


const CompletedGame = () => {
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
                <h2>Congrats</h2>
                <p>“You have done it Hero”</p>
                <button onClick={() => handleRestart()}>Play another</button>
            </div>
        </>

    )
}

export default CompletedGame;
