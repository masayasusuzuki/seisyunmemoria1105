import React, { useState } from 'react';
import { useGame } from './GameContext';
import StudySimulation from './StudySimulation';

const actions = [
  { 
    text: '勉強する', 
    color: 'blue', 
    type: 'study', 
    energyCost: 30,
    bgImage: 'https://cdn.discordapp.com/attachments/989274712590917653/1303316433559621674/masayasu2970_anime_style_open_textbook_viewed_from_above_highli_0f24a68f-875b-496f-9e90-5233f28c6864.png?ex=672b4f84&is=6729fe04&hm=e1982db7bfaa04453fe8883f00528383bed0352387ee0f9fa8b2476bf25dcdfd&'
  },
  { 
    text: '友達と過ごす', 
    color: 'green', 
    type: 'social', 
    energyCost: 30,
    bgImage: 'https://cdn.discordapp.com/attachments/989274712590917653/1303317163876028426/masayasu2970_manga_illustration_of_friends_sharing_lunch_break__8ce0eedc-05e2-48b7-913c-155e7c1a927f.png?ex=672b5032&is=6729feb2&hm=ee06060cfc27954dfc189bce030ee2d45d4910f0c00b4b5524308b2048baa37c&'
  },
  { 
    text: '部活動', 
    color: 'red', 
    type: 'club', 
    energyCost: 50,
    bgImage: 'https://cdn.discordapp.com/attachments/989274712590917653/1303318314331930645/masayasu2970_dynamic_comic_style_baseball_practice_high_school__fc4ec993-6893-4df5-bc94-2abf6753c408.png?ex=672b5144&is=6729ffc4&hm=38aa67263dc4ed0b4cdd2b9ee1fe4be4c4c506c1b65059a2be5db0e4eb2edf33&'
  },
  { 
    text: 'イベント参加', 
    color: 'purple', 
    type: 'event', 
    energyCost: 30,
    bgImage: 'https://cdn.discordapp.com/attachments/989274712590917653/1303318893921697842/masayasu2970_vibrant_comic_style_school_festival_colorful_class_3614fd6c-b7fa-4508-a501-5f7d657eba29.png?ex=672b51ce&is=672a004e&hm=bfd594c518c70fd95ecf6eee0bc024c902d0657657dc84f174b164735c52e2f6&'
  },
  { 
    text: '休む', 
    color: 'gray', 
    type: 'rest', 
    energyCost: 0,
    bgImage: 'https://cdn.discordapp.com/attachments/989274712590917653/1303318995285442653/masayasu2970_comic_art_style_school_infirmary_scene_student_res_9049112e-cc6d-4c75-b653-72f733966a55.png?ex=672b51e6&is=672a0066&hm=c597dcb03ba4a1fe182795f8ba2fa2b1219b501518c850202cca302ac674af25&'
  }
];

const ActionPanel: React.FC = () => {
  const { gameState, updateGameState } = useGame();
  const [showStudySimulation, setShowStudySimulation] = useState(false);
  const [isResting, setIsResting] = useState(false);

  const advanceDate = () => {
    const currentDate = new Date(gameState.currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toISOString().split('T')[0];
  };

  const handleRest = () => {
    setIsResting(true);
    setTimeout(() => {
      updateGameState({
        stats: {
          ...gameState.stats,
          体力: 100
        },
        currentDate: advanceDate()
      });
      setIsResting(false);
    }, 2000);
  };

  const handleAction = (type: string, energyCost: number) => {
    if (gameState.stats.体力 < energyCost) {
      handleRest();
      return;
    }

    if (type === 'rest') {
      handleRest();
      return;
    }

    if (type === 'study') {
      setShowStudySimulation(true);
      return;
    }

    const newStats = { ...gameState.stats };
    newStats.体力 = Math.max(0, newStats.体力 - energyCost);
    
    switch (type) {
      case 'social':
        newStats.友好度 = Math.min(100, newStats.友好度 + 10);
        break;
      case 'club':
        newStats.芸術 = Math.min(100, newStats.芸術 + 5);
        break;
      case 'event':
        newStats.友好度 = Math.min(100, newStats.友好度 + 5);
        newStats.芸術 = Math.min(100, newStats.芸術 + 10);
        break;
    }

    updateGameState({
      stats: newStats,
      currentDate: advanceDate()
    });
  };

  return (
    <>
      <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">今日の行動</h2>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action.type, action.energyCost)}
              disabled={action.type !== 'rest' && gameState.stats.体力 < action.energyCost}
              className={`
                relative overflow-hidden rounded-lg transition-all duration-200
                ${action.type !== 'rest' && gameState.stats.体力 < action.energyCost
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:transform hover:scale-105'
                }
              `}
              style={{
                height: '200px',
                background: `linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 100%)`,
              }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${action.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: '0.8',
                }}
              />
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                <span className="font-medium text-xl text-gray-800 mb-3" style={{
                  textShadow: '0 0 4px rgba(255,255,255,0.8)'
                }}>{action.text}</span>
                {action.energyCost > 0 && (
                  <span className="text-sm font-medium text-gray-700 bg-white/80 px-3 py-1.5 rounded-full">
                    消費体力: {action.energyCost}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showStudySimulation && (
        <StudySimulation 
          onComplete={() => setShowStudySimulation(false)}
          energyCost={30}
        />
      )}

      {isResting && (
        <div className="fixed inset-0 bg-black transition-opacity duration-1000 opacity-100 flex items-center justify-center z-50">
          <p className="text-white text-2xl">おやすみなさい...</p>
        </div>
      )}
    </>
  );
};

export default ActionPanel;