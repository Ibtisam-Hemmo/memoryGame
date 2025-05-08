"use client";

import { useState } from 'react';
import styles from '../styles/gamePage.module.scss';
import { RestartModal } from './index';
import { useRouter } from "next/navigation";
import { useGameContext } from '../context/gameContext';
import Image from 'next/image';

const Header = () => {
  const { resetGame, gameTheme, toggleTheme } = useGameContext();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handlecancel = () => {
    setShowModal(false)
  }

  const handleRestart = () => {
    setShowModal(true)
  }

  const onRestart = () => {
    router.push("/");
    resetGame();
    setShowModal(false);
  }

  return (
    <>
      {showModal && <RestartModal cancel={handlecancel} restart={onRestart} />}
      <header className={styles.header}>
        <Image 
                src="/images/gameLogo2.webp" 
                alt="Game Logo"
                width={300}
                height={200}
                className={styles.logo}
                />
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
