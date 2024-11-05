import React, { useState } from 'react';
import { saveGame } from '../utils/storage';

interface NameInputProps {
  onComplete: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const initialState = {
        playerName: name,
        currentWeek: 1,
        stats: {
          学力: 50,
          友好度: 30,
          体力: 70,
          芸術: 40,
        }
      };
      saveGame(initialState);
      onComplete(name);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">プレイヤー名を入力</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="名前を入力してください"
            maxLength={20}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            ゲームを始める
          </button>
        </form>
      </div>
    </div>
  );
}

export default NameInput;