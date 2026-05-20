import { isCnpj, isCpf, isDocument, isEmail, isNullOrEmpty } from "../../src/validations/index.js";

describe('Validation Utils', () => {

    describe('isCpf', () => {
        const cases: [any, boolean, string][] = [
            ['11144477735', true, 'valid unformatted CPF'],
            ['111.444.777-35', true, 'valid formatted CPF'],
            ['00000000000', false, 'blocked repeated digits sequence'],
            ['11111111111', false, 'blocked repeated digits sequence alternative'],
            ['111', false, 'short digit structure length'],
            ['1114447773', false, 'missing final verifier digit'],
            ['abc123xyz45', false, 'alphanumeric noise input'],
            [null, false, 'null identity pointer value'],
            [undefined, false, 'undefined identity token value'],
        ];

        test.each(cases)('should return %p for %s', (input, expected) => {
            expect(isCpf(input)).toBe(expected);
        });
    });

    describe('isCnpj', () => {
        const cases: [any, boolean, string][] = [
            ['11222333000181', true, 'valid unformatted CNPJ'],
            ['11.222.333/0001-81', true, 'valid formatted CNPJ'],
            ['00000000000000', false, 'blocked sequence of zeroes'],
            ['11111111111111', false, 'blocked sequence of identical numbers'],
            ['111', false, 'short string criteria length'],
            ['abc123xyz45678', false, 'alphanumeric dirty pattern content'],
            [null, false, 'null structure value reference'],
            [undefined, false, 'undefined scope initialization'],
        ];

        test.each(cases)('should return %p for %s', (input, expected) => {
            expect(isCnpj(input)).toBe(expected);
        });
    });

    describe('isEmail', () => {
        const cases: [any, boolean, string][] = [
            ['test@example.com', true, 'standard secure production email formatting'],
            ['user@domain.co.uk', true, 'multi-tiered domain postfix extension structure'],
            ['user+tag@example.com', true, 'alias routing addressing with plus symbol modifier'],
            ['invalid', false, 'plain text sequence string missing essential tokens'],
            ['user@', false, 'missing root host target routing network definitions'],
            ['@domain.com', false, 'missing localized user account routing component'],
            ['user@domain.', false, 'trailing separator dot symbol without resolution tld'],
            ['user @domain.com', false, 'illegal space character breaking continuous stream'],
            [null, false, 'null reference input structure pointer'],
            [undefined, false, 'undefined value criteria definition boundary'],
        ];

        test.each(cases)('should return %p for %s', (input, expected) => {
            expect(isEmail(input)).toBe(expected);
        });
    });

    describe('isNullOrEmpty', () => {
        const cases: [any, boolean, string][] = [
            [null, true, 'primitive null value assignment flag'],
            [undefined, true, 'primitive undefined runtime type initialization'],
            ['', true, 'strictly empty string length criteria sequence'],
            ['   ', true, 'string payload containing only blank trailing whitespace blocks'],
            [[], true, 'instantiated array structure containing zero reference nodes'],
            [{}, true, 'instantiated object structure missing any hash map keys'],
            ['hello', false, 'populated alpha text content string array sequence'],
            [[1, 2, 3], false, 'populated sequential generic index element array object'],
            [{ a: 1 }, false, 'populated key-value dynamic map object mapping context'],
        ];

        test.each(cases)('should return %p for %s', (input, expected) => {
            expect(isNullOrEmpty(input)).toBe(expected);
        });
    });

    describe('isDocument', () => {
        const cases: [any, boolean, string][] = [
            ['11144477735', true, 'valid unformatted fallback CPF entity payload'],
            ['11.222.333/0001-81', true, 'valid complex corporate formatted CNPJ structure'],
            ['00000000000000', false, 'invalid multi-digit macro block sequence failure'],
            ['invalid-doc-token', false, 'completely malformed alternative identification string'],
            [null, false, 'null payload representation standard block'],
            [undefined, false, 'undefined parameter tracking sequence indicator'],
        ];

        test.each(cases)('should return %p for %s', (input, expected) => {
            expect(isDocument(input)).toBe(expected);
        });
    });
});
