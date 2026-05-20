import * as regex from '../regex-utils.js';

/**
 * Removes all non-digit characters from a string or number.
 * @param value - The raw value to be cleaned.
 * @returns A string containing only numeric characters (0-9).
 */
export const onlyNumbers = (value: string | number): string =>
    String(value).replace(regex.ALL_NOT_NUMBERS, '');

/**
 * Removes all digit characters from a string or number.
 * @param value - The raw value to be cleaned.
 * @returns A string containing everything except numeric characters.
 */
export const onlyNotNumbers = (value: string | number): string =>
    String(value).replace(regex.ALL_NUMBERS, '');

/**
 * Removes all characters that are NOT letters (a-z, A-Z).
 * @param value - The raw value to be cleaned.
 * @returns A string containing only alphabetic characters.
 */
export const onlyLetters = (value: string | number): string =>
    String(value).replace(regex.ALL_NOT_LETTERS, '');

/**
 * Removes all letter characters from a string.
 * @param value - The raw value to be cleaned.
 * @returns A string containing everything except letters.
 */
export const onlyNotLetters = (value: string | number): string =>
    String(value).replace(regex.ALL_LETTERS, '');

/**
 * Removes all characters that are NOT letters or digits.
 * @param value - The raw value to be cleaned.
 * @returns A string containing only alphanumeric characters.
 */
export const onlyNumbersAndLetters = (value: string | number): string =>
    String(value).replace(regex.ALL_NOT_NUMBERS_AND_LETTERS, '');

/**
 * Removes all alphanumeric characters from a string.
 * @param value - The raw value to be cleaned.
 * @returns A string containing everything except letters and digits.
 */
export const onlyNotNumbersAndLetters = (value: string | number): string =>
    String(value).replace(regex.ALL_NUMBERS_AND_LETTERS, '');
