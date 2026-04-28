import isCpf from '../../validations/cpf-validation-utils.js'
import isCnpj from '../../validations/cnpj-validation-utils.js'
import isDocument from '../../validations/document-validation-utils.js'
import isEmail from '../../validations/email-validation-utils.js'
import { isNullOrEmpty } from '../../validations/index.js'

describe('Validation Utils', () => {
  describe('CPF Validation', () => {
    it('should validate correct CPF', () => {
      expect(isCpf('11144477735')).toBe(true)
    })

    it('should reject invalid CPF', () => {
      expect(isCpf('00000000000')).toBe(false)
    })

    it('should handle formatted CPF', () => {
      expect(isCpf('111.444.777-35')).toBe(true)
    })

    it('should reject null/undefined', () => {
      expect(isCpf(null)).toBe(false)
      expect(isCpf(undefined)).toBe(false)
    })

    it('should reject short CPF', () => {
      expect(isCpf('111')).toBe(false)
    })
  })

  describe('CNPJ Validation', () => {
    it('should validate correct CNPJ', () => {
      expect(isCnpj('11222333000181')).toBe(true)
    })

    it('should reject invalid CNPJ', () => {
      expect(isCnpj('00000000000000')).toBe(false)
    })

    it('should handle formatted CNPJ', () => {
      expect(isCnpj('11.222.333/0001-81')).toBe(true)
    })

    it('should reject null/undefined', () => {
      expect(isCnpj(null)).toBe(false)
      expect(isCnpj(undefined)).toBe(false)
    })

    it('should reject short CNPJ', () => {
      expect(isCnpj('111')).toBe(false)
    })
  })

  describe('Email Validation', () => {
    it('should validate correct email', () => {
      expect(isEmail('test@example.com')).toBe(true)
      expect(isEmail('user@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(isEmail('invalid')).toBe(false)
      expect(isEmail('user@')).toBe(false)
      expect(isEmail('@domain.com')).toBe(false)
    })

    it('should reject null/undefined', () => {
      expect(isEmail(null)).toBe(false)
      expect(isEmail(undefined)).toBe(false)
    })

    it('should handle emails with plus', () => {
      expect(isEmail('user+tag@example.com')).toBe(true)
    })
  })

  describe('Null or Empty Validation', () => {
    it('should detect null and undefined', () => {
      expect(isNullOrEmpty(null)).toBe(true)
      expect(isNullOrEmpty(undefined)).toBe(true)
    })

    it('should detect empty strings', () => {
      expect(isNullOrEmpty('')).toBe(true)
      expect(isNullOrEmpty('   ')).toBe(true)
    })

    it('should detect empty arrays', () => {
      expect(isNullOrEmpty([])).toBe(true)
    })

    it('should detect empty objects', () => {
      expect(isNullOrEmpty({})).toBe(true)
    })

    it('should return false for non-empty values', () => {
      expect(isNullOrEmpty('hello')).toBe(false)
      expect(isNullOrEmpty([1, 2, 3])).toBe(false)
      expect(isNullOrEmpty({ a: 1 })).toBe(false)
    })
  })

  describe('Document Validation', () => {
    it('should validate CPF', () => {
      expect(isDocument('11144477735')).toBe(true)
    })

    it('should validate CNPJ', () => {
      expect(isDocument('11222333000181')).toBe(true)
    })

    it('should reject invalid documents', () => {
      expect(isDocument('00000000000000')).toBe(false)
    })

    it('should reject null/undefined', () => {
      expect(isDocument(null)).toBe(false)
      expect(isDocument(undefined)).toBe(false)
    })
  })
})
