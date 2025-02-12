/**
 * Calculates estimated reading time for a given text
 * @param {string} text - The input text to analyze
 * @param {Object} options - Configuration options
 * @param {number} options.wordsPerMinute - Reading speed in words per minute (default: 225)
 * @param {boolean} options.detailed - Whether to return detailed breakdown (default: false)
 * @returns {Object} Reading time estimation
 */
export default function calculateReadingTime(text, options = {}) {
  // Default options
  const { wordsPerMinute = 225, detailed = false } = options;

  // Input validation
  if (typeof text !== "string") {
    throw new Error("Input must be a string");
  }

  if (wordsPerMinute <= 0) {
    throw new Error("Words per minute must be positive");
  }

  // Clean the text and split into words
  const words = text
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .filter((word) => word.length > 0);

  const wordCount = words.length;
  const characterCount = text.length;

  // Calculate reading time
  const minutesRaw = wordCount / wordsPerMinute;
  const minutes = Math.ceil(minutesRaw);
  const seconds = Math.round((minutesRaw - minutes) * 60);

  // Format the time
  const readingTime = {
    minutes,
    seconds,
    totalMinutes: Math.round(minutesRaw * 10) / 10, // Round to 1 decimal
  };

  // Return detailed breakdown if requested
  if (detailed) {
    return {
      ...readingTime,
      statistics: {
        wordCount,
        characterCount,
        wordsPerMinute,
        averageWordLength: characterCount / wordCount || 0,
      },
    };
  }

  return readingTime;
}
