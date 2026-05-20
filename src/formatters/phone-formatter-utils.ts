import { onlyNumbers } from './string-formatter-utils.js';

/**
 * Formats a phone number that includes a country code prefix.
 * Supports Brazilian patterns with or without the 9th digit.
 *
 * Supported output formats:
 * - +99 (99) 9999-9999  (12 digits: country + area + landline)
 * - +99 (99) 99999-9999 (13 digits: country + area + mobile)
 *
 * @param phone - The raw phone string.
 * @returns The formatted phone number or an empty string if unsupported.
 */
export const formatPhoneWithContryCode = (phone: string): string => {
    const cleaned = onlyNumbers(phone);

    if (cleaned.length === 13) {
        // +99 (99) 99999-9999
        return cleaned.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
    }

    if (cleaned.length === 12) {
        // +99 (99) 9999-9999
        return cleaned.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 ($2) $3-$4');
    }

    return '';
};

/**
 * Formats a phone number based on its digit count, handling Brazilian local and DDD patterns.
 * Automatically strips country code prefix and non-numeric characters before applying masks.
 *
 * Supported output formats:
 * - 9999-9999         (8 digits: local landline)
 * - 99999-9999        (9 digits: local mobile)
 * - (99) 9999-9999    (10 digits: DDD + landline)
 * - (99) 99999-9999   (11 digits: DDD + mobile)
 *
 * @param phone - The raw phone input.
 * @returns The masked phone string or an empty string if the length is unsupported.
 */
export const formatPhone = (phone: string | number | null | undefined): string => {
    if (!phone) return '';

    const cleaned = onlyNumbers(phone
        .toString()
        .trim()
        .replaceAll('+55', ''),
    );

    const formats: Record<number, [RegExp, string]> = {
        8: [/(\d{4})(\d{4})/, '$1-$2'],
        9: [/(\d{5})(\d{4})/, '$1-$2'],
        10: [/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'],
        11: [/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'],
    };

    const format = formats[cleaned.length];

    if (!format) return '';

    const [pattern, replacement] = format;
    return cleaned.replace(pattern, replacement);
};
