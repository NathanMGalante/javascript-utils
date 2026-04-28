import { ALL_NOT_NUMBERS } from '../../n_regex.js'

/**
 * Removes all non-digit characters from a string or number.
 * Useful for sanitizing inputs like CPF, ZIP codes, or phone numbers 
 * before persistence or processing.
 * * @param {string|number} value - The raw value to be cleaned.
 * @returns {string} A string containing only numeric characters (0-9).
 */
export const onlyNumbers = (value) => String(value).replace(ALL_NOT_NUMBERS, '')
