import React, { useState } from 'react';
import { useCharacter } from '../../context/characterContext';
import { SKILL_LIST } from '../../consts/skills';
import type { Skill } from '../../consts/skills';

interface RollResult {
  roll: number;
  total: number;
  isSuccess: boolean;
}

const SkillCheck: React.FC = () => {
  const { skillPoints, abilityModifiers } = useCharacter();
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILL_LIST[0]);
  const [dc, setDc] = useState<number>(10);
  const [result, setResult] = useState<RollResult | null>(null);

  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 20) + 1; // 1-20
    const skillBonus = skillPoints[selectedSkill.name] || 0;
    const abilityMod = abilityModifiers[selectedSkill.attribute];
    const total = roll + skillBonus + abilityMod;

    setResult({
      roll,
      total,
      isSuccess: total >= dc,
    });
  };

  return (
    <div className="attributes-container">
      <h2>Skill Check</h2>
      <div className="skill-check-controls">
        <div className="control-group">
          <label>
            Skill:
            <select
              value={selectedSkill.name}
              onChange={(e) => {
                const skill = SKILL_LIST.find((s) => s.name === e.target.value);
                if (skill) setSelectedSkill(skill);
              }}
            >
              {SKILL_LIST.map((skill) => (
                <option key={skill.name} value={skill.name}>
                  {skill.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="control-group">
          <label>
            DC:
            <input
              type="number"
              min="1"
              value={dc}
              onChange={(e) =>
                setDc(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
          </label>
        </div>
        <button className="button" onClick={handleRoll}>
          Roll
        </button>
      </div>
      {result && (
        <div className="skill-check-result">
          <p>Roll: {result.roll}</p>
          <p>
            Total: {result.total} ({result.roll} +{' '}
            {skillPoints[selectedSkill.name] || 0} skill +{' '}
            {abilityModifiers[selectedSkill.attribute]}{' '}
            {selectedSkill.attribute} mod)
          </p>
          <p className={result.isSuccess ? 'success' : 'failure'}>
            {result.isSuccess ? 'Success!' : 'Failure'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillCheck;
