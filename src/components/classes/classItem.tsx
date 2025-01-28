import React, { useState } from 'react';
import type { Attributes } from '../../types';
import { useCharacter } from '../../context/characterContext';

const ClassItem: React.FC<{ name: string; minAttributes: Attributes }> = ({
  name,
  minAttributes,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scores } = useCharacter();

  const didPassMinRequirements = Object.entries(minAttributes).every(
    ([key, value]) => value <= scores[key]
  );

  return (
    <li
      className={`classItem ${didPassMinRequirements ? 'active' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div>{name}</div>
      {isOpen && (
        <ul className="reqList">
          <p className="helptext">Minimum Requirements</p>
          {Object.entries(minAttributes).map(([key, value]) => (
            <li key={key} className={value <= scores[key] ? 'active' : ''}>
              {key}: {value}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default ClassItem;
