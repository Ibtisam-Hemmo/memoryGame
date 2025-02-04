import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo2 from "../assets/gameLogo2.jpg";
import styles from "./first.module.scss";
import ChoiceGroup from "../components/ChoiceGroup";
import { useGameContext } from "../context/gameContext";
import { Themes, Levels } from "../types/gameType";
import SavedGameModal from "../components/SavedGameModal";

const SettingsPage = () => {
  const { gameState, startNewGame, resetGame } = useGameContext();

  const [selectedTheme, setSelectedTheme] = useState(gameState.theme);
  const [selectedDifficulty, setSelectedDifficulty] = useState(gameState.level);
  const [showModal, setShowModal] = useState(!!gameState); //check game status

  const navigate = useNavigate();

  const newGameBoard = (theme: Themes, level: Levels) => {
    startNewGame(theme, level);
    navigate("/game");

  }

  const handleContinue = () => {
    setShowModal(false);
    navigate("/game")
  };

  const handleNewGame = () => {
    resetGame();
    setShowModal(false);
  };

  return (
    <div className={styles.mainContainer}>
      {showModal &&
        <SavedGameModal
          handleContinue={handleContinue}
          handleNewGame={handleNewGame}
        />
      }
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
        onClick={() => newGameBoard(selectedTheme, selectedDifficulty)}>
        Start New Game
      </button>
    </div>
  );
};

export default SettingsPage;
