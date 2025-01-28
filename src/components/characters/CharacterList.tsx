import React from 'react';
import { useCharacterList } from '../../context/characterListContext';
import { CharacterProvider } from '../../context/characterContext';
import Layout from '../layout';

const CharacterList: React.FC = () => {
  const { characterCount, addCharacter, removeCharacter } = useCharacterList();
  const characters = Array.from({ length: characterCount }, (_, i) => i); // ugly but works ton make the list

  return (
    <div className="character-list">
      {characters.map((index) => (
        <div key={index} className="character-container">
          <div className="character-header">
            <h2>Character {index + 1}</h2>
            {/* only last character so we dont remove the wrong once since im in a hurry */}
            {characterCount > 1 && index === characters.length - 1 && (
              <button className="button" onClick={() => removeCharacter(index)}>
                Remove
              </button>
            )}
          </div>
          {/* 
          8.Add the ability to edit multiple characters simultaneously with the same rules above 
          not an ideal solution but works for now
          would ahve to change the context to a id based system and done it all in one context that way i could save all characters at once and do the #10 requirment easier - theres some hacky callback methods we could use but it would be better to refactor
          */}
          <CharacterProvider>
            <Layout />
          </CharacterProvider>
        </div>
      ))}
      <div style={{ margin: '5px auto', width: 200, textAlign: 'center' }}>
        <button type="button" className="button" onClick={addCharacter}>
          Add Character
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
