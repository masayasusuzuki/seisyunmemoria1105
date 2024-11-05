import React, { useState, useEffect } from 'react';
import { useGame } from './GameContext';

interface StudyScenario {
  description: string;
  choices: {
    text: string;
    effect: number;
  }[];
}

const getScenarioByLevel = (level: number): StudyScenario => {
  if (level <= 30) {
    return {
      description: "問題が難しくて手も足も出ない状況です。どうしますか？",
      choices: [
        { text: "基礎から復習する", effect: 8 },
        { text: "先生に質問する", effect: 10 },
        { text: "友達に教えてもらう", effect: 5 }
      ]
    };
  } else if (level <= 70) {
    return {
      description: "ある程度理解できていますが、まだ完璧ではありません。",
      choices: [
        { text: "問題集を解く", effect: 10 },
        { text: "ノートをまとめ直す", effect: 8 },
        { text: "図書館で参考書を探す", effect: 12 }
      ]
    };
  } else {
    return {
      description: "かなり理解が進んでいます。さらなる高みを目指しましょう。",
      choices: [
        { text: "発展問題に挑戦", effect: 15 },
        { text: "他の人に教える", effect: 12 },
        { text: "模試の過去問を解く", effect: 10 }
      ]
    };
  }
};

interface StudySimulationProps {
  onComplete: () => void;
  energyCost: number;
}

const StudySimulation: React.FC<StudySimulationProps> = ({ onComplete, energyCost }) => {
  const { gameState, updateGameState } = useGame();
  const [scenario, setScenario] = useState<StudyScenario | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gainedPoints, setGainedPoints] = useState(0);

  useEffect(() => {
    setScenario(getScenarioByLevel(gameState.stats.学力));
  }, [gameState.stats.学力]);

  const handleChoice = (effect: number) => {
    setGainedPoints(effect);
    setShowResult(true);

    const newStats = { ...gameState.stats };
    newStats.学力 = Math.min(100, newStats.学力 + effect);
    newStats.体力 = Math.max(0, newStats.体力 - energyCost);

    updateGameState({
      stats: newStats,
      currentWeek: gameState.currentWeek + 1
    });
  };

  const handleContinue = () => {
    onComplete();
  };

  if (!scenario) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="mb-8">
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4">
            {/* 画像スペース確保 */}
          </div>
          
          {!showResult ? (
            <>
              <p className="text-lg mb-6">{scenario.description}</p>
              <div className="space-y-4">
                {scenario.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice.effect)}
                    className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">
                学力が {gainedPoints} ポイント上昇しました！
              </p>
              <p className="mb-6">現在の学力: {gameState.stats.学力}</p>
              <button
                onClick={handleContinue}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                次へ進む
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySimulation;