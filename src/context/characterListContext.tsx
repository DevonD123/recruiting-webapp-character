import { createContext, useContext, useState, ReactNode } from 'react';

interface CharacterListContextType {
  addCharacter: () => void;
  removeCharacter: (index: number) => void;
  characterCount: number;
}

const CharacterListContext = createContext<
  CharacterListContextType | undefined
>(undefined);

interface CharacterListProviderProps {
  children: ReactNode;
}

export function CharacterListProvider({
  children,
}: CharacterListProviderProps) {
  const [characterCount, setCharacterCount] = useState(1);

  const addCharacter = () => {
    setCharacterCount((prev) => prev + 1);
  };

  // only removing last for now to keep it simple otherwise need to shift ds to an id based system or index based (no ideal tho)
  const removeCharacter = (index: number) => {
    if (characterCount > 1) {
      setCharacterCount((prev) => prev - 1);
    }
  };

  return (
    <CharacterListContext.Provider
      value={{
        addCharacter,
        removeCharacter,
        characterCount,
      }}
    >
      {children}
    </CharacterListContext.Provider>
  );
}

export function useCharacterList() {
  return useContext(CharacterListContext);
}
