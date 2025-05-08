"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Footer, GameBoard, Header, GameInfo } from '../../components'
import { useGameContext } from '../../context/gameContext'
import styles from '../../styles/gamePage.module.scss'
import { playSound, sounds } from "@/utils";
import useSoundOnMount from "@/hooks/useSoundOnMount";

const GamePage = () => {
    const { gameState: { gameStatus } } = useGameContext();
    const router = useRouter();

    useSoundOnMount(sounds.gameStart);

    useEffect(() => {
        if (gameStatus === "failed") {
          router.push("/game/failed");
        } else if (gameStatus === "completed") {
          router.push("/game/completed");
        }
      }, [gameStatus]);
      
    return (
        <>
            <main className={styles.main}>
                <Header />
                <h1 className={styles.gameTitle}>Game Board</h1> 
                    <div className={styles.gameContainer}>
                    <GameBoard />
                    <GameInfo />
                </div>
            </main>
            <Footer />
        </>

    )
}

export default GamePage