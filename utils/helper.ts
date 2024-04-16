export const capitalizeWords = (word: string | undefined) => {
  if (word === undefined) return "undefined";
  return word.charAt(0).toUpperCase() + word.slice(1);
};
