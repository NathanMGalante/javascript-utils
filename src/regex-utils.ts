/**
 * Matches all digits (0-9).
 * Useful for finding or extracting numerical values from a string.
 */
export const ALL_NUMBERS: RegExp = /[0-9]/g;

/**
 * Matches all characters that are NOT digits (0-9).
 * Commonly used to strip formatting from phone numbers, ZIP codes, or IDs.
 */
export const ALL_NOT_NUMBERS: RegExp = /[^0-9]/g;

/**
 * Matches all lowercase and uppercase letters (a-z, A-Z).
 * Useful for filtering out numbers, symbols, or spaces.
 */
export const ALL_LETTERS: RegExp = /[a-zA-Z]/g;

/**
 * Matches all characters that are NOT lowercase or uppercase letters.
 * Useful for stripping alphabetic content out of a string.
 */
export const ALL_NOT_LETTERS: RegExp = /[^a-zA-Z]/g;

/**
 * Matches all alphanumeric characters (letters and digits).
 * Commonly used for basic validation of user inputs or IDs.
 */
export const ALL_NUMBERS_AND_LETTERS: RegExp = /[a-zA-Z0-9]/g;

/**
 * Matches any character that is NOT a letter or a digit.
 * Ideal for isolating alphanumeric tokens from formatting characters.
 */
export const ALL_NOT_NUMBERS_AND_LETTERS: RegExp = /[^a-zA-Z0-9]/g;

/**
 * Matches all whitespace characters, including spaces, tabs, and line breaks.
 * Useful for stripping or compacting empty spaces.
 */
export const ALL_WHITESPACES: RegExp = /\s/g;

/**
 * Matches all non-whitespace characters.
 * Useful for counting visible words or identifying actual content.
 */
export const ALL_NOT_WHITESPACES: RegExp = /\S/g;

/**
 * Matches all HTML tags (opening and closing).
 * Useful for sanitizing strings or extracting plain text from HTML content.
 */
export const ALL_HTML_TAGS: RegExp = /<\/?[^>]+(>|$)/g;

/**
 * Matches everything that is NOT part of an HTML tag.
 * Useful for extracting contents or parsing non-HTML tokens.
 */
export const ALL_NOT_HTML_TAGS: RegExp = /(?<=>)[^<]+(?=<)/g;

/**
 * Matches all symbols and punctuation.
 * Specifically, it matches any character that is NOT a word character (alphanumeric/underscore) or whitespace.
 */
export const ALL_SYMBOLS: RegExp = /[^\w\s]+/g;

/**
 * Matches any character that is NOT a symbol or punctuation.
 * It will capture letters, digits, underscores, and whitespaces.
 */
export const ALL_NOT_SYMBOLS: RegExp = /[\w\s]+/g;

/**
 * Matches a comprehensive HTML5/W3C compliant email address format.
 */
export const EMAIL: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Matches any block of text that does NOT conform to a valid email structure.
 * Useful for filtering out non-email tokens from a string.
 */
export const NOT_EMAIL: RegExp = /\b(?!(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*|".+")@(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]|(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\S+\b/g;

/**
 * Matches a standard Universally Unique Identifier (UUID) v4 format.
 */
export const UUID_V4: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Matches any token or text segment that is NOT a valid UUID v4 string.
 * Useful for sanitizing lists of identifiers.
 */
export const NOT_UUID_V4: RegExp = /\b(?![0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b)[a-z0-9-]+\b/gi;

/**
 * Matches a standard URL format (supporting http, https, and ftp).
 */
export const URL: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

/**
 * Matches words and text blocks that are NOT web links or URLs.
 * Frequently used to strip hyperlinks and retain only plain text.
 */
export const NOT_URL: RegExp = /\b(?!(?:https?|ftp):\/\/\S+)\S+/gi;

/**
 * Matches all Unicode emoji characters.
 */
export const ALL_EMOJIS: RegExp = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu;

/**
 * Matches any character that is NOT a Unicode emoji.
 * Useful for stripping out emojis and keeping text, numbers, and symbols.
 */
export const ALL_NOT_EMOJIS: RegExp = /[^\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu;

/**
 * Matches valid Hexadecimal color codes.
 */
export const HEX_COLOR: RegExp = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

/**
 * Matches words and tokens that do NOT represent a valid Hex color code.
 */
export const NOT_HEX_COLOR: RegExp = /\b(?!#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})\b)\S+/g;

/**
 * Matches a structurally valid JSON string format (objects and arrays).
 * Useful for pre-validating stringified data before execution.
 */
export const JSON_STRING: RegExp = /^[\s\r\n]*({[\s\S]*}|\[[\s\S]*])[\s\r\n]*$/;

/**
 * Matches content that does NOT resemble a valid JSON structure.
 * Useful for filtering out plain text logs from JSON logs.
 */
export const NOT_JSON_STRING: RegExp = /^(?![\s\r\n]*({[\s\S]*}|\[[\s\S]*])[\s\r\n]*$).*$/s;

/**
 * Matches standard IPv4 addresses (ranging from 0.0.0.0 to 255.255.255.255).
 * Useful for network validation, log parsing, or firewall rules.
 */
export const IPV4: RegExp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * Matches any token or text segment that is NOT a valid IPv4 address.
 * Useful for stripping IP addresses out of server log strings.
 */
export const NOT_IPV4: RegExp = /\b(?!(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b)\S+/g;

/**
 * Matches only standard printable ASCII characters (safe strings).
 * Useful for system paths, legacy database constraints, or basic text fields.
 */
export const ONLY_ASCII: RegExp = /^[\x20-\x7E]*$/;

/**
 * Matches any character that is NOT part of the standard ASCII table (e.g., accents, Cyrillic, Asian scripts).
 * Frequently used to detect or strip international and special characters.
 */
export const NOT_ASCII: RegExp = /[^\x20-\x7E]/g;

/**
 * Matches the structure of a standard JSON Web Token (JWT) consisting of three base64url-encoded parts.
 * Useful for front-end token inspection before processing API headers.
 */
export const JWT: RegExp = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

/**
 * Matches any block of text or token that does NOT follow the three-part JWT format.
 */
export const NOT_JWT: RegExp = /\b(?![A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*\b)\S+/g;

/**
 * Matches sequences composed strictly of a single repeated digit (e.g., "1111", "00000").
 * Commonly used to catch invalid dummy inputs like fake CPFs or sequential weak passwords.
 */
export const REPEATED_SAME_DIGIT: RegExp = /^(\d)\1+$/;

/**
 * Matches sequences that contain at least one different character or are not entirely made of the same digit.
 */
export const NOT_REPEATED_SAME_DIGIT: RegExp = /^(?!(\d)\1+$).+$/;
