import isCnpj from "./n_cnpj";
import isCpf from "./n_cpf";

/**
 * Validates whether a given string or number is a valid Brazilian document 
 * (either a CPF or a CNPJ).
 * * This is a high-level helper that abstracts the specific type of document, 
 * making it ideal for generic "Identification" input fields.
 * * @param {string|number} value - The raw document value to be validated.
 * @returns {boolean} True if the value passes either CPF or CNPJ validation.
 */
const isDocument = (value) => isCpf(value) || isCnpj(value)

export { isCnpj, isCpf, isDocument };

