import React from 'react';
import { useCharacter } from '../../context/characterContext';
import { SKILL_LIST } from '../../consts/skills';
import ValueControls from '../common/ValueControls';

const Skills: React.FC = () => {
  const {
    abilityModifiers,
    skillPoints,
    modifySkill,
    availableSkillPoints,
    isLoading,
  } = useCharacter();

  const formatModifier = (modifier: number) => {
    return modifier >= 0 ? `+${modifier}` : modifier.toString();
  };

  return (
    <div className="attributes-container">
      <h2>Skills</h2>
      <p className="pointsCounter">
        Available Skill Points: {availableSkillPoints}
      </p>
      {SKILL_LIST.map((skill) => {
        const points = skillPoints[skill.name] || 0;
        const abilityMod = abilityModifiers[skill.attribute];
        const totalBonus = points + abilityMod;

        return (
          <div key={skill.name} className="attribute-row">
            <span className="attribute-name">{skill.name}:</span>
            <span className="attribute-value">Points: {points}</span>
            <span className="attribute-modifier">
              ({skill.attribute} Mod: {formatModifier(abilityMod)}) Total:{' '}
              {formatModifier(totalBonus)}
            </span>
            <ValueControls
              onIncrement={() => modifySkill(skill.name, 1)}
              onDecrement={() => modifySkill(skill.name, -1)}
              disableIncrement={availableSkillPoints <= 0}
              disableDecrement={points <= 0}
              isLoading={isLoading}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Skills;
