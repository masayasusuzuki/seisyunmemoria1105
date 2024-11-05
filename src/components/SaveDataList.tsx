import React from 'react';
import { SaveData } from '../types/game';
import { getSaves } from '../utils/storage';
import { Calendar, Clock, User } from 'lucide-react';

interface SaveDataListProps {
  onLoad: (gameState: SaveData) => void;
  onClose: () => void;
}

const SaveDataList: React.FC<SaveDataListProps> = ({ onLoad, onClose }) => {
  const saves = getSaves();

  const getCharacterName = (characterId: number) => {
    switch (characterId) {
      case 1: return "活発な転校生";
      case 2: return "知的な学生";
      case 3: return "芸術家肌の生徒";
      default: return "不明なキャラクター";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">セーブデータ</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {saves.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            セーブデータがありません
          </p>
        ) : (
          <div className="space-y-4">
            {saves.map((save) => (
              <button
                key={save.id}
                onClick={() => onLoad(save)}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">
                      {save.gameState.playerName}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({getCharacterName(save.gameState.characterId)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>第{save.gameState.currentWeek}週目</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{save.date}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveDataList;