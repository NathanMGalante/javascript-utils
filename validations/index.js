import { isCnpj, isCpf, isDocument } from './n_document_validation.js'
import isEmail from './n_email_validation.js'

/**
 * Checks if a given value is null, undefined, empty, or whitespace.
 * Supports strings, arrays, and objects.
 * * @param {any} obj - The value to check (string, array, object, etc.).
 * @returns {boolean} True if the value is considered empty, false otherwise.
 */
const isNullOrEmpty = (obj) => {
    if (obj === null || obj === undefined) {
        return true
    }
    if (typeof obj === 'string') {
        return !obj.trim().length
    }
    if (Array.isArray(obj)) {
        return !obj.length
    }
    if (typeof obj === 'object') {
        return !Object.keys(obj).length
    }
    return false
}

export { isCnpj, isCpf, isDocument, isEmail, isNullOrEmpty }

