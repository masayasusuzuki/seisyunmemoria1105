import React from 'react';
import MainMenu from './components/MainMenu';
import GameUI from './components/GameUI';
import Prologue from './components/Prologue';
import { GameProvider } from './components/GameContext';
import { useState } from 'react';

function App() {
  const [gameState, setGameState] = useState<'menu' | 'prologue' | 'game'>('menu');

  const handleStartGame = () => {
    setGameState('prologue');
  };

  const handlePrologueComplete = () => {
    setGameState('game');
  };

  return (
    <GameProvider>
      <div className="min-h-screen">
        {gameState === 'menu' && (
          <MainMenu onStartGame={handleStartGame} />
        )}
        {gameState === 'prologue' && (
          <Prologue onComplete={handlePrologueComplete} />
        )}
        {gameState === 'game' && (
          <GameUI />
        )}
      </div>
    </GameProvider>
  );
}

export default App;