import { createRoot } from 'react-dom/client'
import { GameProvider } from './context/gameContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <GameProvider>
    <App />
  </GameProvider>,
)
