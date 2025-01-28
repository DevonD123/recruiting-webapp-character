import React from 'react';
import { useCharacter } from '../../context/characterContext';

const SaveButton: React.FC = () => {
  const { saveCharacter, isLoading } = useCharacter();

  return (
    <button className="button" onClick={saveCharacter} disabled={isLoading}>
      {isLoading ? 'Saving...' : 'Save Character'}
    </button>
  );
};

export default SaveButton;
