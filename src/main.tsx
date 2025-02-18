import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GameProvider } from './context/gameContext.tsx';
import { SettingsPage, GamePage, NotFoundPage } from './pages/index.ts';
import { GameOver, CompletedGame } from './components/index.ts';
import './styles/general.scss';

const basePath = import.meta.env.DEV ? '/' : '/memoryGame/';

createRoot(document.getElementById('root')!).render(
  <GameProvider>
    <Router basename={basePath}>
      <Routes>
        <Route path="/" element={<SettingsPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/failed" element={<GameOver />} />
        <Route path="/game/completed" element={<CompletedGame />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </GameProvider>
);
