import React from 'react';

interface Character {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const characters: Character[] = [
  { 
    id: 1, 
    name: "キャラクター 1", 
    description: "明るく活発な性格。運動が得意で、誰とでもすぐに仲良くなれる。",
    imageUrl: "https://cdn.discordapp.com/attachments/989274712590917653/1303298049736704070/masayasu2970_outgoing_handsome_student_visual_novel_protagonist_b668f4e7-b982-4e0e-af49-d373f8003cc8.png?ex=672b3e65&is=6729ece5&hm=c1e046cc43b074663b688d07469fb0994c31cfb4a4664d0e12d2eb977dc8f0b4"
  },
  { 
    id: 2, 
    name: "キャラクター 2", 
    description: "知的で冷静な性格。学業成績が優秀で、読書が趣味。",
    imageUrl: "https://cdn.discordapp.com/attachments/989274712590917653/1303298256243261472/masayasu2970_intellectual_bishounen_studious_high_school_studen_6e9ef023-6926-4187-a803-53e42f645419.png?ex=672b3e96&is=6729ed16&hm=2cd9d0a7c6c1fd3b72d625fdaed080557b4e408f8f9fb31a87d389df14fc5fc4"
  },
  { 
    id: 3, 
    name: "キャラクター 3", 
    description: "芸術的なセンスを持つ。絵を描くことが好きで、繊細な性格。",
    imageUrl: "https://cdn.discordapp.com/attachments/989274712590917653/1303298684867575819/masayasu2970_sensitive_artist_boy_dating_sim_style_elegant_draw_72f516b4-ab89-4b25-a969-60e10dab1ee1.png?ex=672b3efc&is=6729ed7c&hm=99252b65a08c8a553e8eab675d48a84e335841942ee88dbbb009045a8e555949&"
  }
];

interface CharacterSelectProps {
  onSelect: (characterId: number) => void;
  selectedCharacter: number | null;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelect, selectedCharacter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {characters.map((character) => (
        <div
          key={character.id}
          className={`p-4 rounded-lg ${
            selectedCharacter === character.id
              ? 'bg-blue-100 border-2 border-blue-500'
              : 'bg-white hover:bg-gray-50'
          } cursor-pointer transition-all duration-200`}
          onClick={() => onSelect(character.id)}
        >
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {character.imageUrl ? (
              <img 
                src={character.imageUrl} 
                alt={character.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <span className="text-gray-400">キャラクター画像</span>
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2">{character.name}</h3>
          <p className="text-gray-600 text-sm">{character.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterSelect;