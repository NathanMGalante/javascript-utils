import { FACING_MODES, isMobile, isAndroid, isIos, redirectToStore } from '../system-utils.js'

describe('system-utils', () => {
  describe('FACING_MODES', () => {
    it('should have correct facing modes', () => {
      expect(FACING_MODES.USER).toBe('user')
      expect(FACING_MODES.ENVIRONMENT).toBe('environment')
      expect(FACING_MODES.LEFT).toBe('left')
      expect(FACING_MODES.RIGHT).toBe('right')
    })

    it('should be frozen', () => {
      expect(Object.isFrozen(FACING_MODES)).toBe(true)
    })
  })

  describe('isMobile', () => {
    const originalUserAgent = navigator.userAgent

    beforeEach(() => {
      Object.defineProperty(navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true,
      })
    })

    afterEach(() => {
      Object.defineProperty(navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true,
      })
    })

    it('should be a function', () => {
      expect(typeof isMobile).toBe('function')
    })

    it('should return a boolean', () => {
      const result = isMobile()
      expect(typeof result).toBe('boolean')
    })
  })

  describe('isAndroid', () => {
    it('should be a function', () => {
      expect(typeof isAndroid).toBe('function')
    })

    it('should return a boolean', () => {
      const result = isAndroid()
      expect(typeof result).toBe('boolean')
    })
  })

  describe('isIos', () => {
    it('should be a function', () => {
      expect(typeof isIos).toBe('function')
    })

    it('should return a boolean', () => {
      const result = isIos()
      expect(typeof result).toBe('boolean')
    })
  })

  describe('redirectToStore', () => {
    it('should be a function', () => {
      expect(typeof redirectToStore).toBe('function')
    })

    it('should accept three parameters', () => {
      const fn = redirectToStore
      expect(fn.length).toBe(3)
    })
  })
})
