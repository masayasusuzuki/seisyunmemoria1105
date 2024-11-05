export interface GameState {
  playerName: string;
  characterId: number;
  currentWeek: number;
  currentDate: string;
  currentLocation: string;
  stats: {
    学力: number;
    友好度: number;
    体力: number;
    芸術: number;
  };
  relationships: {
    [key: number]: number;
  };
}