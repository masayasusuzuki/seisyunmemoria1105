import { GameState, SaveData } from '../types/game';

export const saveGame = (gameState: GameState): void => {
  const saveData: SaveData = {
    id: new Date().getTime().toString(),
    date: new Date().toLocaleString(),
    gameState,
  };
  
  const saves = getSaves();
  saves.push(saveData);
  localStorage.setItem('gameData', JSON.stringify(saves));
};

export const getSaves = (): SaveData[] => {
  const saves = localStorage.getItem('gameData');
  return saves ? JSON.parse(saves) : [];
};

export const loadGame = (id: string): GameState | null => {
  const saves = getSaves();
  const save = saves.find(s => s.id === id);
  return save ? save.gameState : null;
};