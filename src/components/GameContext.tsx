import React, { createContext, useContext, useState } from 'react';
import { GameState } from '../types/game';

interface GameContextType {
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    playerName: '',
    characterId: 1,
    currentWeek: 1,
    currentDate: '2024-04-01',
    currentLocation: 'classroom',
    stats: {
      学力: 50,
      友好度: 30,
      体力: 70,
      芸術: 40,
    },
    relationships: {}
  });

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...newState }));
  };

  return (
    <GameContext.Provider value={{ gameState, updateGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};