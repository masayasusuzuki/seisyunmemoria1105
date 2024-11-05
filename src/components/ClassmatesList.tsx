import React from 'react';
import { X } from 'lucide-react';
import { useGame } from './GameContext';

interface Classmate {
  id: number;
  name: string;
  description: string;
  friendship: number;
  imageUrl?: string;
}

const classmates: Classmate[] = [
  {
    id: 1,
    name: "ユウタ",
    description: "明るく活発な性格で、クラスの人気者。スポーツが得意で、誰とでもすぐに仲良くなれる。",
    friendship: 0
  },
  {
    id: 2,
    name: "サクラ",
    description: "真面目で勉強熱心。クラスの成績優秀者で、困っている人を助けるのが好き。",
    friendship: 0
  },
  {
    id: 3,
    name: "リナ",
    description: "美術部所属の静かな性格。絵を描くのが得意で、繊細な心の持ち主。",
    friendship: 0
  }
];

interface ClassmatesListProps {
  onClose: () => void;
}

const ClassmatesList: React.FC<ClassmatesListProps> = ({ onClose }) => {
  const { gameState } = useGame();

  const getFriendshipLevel = (friendship: number) => {
    if (friendship >= 80) return "親友";
    if (friendship >= 60) return "仲が良い";
    if (friendship >= 40) return "友達";
    if (friendship >= 20) return "知り合い";
    return "まだ話したことがない";
  };

  const getFriendshipColor = (friendship: number) => {
    if (friendship >= 80) return "text-purple-600";
    if (friendship >= 60) return "text-blue-600";
    if (friendship >= 40) return "text-green-600";
    if (friendship >= 20) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">クラスメイト</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classmates.map((classmate) => (
            <button
              key={classmate.id}
              className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors text-left"
              onClick={() => {
                // イベント開始のロジックを追加予定
                console.log(`Start event with ${classmate.name}`);
              }}
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4">
                {classmate.imageUrl && (
                  <img
                    src={classmate.imageUrl}
                    alt={classmate.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-1">{classmate.name}</h3>
              <p className={`text-sm mb-2 ${getFriendshipColor(classmate.friendship)}`}>
                {getFriendshipLevel(classmate.friendship)}
              </p>
              <p className="text-sm text-gray-600">{classmate.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassmatesList;