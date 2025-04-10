export const formatAreaString = (input) => {
  // Extract the number and optional unit using regex
  const match = input?.match(/(\d+)\s*(\w*)/);

  if (!match) return input; // Return original if format is unexpected

  const number = parseInt(match[1], 10)?.toLocaleString(); // Format number with commas
  const unit = match[2] ? match[2] : "sqm"; // Use existing unit or default to 'sqm'

  return `${number}${unit}`; // Concatenate formatted number and unit
};
