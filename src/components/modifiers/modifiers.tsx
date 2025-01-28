import React from 'react';
import { useCharacter } from '../../context/characterContext';
import { ATTRIBUTE_LIST } from '../../consts';
import Remaining from './remaining';
import { Attributes } from '../../types';
import ValueControls from '../common/ValueControls';

const Modifiers: React.FC = () => {
  const {
    scores,
    abilityModifiers,
    totalPoints,
    updateModifiers,
    maxPoints,
    isLoading,
  } = useCharacter();

  const formatModifier = (modifier: number) => {
    return modifier >= 0 ? `+${modifier}` : modifier.toString();
  };

  return (
    <div className="attributes-container">
      <h2>Attributes</h2>
      <Remaining />
      {ATTRIBUTE_LIST.map((attribute: keyof Attributes) => (
        <div key={attribute} className="attribute-row">
          <span className="attribute-name">{attribute}:</span>
          <span className="attribute-value">{scores[attribute]}</span>
          <span className="attribute-modifier">
            (Ability Modifier: {formatModifier(abilityModifiers[attribute])})
          </span>
          <ValueControls
            onIncrement={() => updateModifiers(attribute, 1)}
            onDecrement={() => updateModifiers(attribute, -1)}
            disableIncrement={totalPoints >= maxPoints}
            disableDecrement={scores[attribute] <= 0}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default Modifiers;
