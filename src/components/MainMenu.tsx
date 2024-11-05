import React, { useState } from 'react';
import CreateCharacter from './CreateCharacter';
import SaveDataList from './SaveDataList';
import { SaveData } from '../types/game';
import { useGame } from './GameContext';

interface MainMenuProps {
  onStartGame: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);
  const [showSaveList, setShowSaveList] = useState(false);
  const { updateGameState } = useGame();

  const handleCharacterComplete = (name: string, characterId: number) => {
    setShowCreateCharacter(false);
    onStartGame();
  };

  const handleLoadGame = (saveData: SaveData) => {
    updateGameState(saveData.gameState);
    setShowSaveList(false);
    onStartGame();
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'url("https://cdn.discordapp.com/attachments/989274712590917653/1303290596139728967/masayasu2970_comic_style_school_building_cherry_blossoms_in_ful_35b97701-5dd4-453d-a3b4-12b49e84eb07.png?ex=672b3774&is=6729e5f4&hm=06d36c1364b55222d7dfc926f9e01c8a5b06070457c974448f6d98bb0895081b&")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-center z-10">
        <img 
          src="https://cdn.discordapp.com/attachments/1159719838189621298/1303296295590432870/3718599abea06413.png?ex=672b3cc2&is=6729eb42&hm=27be548c09e3708419287850476fd9ca5e59348842dc1cb2843d14bd149f3ea2&" 
          alt="青春メモリア" 
          className="w-[800px] h-auto mb-16 mx-auto"
        />

        <div className="space-y-4">
          <button
            onClick={() => setShowCreateCharacter(true)}
            className="w-64 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
          >
            新しい物語を始める
          </button>
          
          <button 
            onClick={() => setShowSaveList(true)}
            className="w-64 px-6 py-3 text-lg font-semibold text-white bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow-lg hover:bg-opacity-30 transform hover:scale-105 transition-all duration-200"
          >
            続きから
          </button>
        </div>

        <div className="mt-12 text-sm text-white text-opacity-80">
          <p>Version 1.0.0</p>
        </div>
      </div>

      {showCreateCharacter && (
        <CreateCharacter onComplete={handleCharacterComplete} />
      )}

      {showSaveList && (
        <SaveDataList 
          onLoad={handleLoadGame}
          onClose={() => setShowSaveList(false)}
        />
      )}
    </div>
  );
}

export default MainMenu;