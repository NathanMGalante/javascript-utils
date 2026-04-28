import { onlyNumbers } from '../formatters/n_string_formatter.js'

/**
 * Calculates the CPF verification digit based on the Modulo 11 algorithm.
 * * @param {number} value - The summed product of digits and weights.
 * @returns {number} The resulting single-digit verification number (0-9).
 */
const getVerificationDigit = (value) => {
  const rest = value % 11
  return rest < 2 ? 0 : 11 - rest
}

/**
 * Higher-order function that returns a multiplier for a specific digit.
 * Used to calculate the weighted sum of CPF digits.
 * * @param {number} factor - The starting weight (usually 10 or 11).
 * @returns {Function} A mapper function for array processing.
 */
const multiplyDigits = (factor) => (digit, index) =>
  Number(digit) * (factor - index)

/**
 * Internal logic to validate the mathematical integrity of the CPF digits.
 * It checks for blocked patterns (all same digits) and calculates both 
 * verification digits.
 * * @param {string} cpf - A string containing exactly 11 numeric digits.
 * @returns {boolean} True if the mathematical check digits match.
 */
const isValidCpf = (cpf) => {
  // CPF cannot be a sequence of the same number (e.g., 111.111.111-11)
  const isSameNumber = cpf.match(/^(\d)\1{10}$/)

  if (isSameNumber) return false

  const brokenCpf = cpf.match(/^(\d{9})(\d{2})$/)
  const withoutDigits = brokenCpf[1].split('')
  const digits = brokenCpf[2]

  // First digit validation (weighted sum starting at 10)
  const tempFirstDigit = withoutDigits
    .map(multiplyDigits(10))
    .reduce((x, y) => x + y)

  const firstDigit = getVerificationDigit(tempFirstDigit)

  // Second digit validation (weighted sum starting at 11, including 1st check digit)
  const tempSecondDigit = withoutDigits
    .concat(firstDigit)
    .map(multiplyDigits(11))
    .reduce((x, y) => x + y)

  const secondDigit = getVerificationDigit(tempSecondDigit)

  return String(firstDigit) + secondDigit === digits
}

/**
 * Validates a CPF (Cadastro de Pessoas Físicas) string.
 * This is the main entry point: it cleans the input, checks length, 
 * and runs the validation algorithm.
 * * @param {string|number} cpf - The raw CPF string or number.
 * @returns {boolean} True if the CPF is valid, false otherwise.
 */
const isCpf = (cpf) => {
  const cleanCpf = onlyNumbers(cpf)
  return cleanCpf.length === 11 && isValidCpf(cleanCpf)
}

export default isCpf
