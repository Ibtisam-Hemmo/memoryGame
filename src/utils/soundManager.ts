export const sounds = {
    gameStart: '/sounds/ShuffleCards.mp3',
    flipCard: '/sounds/cardFlip.mp3',
    timeBonus: '/sounds/gameBonus.mp3',
    countDownTimer: '/sounds/clockTicking.mp3',
    win: '/sounds/tada.mp3',
    lose: '/sounds/Loser.mp3',
    matchCard: '/sounds/matchCards.mp3',
}

export const playSound = (soundFile: string) => {
    const sound = new Audio(soundFile);
    sound.preload = 'auto';
    sound.play().catch((err) => {
        console.warn("Sound playback blocked:", err.message);
      });
    sound.onended = () => {
    sound.removeEventListener('ended', () => { });
    };
}