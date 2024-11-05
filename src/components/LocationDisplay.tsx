import React from 'react';
import { MapPin } from 'lucide-react';
import { useGame } from './GameContext';

type LocationKey = 'classroom' | 'hallway' | 'clubroom' | 'ground';

interface Location {
  name: string;
  image: string;
}

const locations: Record<LocationKey, Location> = {
  classroom: {
    name: '教室',
    image: 'https://cdn.discordapp.com/attachments/989274712590917653/1303322761573302312/masayasu2970_comic_style_empty_classroom_late_afternoon_golden__8473673c-5712-49a5-9b56-b89d81d0404f.png'
  },
  hallway: {
    name: '廊下',
    image: 'https://cdn.discordapp.com/attachments/989274712590917653/1303321993176940564/masayasu2970_comic_style_empty_school_hallway_dramatic_afternoo_2ebac01d-73e9-4c0d-9456-c97bef0f6e0a.png'
  },
  clubroom: {
    name: '部室',
    image: 'https://cdn.discordapp.com/attachments/989274712590917653/1303321922121240596/masayasu2970_vibrant_comic_art_style_locker_room_view_open_lock_3546ccdd-b280-41e6-9cc1-0371fde1887a.png'
  },
  ground: {
    name: 'グラウンド',
    image: 'https://cdn.discordapp.com/attachments/989274712590917653/1303322426234507336/masayasu2970_vibrant_comic_art_style_school_ground_at_sunset_go_b0113fa6-9a01-4348-a7c3-1b1ab1198935.png'
  }
};

const LocationDisplay: React.FC = () => {
  const { gameState, updateGameState } = useGame();
  const currentLocation = locations[gameState.currentLocation as LocationKey];
  
  const handleLocationChange = (locationKey: LocationKey) => {
    updateGameState({ currentLocation: locationKey });
  };

  return (
    <div className="fixed bottom-4 left-4 z-20">
      <div className="w-64 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-40">
          <img
            src={currentLocation.image}
            alt={`${currentLocation.name}の風景`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="font-medium">現在地: {currentLocation.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(locations) as LocationKey[]).map((key) => (
              <button
                key={key}
                onClick={() => handleLocationChange(key)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  gameState.currentLocation === key
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'hover:bg-gray-100'
                }`}
              >
                {locations[key].name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDisplay;