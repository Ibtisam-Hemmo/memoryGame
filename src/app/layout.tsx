import type { Metadata } from 'next'

import { poppins, rubik } from '../lib/fonts'
import { GameProvider } from '../context/gameContext'
import '../styles/general.css'

export const metadata: Metadata = {
  title: 'Memory Card Game',
  description: "A super fun, challenging, and totally addictive game! and it's all about flipping cards, matching pairs, and competing for the highest score!"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${rubik.variable} font-sans`} suppressHydrationWarning>
      <body className="light-theme">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  )
}