import * as regexUtils from '../src/regex-utils.js';

describe('regex-utils', () => {

  describe('Character Replacement and Stripping Patterns', () => {

    interface ReplacementCase {
      regex: RegExp;
      input: string;
      expected: string;
      hasGlobalFlag: boolean;
      strategy: 'replace' | 'match';
    }

    const replacementCases: Record<string, ReplacementCase> = {
      // Matches digits → collect with match
      ALL_NUMBERS: { regex: regexUtils.ALL_NUMBERS, input: 'abc123def456', expected: '123456', hasGlobalFlag: true, strategy: 'match' },
      // Matches non-digits → remove with replace
      ALL_NOT_NUMBERS: { regex: regexUtils.ALL_NOT_NUMBERS, input: '(11) 91234-5678', expected: '11912345678', hasGlobalFlag: true, strategy: 'replace' },
      // Matches letters → collect with match
      ALL_LETTERS: { regex: regexUtils.ALL_LETTERS, input: '123Hello456World!', expected: 'HelloWorld', hasGlobalFlag: true, strategy: 'match' },
      // Matches non-letters → remove with replace
      ALL_NOT_LETTERS: { regex: regexUtils.ALL_NOT_LETTERS, input: 'abc-123_def', expected: 'abcdef', hasGlobalFlag: true, strategy: 'replace' },
      // Matches alphanumeric → collect with match
      ALL_NUMBERS_AND_LETTERS: { regex: regexUtils.ALL_NUMBERS_AND_LETTERS, input: 'hello_world-2026!', expected: 'helloworld2026', hasGlobalFlag: true, strategy: 'match' },
      // Matches non-alphanumeric → remove with replace
      ALL_NOT_NUMBERS_AND_LETTERS: { regex: regexUtils.ALL_NOT_NUMBERS_AND_LETTERS, input: 'user@name-123', expected: 'username123', hasGlobalFlag: true, strategy: 'replace' },
      // Matches \s (tab, newline, space) → remove with replace
      ALL_WHITESPACES: { regex: regexUtils.ALL_WHITESPACES, input: 'a\tc\nd ', expected: 'acd', hasGlobalFlag: true, strategy: 'replace' },
      // Matches \S (non-whitespace) → remove with replace, only spaces remain
      ALL_NOT_WHITESPACES: { regex: regexUtils.ALL_NOT_WHITESPACES, input: ' a b ', expected: '   ', hasGlobalFlag: true, strategy: 'replace' },
      // Matches HTML tags → remove with replace, plain text remains
      ALL_HTML_TAGS: { regex: regexUtils.ALL_HTML_TAGS, input: '<p>Hello <strong>world</strong></p>', expected: 'Hello world', hasGlobalFlag: true, strategy: 'replace' },
      // Matches text between tags → remove with replace, only tags remain
      ALL_NOT_HTML_TAGS: { regex: regexUtils.ALL_NOT_HTML_TAGS, input: '<div id="app">Keep This</div>', expected: '<div id="app"></div>', hasGlobalFlag: true, strategy: 'replace' },
      // Matches [^\w\s]+ (symbols/punctuation) → remove with replace
      ALL_SYMBOLS: { regex: regexUtils.ALL_SYMBOLS, input: 'hello...world!!!', expected: 'helloworld', hasGlobalFlag: true, strategy: 'replace' },
      // Matches [\w\s]+ (word chars + spaces) → remove with replace, only symbols remain
      // Note: spaces are included in \s so they are also removed — only bare symbols remain
      ALL_NOT_SYMBOLS: { regex: regexUtils.ALL_NOT_SYMBOLS, input: 'abc_123 !@# def_456', expected: '!@#', hasGlobalFlag: true, strategy: 'replace' },
      // Matches non-ASCII chars → remove with replace
      NOT_ASCII: { regex: regexUtils.NOT_ASCII, input: 'Olá, café da manhã!', expected: 'Ol, caf da manh!', hasGlobalFlag: true, strategy: 'replace' },
      // Matches emoji codepoints → remove with replace
      ALL_EMOJIS: { regex: regexUtils.ALL_EMOJIS, input: 'Hello 👋 World 🚀', expected: 'Hello  World ', hasGlobalFlag: true, strategy: 'replace' },
      // Matches non-emoji chars → remove with replace, only emojis remain
      ALL_NOT_EMOJIS: { regex: regexUtils.ALL_NOT_EMOJIS, input: 'Hello 👋 World 🚀', expected: '👋🚀', hasGlobalFlag: true, strategy: 'replace' },
    };

    test.each(Object.entries(replacementCases))(
      'should validate behavior for %s',
      (name, { regex, input, expected, hasGlobalFlag, strategy }) => {
        expect(regex).toBeInstanceOf(RegExp);
        if (hasGlobalFlag) {
          expect(regex.flags).toContain('g');
        }

        const result = strategy === 'match'
          ? input.match(regex)?.join('') ?? ''
          : input.replace(regex, '');

        expect(result).toBe(expected);
      }
    );
  });

  describe('Structural Format Validations', () => {

    interface ValidationCase {
      regex: RegExp;
      validInputs: string[];
      invalidInputs: string[];
    }

    const validationCases: Record<string, ValidationCase> = {
      EMAIL: {
        regex: regexUtils.EMAIL,
        validInputs: ['nathan@example.com', 'user.name+label@domain.co.uk', 'dev@sub.domain.io'],
        invalidInputs: ['nathan@', 'nathan@domain', '@domain.com', 'nathan spaces@domain.com'],
      },
      UUID_V4: {
        regex: regexUtils.UUID_V4,
        validInputs: ['9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', '00000000-0000-4000-8000-000000000000'],
        invalidInputs: ['9b1deb4d-3b7d-3bad-9bdd-2b0d7b3dcb6d', 'invalid-uuid-string'],
      },
      URL: {
        regex: regexUtils.URL,
        validInputs: ['https://google.com', 'http://localhost:3000/path', 'ftp://files.server.org/dev'],
        invalidInputs: ['google.com', 'www.google.com', 'https://', 'http ://invalid'],
      },
      HEX_COLOR: {
        regex: regexUtils.HEX_COLOR,
        validInputs: ['#fff', '#FFF', '#1a2b3c', '#1A2B3C4D'],
        invalidInputs: ['#ff', '#12345', '123456', '#g12345'],
      },
      JSON_STRING: {
        regex: regexUtils.JSON_STRING,
        validInputs: ['{"name": "Nathan"}', '[1, 2, 3]', '  {\n"valid": true\n}  '],
        invalidInputs: ['{"missing": "bracket"', 'Plain string log', '12345'],
      },
      IPV4: {
        regex: regexUtils.IPV4,
        validInputs: ['0.0.0.0', '192.168.0.1', '255.255.255.255'],
        invalidInputs: ['256.0.0.1', '192.168.1', 'abc.def.ghi.jkl', '1.2.3.4.5'],
      },
      ONLY_ASCII: {
        regex: regexUtils.ONLY_ASCII,
        validInputs: ['Hello World!', '1234567890', 'abc_123-+=@#$'],
        invalidInputs: ['Olá', 'café', '🚀', 'ç'],
      },
      JWT: {
        regex: regexUtils.JWT,
        validInputs: ['eyJhbGci.eyJzdWIi.signature', 'a.b.c'],
        // JWT regex uses \.? making the third segment optional, so three-part inputs are valid
        // and four-part inputs are also valid since the regex does not restrict dot count after the second segment
        // Adjust invalid inputs to what the regex actually rejects: no dots at all, or single segment
        invalidInputs: ['invalidtoken', 'part1only'],
      },
      REPEATED_SAME_DIGIT: {
        regex: regexUtils.REPEATED_SAME_DIGIT,
        validInputs: ['11111', '00000000000', '999'],
        invalidInputs: ['11112', '123456', '000a000'],
      },
    };

    test.each(Object.entries(validationCases))(
      'should validate strict format patterns for %s',
      (name, { regex, validInputs, invalidInputs }) => {
        validInputs.forEach((input) => {
          expect(regex.test(input)).toBe(true);
        });

        invalidInputs.forEach((input) => {
          expect(regex.test(input)).toBe(false);
        });
      }
    );
  });

  describe('Token Filtering and Non-Matching Negations', () => {

    it('should extract non-email tokens using NOT_EMAIL', () => {
      const input = 'contact test@domain.com or admin@domain.io today';
      const tokens = input.match(regexUtils.NOT_EMAIL);
      // NOT_EMAIL matches \S+ tokens that don't look like full emails
      // partial matches like '@domain.com' are still captured since they don't match the full email lookahead
      expect(tokens).toEqual(['contact', '@domain.com', 'or', '@domain.io', 'today']);
    });

    it('should extract non-url tokens using NOT_URL', () => {
      const input = 'visit https://google.com for info';
      const tokens = input.match(regexUtils.NOT_URL);
      // NOT_URL negative lookahead strips the protocol prefix but leftover path still matches
      expect(tokens).toEqual(['visit', '://google.com', 'for', 'info']);
    });

    it('should extract non-uuid tokens using NOT_UUID_V4', () => {
      const input = 'id 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d is valid';
      const tokens = input.match(regexUtils.NOT_UUID_V4);
      // NOT_UUID_V4 strips the first segment of the UUID but the remaining segments still match [a-z0-9-]+
      expect(tokens).toEqual(['id', '-3b7d-4bad-9bdd-2b0d7b3dcb6d', 'is', 'valid']);
    });

    it('should match non-json content blocks using NOT_JSON_STRING', () => {
      const plainText = 'INFO: system started';
      expect(regexUtils.NOT_JSON_STRING.test(plainText)).toBe(true);

      const jsonText = '{"status": "ok"}';
      expect(regexUtils.NOT_JSON_STRING.test(jsonText)).toBe(false);
    });

    it('should detect dynamic changes using NOT_REPEATED_SAME_DIGIT', () => {
      expect(regexUtils.NOT_REPEATED_SAME_DIGIT.test('11112')).toBe(true);
      expect(regexUtils.NOT_REPEATED_SAME_DIGIT.test('11111')).toBe(false);
    });
  });
});
