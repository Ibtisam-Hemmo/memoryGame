const losingQuotes = [
    "Don't give up! Try again! 💪",
    "Failure is just a step toward success. 🔥",
    "Every loss is a lesson! 📚",
    "Keep practicing, you got this! 💡",
    "The greatest winners are those who never quit! 🌟",
];

const winningQuotes = [
    "Victory is yours! 🎉",
    "You did it! Keep going! 🚀",
    "Champion mode activated! 🏆",
    "Hard work pays off! 🎯",
    "Winning isn’t everything, but it sure feels great! 😎",
];

const randomLostQuote = losingQuotes[Math.floor(Math.random() * losingQuotes.length)];
const randomWinnerQuote = winningQuotes[Math.floor(Math.random() * winningQuotes.length)];

export {
    randomLostQuote,
    randomWinnerQuote
}
