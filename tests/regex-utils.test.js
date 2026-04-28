import { ALL_NOT_NUMBERS, ALL_HTML_TAGS, ALL_SYMBOLS } from '../regex-utils.js'

describe('regex-utils', () => {
  describe('ALL_NOT_NUMBERS', () => {
    it('should match non-digits', () => {
      expect('abc123def'.replace(ALL_NOT_NUMBERS, '')).toBe('123')
    })

    it('should remove all special characters', () => {
      expect('111.444.777-35'.replace(ALL_NOT_NUMBERS, '')).toBe('11144477735')
    })

    it('should remove formatting from phone', () => {
      expect('(11) 9 1234-5678'.replace(ALL_NOT_NUMBERS, '')).toBe('11912345678')
    })

    it('should handle numbers only', () => {
      expect('123456'.replace(ALL_NOT_NUMBERS, '')).toBe('123456')
    })

    it('should handle text only', () => {
      expect('abcdef'.replace(ALL_NOT_NUMBERS, '')).toBe('')
    })
  })

  describe('ALL_HTML_TAGS', () => {
    it('should match HTML tags', () => {
      const html = '<p>Hello <strong>world</strong></p>'
      const text = html.replace(ALL_HTML_TAGS, '')
      expect(text).toBe('Hello world')
    })

    it('should handle self-closing tags', () => {
      const html = '<img src="test.jpg" />'
      const text = html.replace(ALL_HTML_TAGS, '')
      expect(text).toBe('')
    })

    it('should handle nested tags', () => {
      const html = '<div><p>Test</p></div>'
      const text = html.replace(ALL_HTML_TAGS, '')
      expect(text).toBe('Test')
    })

    it('should handle tags with attributes', () => {
      const html = '<a href="link">Click here</a>'
      const text = html.replace(ALL_HTML_TAGS, '')
      expect(text).toBe('Click here')
    })
  })

  describe('ALL_SYMBOLS', () => {
    it('should match punctuation', () => {
      expect('Hello, World!'.replace(ALL_SYMBOLS, '')).toBe('Hello World')
    })

    it('should preserve alphanumeric and whitespace', () => {
      expect('abc 123'.replace(ALL_SYMBOLS, '')).toBe('abc 123')
    })

    it('should remove multiple symbols', () => {
      expect('a!@#$%b'.replace(ALL_SYMBOLS, '')).toBe('ab')
    })

    it('should handle special characters', () => {
      expect('hello...world!!!'.replace(ALL_SYMBOLS, '')).toBe('helloworld')
    })
  })
})
