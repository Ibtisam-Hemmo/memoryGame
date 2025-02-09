import { useState } from 'react';
import logo from '../assets/gameLogo2.jpg';
import styles from '../styles/GamePage.module.scss';
import { RestartModal } from './index';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
      <header className={styles.header}>
        <img src={logo} alt="Game Logo" className={styles.logo} />
        <button
          type="button"
          className={styles.btn}
          onClick={() => handleRestart()}
          aria-label="Restart Game"
        >
          Restart
        </button>
      </header>
    </>

  );
};

export default Header;
