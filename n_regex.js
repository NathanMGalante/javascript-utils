/**
 * Matches all characters that are NOT digits (0-9).
 * Commonly used to strip formatting from phone numbers, ZIP codes, or IDs.
 * @type {RegExp}
 */
export const ALL_NOT_NUMBERS = /[^0-9]/g

/**
 * Matches all HTML tags (opening and closing).
 * Useful for sanitizing strings or extracting plain text from HTML content.
 * @type {RegExp}
 */
export const ALL_HTML_TAGS = /<\/?[^>]+(>|$)/g

/**
 * Matches all symbols and punctuation.
 * Specifically, it matches any character that is NOT a word character (alphanumeric/underscore) or whitespace.
 * @type {RegExp}
 */
export const ALL_SYMBOLS = /[^\w\s]+/g