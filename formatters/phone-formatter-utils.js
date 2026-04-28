import { ALL_NOT_NUMBERS } from '../regex-utils.js'

/**
 * Formats a phone number assuming it contains a country code, area code, and number.
 * Designed specifically for Brazilian patterns with or without the 9th digit.
 * @param {string} phone - The raw phone string.
 * @returns {string} The formatted phone number (e.g., "(11) 9 8888-7777").
 */
export const formatPhoneWithContryCode = (phone) => {
    phone = phone.replace(/[^\d]/g, '')

    if (phone.length > 12) {
        // Format for mobile numbers with 9th digit: +55 (DD) 9 XXXX-XXXX
        return phone.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/, '($2) $3 $4-$5')
    }
    // Format for landline numbers: +55 (DD) XXXX-XXXX
    return phone.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '($2) $3-$4')
}

/**
 * Formats a phone number based on its digit count, handling Brazilian local and DDD patterns.
 * Automatically strips '+55' and non-numeric characters before applying masks.
 * @param {string|number} phone - The raw phone input.
 * @returns {string} The masked phone string or an empty string if the length is unsupported.
 */
export const formatPhone = (phone) => {
    if (!phone) {
        return ''
    }

    let cleanPhone = phone
        .toString()
        .trim()
        .replaceAll('+55', '')
        .replace(ALL_NOT_NUMBERS, '')

    /** * Mapping of phone lengths to their respective Regex patterns and replacement strings.
     * 8: Local landline (XXXX-XXXX)
     * 9: Local mobile (XXXXX-XXXX)
     * 10: DDD + Landline ((XX) XXXX-XXXX)
     * 11: DDD + Mobile ((XX) XXXXX-XXXX)
     */
    const formats = {
        8: [/(\d{4})(\d{4})/, '$1-$2'],
        9: [/(\d{5})(\d{4})/, '$1-$2'],
        10: [/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'],
        11: [/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'],
    }

    const [pattern, replacement] = formats[cleanPhone.length] || []
    return pattern ? cleanPhone.replace(pattern, replacement) : ''
}
