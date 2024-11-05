import React, { useState } from 'react';
import { Settings, Calendar, Users } from 'lucide-react';
import { useGame } from './GameContext';
import StatusBar from './StatusBar';
import ActionPanel from './ActionPanel';
import ClassmatesList from './ClassmatesList';
import LocationDisplay from './LocationDisplay';

const GameUI: React.FC = () => {
  const { gameState } = useGame();
  const [showClassmates, setShowClassmates] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(date);
  };

  return (
    <div 
      className="min-h-screen p-4 relative"
      style={{
        backgroundImage: 'url("https://cdn.discordapp.com/attachments/989274712590917653/1303299902255661086/masayasu2970_vibrant_comic_style_classroom_interior_morning_sun_11c00356-a220-43a8-8c6e-c91c60d64181.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      
      <div className="relative z-10">
        <header className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{formatDate(gameState.currentDate)}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowClassmates(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600">クラスメイト</span>
              </button>
              <span className="text-gray-600">{gameState.playerName}</span>
              <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusBar />
          <ActionPanel />
        </div>

        <LocationDisplay />
      </div>

      {showClassmates && (
        <ClassmatesList onClose={() => setShowClassmates(false)} />
      )}
    </div>
  );
};

export default GameUI;