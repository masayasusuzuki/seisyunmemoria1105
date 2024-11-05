import React, { useState } from 'react';

const dialogues = [
  "ようこそ、君の新しい物語へ。",
  "ここは、季節の風が心地よく流れる、とある高校。\n静かな街に佇むその場所には、数えきれないほどの出会いと、まだ見ぬ可能性が広がっている。",
  "君は今日からこの学校の生徒。転校生として、新しい生活が始まる。\nどんな友達ができるのか、どんな思い出が待っているのか──それはすべて、君の選択次第。",
  "授業に部活動、休み時間や放課後。\n学校生活の中で、さまざまな人と触れ合い、時に悩み、時に笑う。",
  "さあ、新しい一歩を踏み出そう。\nここで君が描く青春のキャンバスに、どんな色が重なっていくのかは君次第だ。"
];

interface PrologueProps {
  onComplete: () => void;
}

const Prologue: React.FC<PrologueProps> = ({ onComplete }) => {
  const [currentDialogue, setCurrentDialogue] = useState(0);

  const handleNext = () => {
    if (currentDialogue < dialogues.length - 1) {
      setCurrentDialogue(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      onClick={handleNext}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 max-w-2xl w-full">
        <p className="text-xl leading-relaxed whitespace-pre-line font-serif">
          {dialogues[currentDialogue]}
        </p>
        <div className="mt-8 text-sm text-gray-500 text-center">
          クリックして次へ
        </div>
      </div>
    </div>
  );
};

export default Prologue;