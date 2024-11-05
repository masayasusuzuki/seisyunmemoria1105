import React, { useState } from 'react';
import CharacterSelect from './CharacterSelect';
import { useGame } from './GameContext';
import { saveGame } from '../utils/storage';

interface CreateCharacterProps {
  onComplete: (name: string, characterId: number) => void;
}

const CreateCharacter: React.FC<CreateCharacterProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [error, setError] = useState('');
  const { updateGameState } = useGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('名前を入力してください');
      return;
    }
    if (!selectedCharacter) {
      setError('キャラクターを選択してください');
      return;
    }

    // 初期ゲームステートの作成
    const initialState = {
      playerName: name,
      characterId: selectedCharacter,
      currentWeek: 1,
      stats: {
        学力: 50,
        友好度: 30,
        体力: 70,
        芸術: 40,
      }
    };

    // GameContextの更新
    updateGameState(initialState);
    
    // セーブデータとして保存
    saveGame(initialState);
    
    onComplete(name, selectedCharacter);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">キャラクター作成</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">
              プレイヤー名を入力
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="名前を入力してください"
              maxLength={20}
            />
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">
              キャラクターを選択
            </label>
            <CharacterSelect
              onSelect={setSelectedCharacter}
              selectedCharacter={selectedCharacter}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ゲームを始める
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCharacter;