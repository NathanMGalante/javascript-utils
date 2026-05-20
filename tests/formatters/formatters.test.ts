import { formatCnpj, formatCpf, formatDocument } from '../../src/formatters/document-formatter-utils.js';
import { formatPhone, formatPhoneWithContryCode } from '../../src/formatters/phone-formatter-utils.js';
import { onlyLetters, onlyNotLetters, onlyNotNumbers, onlyNotNumbersAndLetters, onlyNumbers, onlyNumbersAndLetters } from '../../src/formatters/string-formatter-utils.js';

describe('Formatters', () => {

  describe('Document Formatters', () => {
    describe('formatCpf', () => {
      const cases: [any, string, string][] = [
        ['11144477735', '111.444.777-35', 'standard string digits'],
        [11144477735, '111.444.777-35', 'raw numeric data type'],
        ['111.444.777-35', '111.444.777-35', 'already formatted string input'],
        ['00000000000', '', 'invalid identity sequence block'],
      ];

      test.each(cases)('should format CPF from %s (%s)', (input, expected) => {
        expect(formatCpf(input)).toBe(expected);
      });
    });

    describe('formatCnpj', () => {
      const cases: [any, string, string][] = [
        ['11222333000181', '11.222.333/0001-81', 'standard string digits'],
        [11222333000181, '11.222.333/0001-81', 'raw numeric data type'],
        ['11.222.333/0001-81', '11.222.333/0001-81', 'already formatted string input'],
        ['00000000000000', '', 'invalid corporate sequence block'],
      ];

      test.each(cases)('should format CNPJ from %s (%s)', (input, expected) => {
        expect(formatCnpj(input)).toBe(expected);
      });
    });

    describe('formatDocument', () => {
      const cases: [any, string, string][] = [
        ['11144477735', '111.444.777-35', 'valid CPF identification branch'],
        ['11222333000181', '11.222.333/0001-81', 'valid CNPJ identification branch'],
        ['00000000000000', '', 'unrecognized invalid identity layout criteria'],
      ];

      test.each(cases)('should format document target from %s (%s)', (input, expected) => {
        expect(formatDocument(input)).toBe(expected);
      });
    });
  });

  describe('Phone Formatters', () => {
    describe('formatPhone', () => {
      const cases: [any, string, string][] = [
        ['12345678', '1234-5678', '8-digit local landline layout'],
        ['123456789', '12345-6789', '9-digit regional mobile layout'],
        ['1112345678', '(11) 1234-5678', '10-digit standard DDD + landline'],
        ['11912345678', '(11) 91234-5678', '11-digit standard DDD + mobile'],
        ['+5511912345678', '(11) 91234-5678', 'stripping national country prefix token'],
        ['123', '', 'unsupported short length boundary sequence'],
        [null, '', 'null reference handler exception'],
        [undefined, '', 'undefined reference handler exception'],
      ];

      test.each(cases)('should process structure from %s (%s)', (input, expected) => {
        expect(formatPhone(input)).toBe(expected);
      });
    });

    describe('formatPhoneWithContryCode', () => {
      const cases: [string, string, string][] = [
        ['5511999999999', '+55 (11) 99999-9999', '13-digit country code + DDD + mobile'],
        ['551133334444', '+55 (11) 3333-4444', '12-digit country code + DDD + landline'],
      ];

      test.each(cases)('should build international format from %s (%s)', (input, expected) => {
        expect(formatPhoneWithContryCode(input)).toBe(expected);
      });
    });
  });

  describe('String Formatters', () => {
    describe('onlyNumbers', () => {
      const cases: [any, string, string][] = [
        ['123abc456', '123456', 'alphanumeric noise mix separation'],
        ['111.444.777-35', '11144477735', 'deconstructing structured CPF tokens'],
        ['(11) 9 1234-5678', '11912345678', 'deconstructing fully masked phone blocks'],
        ['123456', '123456', 'clean string stream preservation'],
        [123456, '123456', 'numerical representation type evaluation'],
        ['abcdef', '', 'complete missing number return state bounds'],
      ];

      test.each(cases)('should strip characters from %s (%s)', (input, expected) => {
        expect(onlyNumbers(input)).toBe(expected);
      });
    });

    describe('onlyNotNumbers', () => {
      const cases: [any, string, string][] = [
        ['123abc456', 'abc', 'extracting non-numeric segments'],
        ['(11) 9999-9999', '() -', 'extracting masks and symbols'],
        ['abc', 'abc', 'pure alphabetical preservation'],
        [123456, '', 'stripping all digits from numeric input'],
      ];

      test.each(cases)('should keep only non-numbers from %s (%s)', (input, expected) => {
        expect(onlyNotNumbers(input)).toBe(expected);
      });
    });

    describe('onlyLetters', () => {
      const cases: [any, string, string][] = [
        ['User123', 'User', 'filtering out trailing numeric tokens'],
        ['@nathan_galante', 'nathangalante', 'stripping symbols and underscores'],
        ['123', '', 'empty result for purely numeric inputs'],
      ];

      test.each(cases)('should keep only letters from %s (%s)', (input, expected) => {
        expect(onlyLetters(input)).toBe(expected);
      });
    });

    describe('onlyNotLetters', () => {
      const cases: [any, string, string][] = [
        ['User123', '123', 'filtering out alphabetical segments'],
        ['@#123', '@#123', 'preserving symbols and digits'],
        ['abc', '', 'empty result for purely alphabetical inputs'],
      ];

      test.each(cases)('should keep only non-letters from %s (%s)', (input, expected) => {
        expect(onlyNotLetters(input)).toBe(expected);
      });
    });

    describe('onlyNumbersAndLetters', () => {
      const cases: [any, string, string][] = [
        ['@User_123!', 'User123', 'extracting clean alphanumeric identifiers'],
        ['123-ABC_456', '123ABC456', 'stripping hyphens and underscores'],
        ['!!!', '', 'no alphanumeric characters available'],
      ];

      test.each(cases)('should keep only alphanumeric from %s (%s)', (input, expected) => {
        expect(onlyNumbersAndLetters(input)).toBe(expected);
      });
    });

    describe('onlyNotNumbersAndLetters', () => {
      const cases: [any, string, string][] = [
        ['@User_123!', '@_!', 'extracting symbols and special characters'],
        ['123-ABC', '-', 'extracting separator tokens'],
        ['User123', '', 'no non-alphanumeric characters present'],
      ];

      test.each(cases)('should keep only non-alphanumeric from %s (%s)', (input, expected) => {
        expect(onlyNotNumbersAndLetters(input)).toBe(expected);
      });
    });
  });
});
