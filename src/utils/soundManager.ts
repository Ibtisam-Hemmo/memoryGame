import gameStartSound from '../assets/sounds/ShuffleCards.mp3';
import flipCardSound from '../assets/sounds/cardFlip.mp3'
import timeBonusSound from '../assets/sounds/gameBonus.mp3'
import winGame from '../assets/sounds/tada.mp3'
import loseGame from '../assets/sounds/Loser.mp3'
import matchCardSound from '../assets/sounds/matchCards.mp3'
import countDownTimerSound from '../assets/sounds/clockTicking.mp3'

export const sounds = {
    gameStart: gameStartSound,
    flipCard: flipCardSound,
    timeBonus: timeBonusSound,
    countDownTimer: countDownTimerSound,
    win: winGame,
    lose: loseGame,
    matchCard: matchCardSound,
}

export const playSound = (soundFile: string) => {
    const sound = new Audio(soundFile);
    sound.play();
}
