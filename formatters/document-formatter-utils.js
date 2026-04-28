import { onlyNumbers } from './string-formatter-utils.js'
import { isCpf } from '../validations/cpf-validation-utils.js'
import { isCnpj } from '../validations/cnpj-validation-utils.js'

/**
 * Formats a valid CPF string by adding dots and a hyphen.
 * * Example: "12345678910" -> "123.456.789-10"
 * * @param {string|number} value - The CPF to be formatted.
 * @returns {string} The formatted CPF or an empty string if the input is invalid.
 */
export const formatCpf = (value) => {
  if (!isCpf(value)) return ''
  const cpf = onlyNumbers(value)
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/**
 * Formats a valid CNPJ string by adding dots, a slash, and a hyphen.
 * * Example: "12345678000199" -> "12.345.678/0001-99"
 * * @param {string|number} value - The CNPJ to be formatted.
 * @returns {string} The formatted CNPJ or an empty string if the input is invalid.
 */
export const formatCnpj = (value) => {
  if (!isCnpj(value)) return ''
  const cnpj = onlyNumbers(value)
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

/**
 * Automatically formats a document based on its type (CPF or CNPJ).
 * * This is a high-level helper that first attempts to format as CPF, 
 * and falls back to CNPJ if CPF validation fails.
 * * @param {string|number} document - The raw document value.
 * @returns {string} The formatted document string or an empty string if invalid.
 */
export const formatDocument = (document) => {
  return formatCpf(document) || formatCnpj(document)
}
