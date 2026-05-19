import { onlyNumbers } from './string-formatter-utils.js';

/**
 * Formats a phone number assuming it contains a country code, area code, and number.
 * Designed specifically for Brazilian patterns with or without the 9th digit.
 * 
 * @param phone - The raw phone string.
 * @returns The formatted phone number (e.g., "(11) 9 8888-7777").
 */
export const formatPhoneWithContryCode = (phone: string): string => {
    // Replaced manual regex with your global utility
    const cleaned = onlyNumbers(phone);

    if (cleaned.length > 12) {
        // Format for mobile numbers with 9th digit: +55 (DD) 9 XXXX-XXXX
        return cleaned.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/, '($2) $3 $4-$5');
    }
    // Format for landline numbers: +55 (DD) XXXX-XXXX
    return cleaned.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '($2) $3-$4');
};

/**
 * Formats a phone number based on its digit count, handling Brazilian local and DDD patterns.
 * Automatically strips '+55' and non-numeric characters before applying masks.
 * 
 * @param phone - The raw phone input.
 * @returns The masked phone string or an empty string if the length is unsupported.
 */
export const formatPhone = (phone: string | number | null | undefined): string => {
    if (!phone) return '';

    const cleanPhone = onlyNumbers(phone
        .toString()
        .trim()
        .replaceAll('+55', ''));

    /** 
     * Mapping of phone lengths to their respective Regex patterns and replacement strings.
     * 8: Local landline (XXXX-XXXX)
     * 9: Local mobile (XXXXX-XXXX)
     * 10: DDD + Landline ((XX) XXXX-XXXX)
     * 11: DDD + Mobile ((XX) XXXXX-XXXX)
     */
    const formats: Record<number, [RegExp, string]> = {
        8: [/(\d{4})(\d{4})/, '$1-$2'],
        9: [/(\d{5})(\d{4})/, '$1-$2'],
        10: [/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'],
        11: [/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'],
    };

    // Safe lookup: checks if the length matches one of our defined keys
    const format = formats[cleanPhone.length];

    if (!format) {
        return '';
    }

    const [pattern, replacement] = format;
    return cleanPhone.replace(pattern, replacement);
};
