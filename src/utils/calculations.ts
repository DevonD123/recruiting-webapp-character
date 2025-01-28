export function calculateModifier(score: number): number {
  // For every 2 points difference from 10, get +1 or -1
  // Examples:
  // 10-11 → 0
  // 12-13 → +1
  // 14-15 → +2
  // 8-9 → -1
  return Math.floor((score - 10) / 2);
}

export function calculateTotalSkillPoints(
  intelligenceModifier: number
): number {
  return 10 + 4 * intelligenceModifier;
}

export const calculateAttributeTotal = (
  attributes: Record<string, number>
): number => {
  return Object.values(attributes).reduce(
    (sum, value) => sum + Math.abs(value),
    0
  );
};
