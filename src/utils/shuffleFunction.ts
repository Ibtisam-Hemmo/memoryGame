import { Card } from "../types/gameType"

export const shuffle = (cards: Card[]): Card[] => {
    return cards
        .map(card => ({ ...card, sortIndex: Math.random() }))
        .sort((a, b) => a.sortIndex - b.sortIndex)
        .map(({ sortIndex, ...card }) => card)
}
