import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GameProvider } from './context/gameContext.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <GameProvider>
    <Router>
      <Routes>
        <Route path="/" element={<SettingsPage />} />
        <Route path="/game" element={<App />} />
      </Routes>
    </Router>
  </GameProvider>,
)
