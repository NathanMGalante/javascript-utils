import { onlyNumbers } from '../formatters/n_string_formatter.js'

/**
 * Calculates a single verification digit for a CNPJ.
 * Uses the Modulo 11 algorithm with weights rotating between 2 and 9.
 * * @param {string} numbers - The base numbers to calculate the digit from.
 * @returns {number} The calculated verification digit (0-9).
 */
const digit = (numbers) => {
    let index = 2

    // Reverse the string to apply weights from right to left
    const reverse = numbers
        .split('')
        .reduce((buffer, number) => [+number].concat(buffer), [])

    const sum = reverse.reduce((buffer, number) => {
        const newBuffer = number * index + buffer
        // Weight rotation: if weight reaches 9, it resets to 2
        index = index === 9 ? 2 : index + 1
        return newBuffer
    }, 0)

    const mod = sum % 11

    return mod < 2 ? 0 : 11 - mod
}

/**
 * Validates a CNPJ (Cadastro Nacional da Pessoa Jurídica) string.
 * It sanitizes the input, blocks known invalid sequences, and verifies
 * the two mathematical check digits.
 * * @param {string|number} cnpj - The raw CNPJ string or number.
 * @returns {boolean} True if the CNPJ is valid, false otherwise.
 */
export const isCnpj = (cnpj) => {
    const cleaned = onlyNumbers(cnpj)

    // CNPJ must have exactly 14 digits and cannot be a sequence of identical numbers
    if (cleaned.length !== 14 || /^(\d)\1+$/.test(cleaned)) {
        return false
    }

    // Step 1: Calculate the first digit based on the first 12 numbers
    let registration = cleaned.substr(0, 12)
    registration += digit(registration)

    // Step 2: Calculate the second digit based on the 13 numbers (including the first calculated digit)
    registration += digit(registration)

    // Compare the calculated digits with the ones provided in the input
    return registration.substr(-2) === cleaned.substr(-2)
}

export default isCnpj
