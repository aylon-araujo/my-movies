export const pluralize = (isPlural: boolean, word: string): string => {
  if (isPlural) return `${word}s`;
  return word;
};
