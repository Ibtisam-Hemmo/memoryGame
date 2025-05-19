"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";


import { useGameContext } from "../context/gameContext";
import { Themes, Levels, GameMode } from "../types/gameType";
import { ChoiceGroup } from "../components";
import styles from "../styles/settings.module.scss";
const SavedGameModal = dynamic(() => import("../components/SavedGameModal"), {
  ssr: false,
});


const SettingsPage = () => {
  const { gameState, gameTheme, toggleTheme, startNewGame, resetGame } = useGameContext();
  const [selectedTheme, setSelectedTheme] = useState(gameState.theme);
  const [selectedDifficulty, setSelectedDifficulty] = useState(gameState.level);
  const [selectedMode, setSelectedMode] = useState(gameState.mode);
  const [showModal, setShowModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [startingNewGame, setStartingNewGame] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    if (!startingNewGame && gameState.gameStatus === "inProgress") {
      setShowModal(true);
    }
  }, [gameState.gameStatus, startingNewGame]);

  const handleNewGameStart = () => {
    setStartingNewGame(true);
    startNewGame(selectedTheme, selectedDifficulty, selectedMode);
    router.push("/game");
  };

  const handleContinue = () => {
    setShowModal(false);
    router.push("/game");
  };

  const handleNewGame = () => {
    resetGame();
    setShowModal(false);
  };

  if (!hasMounted) return null;

  return (
    <>
      <button
        type="submit"
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
          <Image 
            src="/images/gameLogo2.webp" 
            alt="Game Logo" 
            fill
            sizes="(max-width: 600px) 80vw, (max-width: 1200px) 50vw, 30vw"
            className={styles.logo}
            priority={true}
          />
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

          <ChoiceGroup<GameMode>
            title="Mode"
            choices={["single", "multi"]}
            selected={selectedMode}
            onSelect={setSelectedMode}
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
