import { createContext, useContext, useState, ReactNode } from 'react';
import type { Attributes } from '../types';
import {
  calculateModifier,
  calculateTotalSkillPoints,
} from '../utils/calculations';

const GITHUB_USERNAME = 'DevonD123';
const MAX_POINTS = 70;

interface CharacterContextType {
  scores: Attributes;
  modifiers: Attributes;
  abilityModifiers: Attributes;
  isLoading: boolean;
  totalPoints: number;
  maxPoints: number;
  skillPoints: Record<string, number>;
  availableSkillPoints: number;
  updateModifiers: (attribute: keyof Attributes, value: number) => void;
  modifySkill: (skillName: string, change: number) => void;
  saveCharacter: () => Promise<void>;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

interface CharacterProviderProps {
  children: ReactNode;
}

export function CharacterProvider({ children }: CharacterProviderProps) {
  const [skillPoints, setSkillPoints] = useState<Record<string, number>>({});
  const [scores, setScores] = useState<Attributes>({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });

  const [isLoading, setIsLoading] = useState(false);

  const abilityModifiers: Attributes = {
    Strength: calculateModifier(scores.Strength),
    Dexterity: calculateModifier(scores.Dexterity),
    Constitution: calculateModifier(scores.Constitution),
    Intelligence: calculateModifier(scores.Intelligence),
    Wisdom: calculateModifier(scores.Wisdom),
    Charisma: calculateModifier(scores.Charisma),
  };

  const totalPointUsed = Object.values(scores).reduce(
    (acc, curr) => acc + Math.abs(curr - 10),
    0
  );

  const availableSkillPoints = calculateTotalSkillPoints(
    abilityModifiers.Intelligence
  );

  const usedSkillPoints = Object.values(skillPoints).reduce(
    (sum, points) => sum + points,
    0
  );

  const remainingSkillPoints = availableSkillPoints - usedSkillPoints;

  const updateModifiers = (attribute: keyof Attributes, value: number) => {
    const newScore = scores[attribute] + value;
    const newTotalPoints =
      Object.values(scores).reduce((acc, curr) => acc + Math.abs(curr), 0) +
      value;

    if (newTotalPoints > MAX_POINTS) {
      alert(`You have reached the maximum points of ${MAX_POINTS}`);
      return;
    }

    if (newScore < 0) {
      alert('The minimum value for an attribute is 0');
      return;
    }

    setScores((prev) => ({
      ...prev,
      [attribute]: newScore,
    }));
  };

  const modifySkill = (skillName: string, change: number) => {
    if (change > 0 && remainingSkillPoints <= 0) {
      alert('No more skill points available');
      return;
    }

    setSkillPoints((prev) => {
      const currentValue = prev[skillName] || 0;
      const newValue = currentValue + change;

      if (newValue < 0) {
        alert('Skill points cannot be negative');
        return prev;
      }

      return {
        ...prev,
        [skillName]: newValue,
      };
    });
  };

  const modifiers: Attributes = {
    Strength: scores.Strength - 10,
    Dexterity: scores.Dexterity - 10,
    Constitution: scores.Constitution - 10,
    Intelligence: scores.Intelligence - 10,
    Wisdom: scores.Wisdom - 10,
    Charisma: scores.Charisma - 10,
  };

  const saveCharacter = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://recruiting.verylongdomaintotestwith.ca/api/{${GITHUB_USERNAME}}/character`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            scores,
            skillPoints,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error saving character:', error);
      alert('Something happened while saving your character');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CharacterContext.Provider
      value={{
        scores,
        modifiers,
        abilityModifiers,
        isLoading,
        updateModifiers,
        totalPoints: totalPointUsed,
        maxPoints: MAX_POINTS,
        skillPoints,
        availableSkillPoints: remainingSkillPoints,
        modifySkill,
        saveCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  return useContext(CharacterContext);
}
