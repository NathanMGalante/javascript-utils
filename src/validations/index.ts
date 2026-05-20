import { isCnpj, isCpf, isDocument } from './document-validation-utils.js';
import isEmail from './email-validation-utils.js';

/**
 * Checks if a given value is null, undefined, empty, or whitespace.
 * Supports strings, arrays, and objects.
 * @param obj - The value to check (string, array, object, etc.).
 * @returns True if the value is considered empty, false otherwise.
 */
const isNullOrEmpty = (obj: unknown): boolean => {
    if (obj === null || obj === undefined) {
        return true;
    }
    if (typeof obj === 'string') {
        return !obj.trim().length;
    }
    if (Array.isArray(obj)) {
        return !obj.length;
    }
    if (typeof obj === 'object') {
        return !Object.keys(obj as Record<string, unknown>).length;
    }
    return false;
};

export { isCnpj, isCpf, isDocument, isEmail, isNullOrEmpty };

