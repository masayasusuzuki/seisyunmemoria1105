import React from 'react';
import { useGame } from './GameContext';

const getCharacterImage = (characterId: number): string => {
  switch (characterId) {
    case 1:
      return "https://cdn.discordapp.com/attachments/989274712590917653/1303298049736704070/masayasu2970_outgoing_handsome_student_visual_novel_protagonist_b668f4e7-b982-4e0e-af49-d373f8003cc8.png?ex=672b3e65&is=6729ece5&hm=c1e046cc43b074663b688d07469fb0994c31cfb4a4664d0e12d2eb977dc8f0b4";
    case 2:
      return "https://cdn.discordapp.com/attachments/989274712590917653/1303298256243261472/masayasu2970_intellectual_bishounen_studious_high_school_studen_6e9ef023-6926-4187-a803-53e42f645419.png?ex=672b3e96&is=6729ed16&hm=2cd9d0a7c6c1fd3b72d625fdaed080557b4e408f8f9fb31a87d389df14fc5fc4";
    case 3:
      return "https://cdn.discordapp.com/attachments/989274712590917653/1303298684867575819/masayasu2970_sensitive_artist_boy_dating_sim_style_elegant_draw_72f516b4-ab89-4b25-a969-60e10dab1ee1.png?ex=672b3efc&is=6729ed7c&hm=99252b65a08c8a553e8eab675d48a84e335841942ee88dbbb009045a8e555949&";
    default:
      return "";
  }
};

const StatusBar: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
      <div className="mb-4 flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
          <img
            src={getCharacterImage(gameState.characterId)}
            alt="キャラクター"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{gameState.playerName}</h2>
          <p className="text-sm text-gray-500">転校生</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(gameState.stats).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{key}</span>
              <span className="text-sm text-gray-500">{value}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;