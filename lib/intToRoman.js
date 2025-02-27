/**
 * Converts an integer to a Roman numeral string
 * @param {number} num - Integer to convert (should be between 1 and 3999)
 * @returns {string} Roman numeral representation of the input integer
 */
export default function intToRoman(num) {
  // Input validation
  if (!Number.isInteger(num) || num < 1 || num > 3999) {
    throw new Error("Input must be an integer between 1 and 3999");
  }

  // Maps for Roman numeral symbols
  const romanSymbols = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";
  let remaining = num;

  // Iterate through symbols from largest to smallest
  for (const { value, symbol } of romanSymbols) {
    // Repeat symbol while the remaining value is greater than or equal to current symbol value
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
}

// Example usage:
// console.log(intToRoman(3));     // "III"
// console.log(intToRoman(58));    // "LVIII"
// console.log(intToRoman(1994));  // "MCMXCIV"
