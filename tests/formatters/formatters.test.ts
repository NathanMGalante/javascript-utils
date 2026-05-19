import { formatCpf, formatCnpj, formatDocument } from '../../formatters/document-formatter-utils.js'
import { formatPhone, formatPhoneWithContryCode } from '../../formatters/phone-formatter-utils.js'
import { onlyNumbers } from '../../formatters/string-formatter-utils.js'

describe('Formatters', () => {
  describe('Document Formatters', () => {
    describe('formatCpf', () => {
      it('should format valid CPF', () => {
        expect(formatCpf('11144477735')).toBe('111.444.777-35')
      })

      it('should format CPF with numbers only', () => {
        expect(formatCpf(11144477735)).toBe('111.444.777-35')
      })

      it('should return empty string for invalid CPF', () => {
        expect(formatCpf('00000000000')).toBe('')
      })

      it('should handle formatted input', () => {
        expect(formatCpf('111.444.777-35')).toBe('111.444.777-35')
      })
    })

    describe('formatCnpj', () => {
      it('should format valid CNPJ', () => {
        expect(formatCnpj('11222333000181')).toBe('11.222.333/0001-81')
      })

      it('should format CNPJ with numbers only', () => {
        expect(formatCnpj(11222333000181)).toBe('11.222.333/0001-81')
      })

      it('should return empty string for invalid CNPJ', () => {
        expect(formatCnpj('00000000000000')).toBe('')
      })

      it('should handle formatted input', () => {
        expect(formatCnpj('11.222.333/0001-81')).toBe('11.222.333/0001-81')
      })
    })

    describe('formatDocument', () => {
      it('should format CPF', () => {
        expect(formatDocument('11144477735')).toBe('111.444.777-35')
      })

      it('should format CNPJ', () => {
        expect(formatDocument('11222333000181')).toBe('11.222.333/0001-81')
      })

      it('should return empty string for invalid document', () => {
        expect(formatDocument('00000000000000')).toBe('')
      })
    })
  })

  describe('Phone Formatters', () => {
    describe('formatPhone', () => {
      it('should format 8-digit landline', () => {
        expect(formatPhone('12345678')).toBe('1234-5678')
      })

      it('should format 9-digit mobile', () => {
        expect(formatPhone('123456789')).toBe('12345-6789')
      })

      it('should format 10-digit DDD + landline', () => {
        expect(formatPhone('1112345678')).toBe('(11) 1234-5678')
      })

      it('should format 11-digit DDD + mobile', () => {
        expect(formatPhone('11912345678')).toBe('(11) 91234-5678')
      })

      it('should remove +55 prefix', () => {
        expect(formatPhone('+5511912345678')).toBe('(11) 91234-5678')
      })

      it('should handle null/undefined', () => {
        expect(formatPhone(null)).toBe('')
        expect(formatPhone(undefined)).toBe('')
      })

      it('should return empty string for unsupported lengths', () => {
        expect(formatPhone('123')).toBe('')
      })
    })

    describe('formatPhoneWithContryCode', () => {
      it('should format phone with country code for mobile (13+ digits)', () => {
        const result = formatPhoneWithContryCode('551199999999999')
        expect(result).toMatch(/\(\d{2}\) \d \d{4}-\d{4}/)
      })

      it('should format phone with country code for landline (12 digits)', () => {
        const result = formatPhoneWithContryCode('551133334444')
        expect(result).toMatch(/\(\d{2}\) \d{4}-\d{4}/)
      })
    })
  })

  describe('String Formatters', () => {
    describe('onlyNumbers', () => {
      it('should extract only numbers from string', () => {
        expect(onlyNumbers('123abc456')).toBe('123456')
      })

      it('should handle formatted CPF', () => {
        expect(onlyNumbers('111.444.777-35')).toBe('11144477735')
      })

      it('should handle phone with special chars', () => {
        expect(onlyNumbers('(11) 9 1234-5678')).toBe('11912345678')
      })

      it('should handle numbers only', () => {
        expect(onlyNumbers('123456')).toBe('123456')
      })

      it('should handle numeric input', () => {
        expect(onlyNumbers(123456)).toBe('123456')
      })

      it('should return empty string if no numbers', () => {
        expect(onlyNumbers('abcdef')).toBe('')
      })
    })
  })
})
