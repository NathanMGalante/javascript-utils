import { onlyNumbers } from '../formatters/string-formatter-utils.js';
import { REPEATED_SAME_DIGIT } from '../regex-utils.js';

/**
 * Calculates the CPF verification digit based on the Modulo 11 algorithm.
 * 
 * @param value - The summed product of digits and weights.
 * @returns The resulting single-digit verification number (0-9).
 */
const getVerificationDigit = (value: number): number => {
  const rest = value % 11;
  return rest < 2 ? 0 : 11 - rest;
};

/**
 * Higher-order function that returns a multiplier for a specific digit.
 * Used to calculate the weighted sum of CPF digits.
 * 
 * @param factor - The starting weight (usually 10 or 11).
 * @returns A mapper function for array processing.
 */
const multiplyDigits = (factor: number) => (digit: string, index: number): number =>
  Number(digit) * (factor - index);

/**
 * Internal logic to validate the mathematical integrity of the CPF digits.
 * It checks for blocked patterns (all same digits) and calculates both 
 * verification digits.
 * 
 * @param cpf - A string containing exactly 11 numeric digits.
 * @returns True if the mathematical check digits match.
 */
const isValidCpf = (cpf: string): boolean => {
  // CPF cannot be a sequence of the same number (e.g., 111.111.111-11)
  if (REPEATED_SAME_DIGIT.test(cpf)) return false;

  const brokenCpf = cpf.match(/^(\d{9})(\d{2})$/);
  
  // Guard clause to ensure the match succeeded before accessing array indexes
  if (!brokenCpf) return false;

  const withoutDigits: string[] = brokenCpf[1].split('');
  const digits: string = brokenCpf[2];

  // First digit validation (weighted sum starting at 10)
  const tempFirstDigit = withoutDigits
    .map(multiplyDigits(10))
    .reduce((x, y) => x + y, 0);

  const firstDigit = getVerificationDigit(tempFirstDigit);

  // Second digit validation (weighted sum starting at 11, including 1st check digit)
  const tempSecondDigit = withoutDigits
    .concat(String(firstDigit))
    .map(multiplyDigits(11))
    .reduce((x, y) => x + y, 0);

  const secondDigit = getVerificationDigit(tempSecondDigit);

  return String(firstDigit) + secondDigit === digits;
};

/**
 * Validates a CPF (Cadastro de Pessoas Físicas) string or number.
 * This is the main entry point: it cleans the input, checks length, 
 * and runs the validation algorithm.
 * 
 * @param cpf - The raw CPF string or number.
 * @returns True if the CPF is valid, false otherwise.
 */
export const isCpf = (cpf: string | number): boolean => {
  const cleanCpf = onlyNumbers(cpf);
  return cleanCpf.length === 11 && isValidCpf(cleanCpf);
};

export default isCpf;
