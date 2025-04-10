export const getOrdinal = number => {
  if (typeof number !== 'number') {
    return ''; // Return an empty string for invalid inputs
  }

  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  // Special cases for 11, 12, and 13, as they don't follow the usual pattern
  if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
    return number + 'th';
  }

  // Use the appropriate suffix based on the last digit
  const suffix = suffixes[lastDigit] || 'th';

  return number + suffix;
};
