
export const pluralizeWord = (condition, word) => {
    if (condition) {
        return `${word}s`;
    }
    return word;
}