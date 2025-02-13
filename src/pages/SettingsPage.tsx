import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGameContext } from "../context/gameContext";
import { Themes, Levels } from "../types/gameType";
import { ChoiceGroup, SavedGameModal } from "../components";
import Logo2 from "../assets/gameLogo2.jpg";
import styles from "../styles/settings.module.scss";


const SettingsPage = () => {
  const { gameState, gameTheme, toggleTheme, startNewGame, resetGame } = useGameContext();

  const [selectedTheme, setSelectedTheme] = useState(gameState.theme);
  const [selectedDifficulty, setSelectedDifficulty] = useState(gameState.level);
  const [showModal, setShowModal] = useState(gameState.gameStatus === "inProgress");

  const navigate = useNavigate();

  const handleNewGameStart = () => {
    startNewGame(selectedTheme, selectedDifficulty);
    navigate("/game");
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/game");
  };

  const handleNewGame = () => {
    resetGame()
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => toggleTheme()}
        className={styles.themeBtn}
      >
        {gameTheme === "light" ? "☀️" : "🌙"}
      </button>
      <div className={styles.mainContainer}>
        {showModal && (
          <SavedGameModal
            handleContinue={handleContinue}
            handleNewGame={handleNewGame}
          />
        )}
        <div className={styles.logoContainer}>
          <img src={Logo2} alt="Game Logo" className={styles.logo} />
        </div>

        <div className={styles.settings}>
          <ChoiceGroup<Themes>
            title="Themes"
            choices={["icons", "letters", "images"]}
            selected={selectedTheme}
            onSelect={setSelectedTheme}
          />

          <ChoiceGroup<Levels>
            title="Difficulty"
            choices={["easy", "medium", "hard"]}
            selected={selectedDifficulty}
            onSelect={setSelectedDifficulty}
          />
        </div>

        <button
          type="submit"
          className={styles.btn}
          onClick={handleNewGameStart}
        >
          Start New Game
        </button>
      </div>
    </>

  );
};

export default SettingsPage;