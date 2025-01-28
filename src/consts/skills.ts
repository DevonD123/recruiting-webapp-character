import { Attributes } from '../types';

export interface Skill {
  name: string;
  attribute: keyof Attributes;
}

export const SKILL_LIST: Skill[] = [
  { name: 'Acrobatics', attribute: 'Dexterity' },
  { name: 'Athletics', attribute: 'Strength' },
  { name: 'Deception', attribute: 'Charisma' },
  { name: 'History', attribute: 'Intelligence' },
  { name: 'Insight', attribute: 'Wisdom' },
  { name: 'Intimidation', attribute: 'Charisma' },
  { name: 'Investigation', attribute: 'Intelligence' },
  { name: 'Medicine', attribute: 'Wisdom' },
  { name: 'Nature', attribute: 'Intelligence' },
  { name: 'Perception', attribute: 'Wisdom' },
  { name: 'Performance', attribute: 'Charisma' },
  { name: 'Persuasion', attribute: 'Charisma' },
  { name: 'Religion', attribute: 'Intelligence' },
  { name: 'Stealth', attribute: 'Dexterity' },
  { name: 'Survival', attribute: 'Wisdom' },
];
