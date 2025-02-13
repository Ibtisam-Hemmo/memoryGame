import { useState } from 'react';
import logo from '../assets/gameLogo2.jpg';
import styles from '../styles/GamePage.module.scss';
import { RestartModal } from './index';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/gameContext';

const Header = () => {
  const { resetGame, gameTheme, toggleTheme } = useGameContext();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handlecancel = () => {
    setShowModal(false)
  }

  const handleRestart = () => {
    setShowModal(true)
  }

  const onRestart = () => {
    navigate("/");
    resetGame();
    setShowModal(false);
  }

  return (
    <>
      {showModal && <RestartModal cancel={handlecancel} restart={onRestart} />}
      <header className={styles.header}>
        <img src={logo} alt="Game Logo" className={styles.logo} />
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.btn}
            onClick={() => handleRestart()}
            aria-label="Restart Game"
          >
            Restart
          </button>
          <button
            className={styles.themeBtn}
            onClick={() => toggleTheme()}
          >{gameTheme === "light" ? "☀️" : "🌙"}</button>
        </div>
      </header>
    </>

  );
};

export default Header;
