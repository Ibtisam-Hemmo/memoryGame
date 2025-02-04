import React from 'react';
import styles from '../styles/savedGameModal.module.scss';

type Props = {
  handleContinue: () => void;
  handleNewGame: () => void;
};

const SavedGameModal: React.FC<Props> = ({ handleContinue, handleNewGame }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>
          You still have a saved game. <br />
          Do you want to continue playing it or start a new one?
        </p>
        <button onClick={handleContinue}>Continue</button>
        <button onClick={handleNewGame}>Start New Game</button>
      </div>
    </div>
  );
};

export default SavedGameModal;
