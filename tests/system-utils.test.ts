import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { FACING_MODES, isAndroid, isIos, isMobile, redirectToStore } from '../src/system-utils.js';

describe('system-utils', () => {
  const mockUserAgent = (userAgent: string) => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      writable: true,
      configurable: true,
    });
  };

  afterEach(() => {
    // Reseta para string vazia entre testes
    Object.defineProperty(window.navigator, 'userAgent', {
      value: '',
      writable: true,
      configurable: true,
    });
  });

  describe('FACING_MODES', () => {
    it('should have correct facing modes values', () => {
      expect(FACING_MODES.USER).toBe('user');
      expect(FACING_MODES.ENVIRONMENT).toBe('environment');
      expect(FACING_MODES.LEFT).toBe('left');
      expect(FACING_MODES.RIGHT).toBe('right');
    });

    it('should be frozen to prevent modifications', () => {
      expect(Object.isFrozen(FACING_MODES)).toBe(true);
    });
  });

  describe('isMobile', () => {
    it('should return true for Android mobile user agents', () => {
      mockUserAgent('Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36');
      expect(isMobile()).toBe(true);
    });

    it('should return true for iPhone user agents', () => {
      mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15');
      expect(isMobile()).toBe(true);
    });

    it('should return false for desktop browser user agents', () => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      expect(isMobile()).toBe(false);
    });
  });

  describe('isAndroid', () => {
    it('should return true if device is Android', () => {
      mockUserAgent('Mozilla/5.0 (Linux; Android 13; Pixel 7)');
      expect(isAndroid()).toBe(true);
    });

    it('should return false if device is not Android', () => {
      mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X)');
      expect(isAndroid()).toBe(false);
    });
  });

  describe('isIos', () => {
    it('should return true if device is iOS (iPhone/iPad)', () => {
      mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)');
      expect(isIos()).toBe(true);
    });

    it('should return false if device is not iOS', () => {
      mockUserAgent('Mozilla/5.0 (Linux; Android 12; Moto G)');
      expect(isIos()).toBe(false);
    });
  });

  describe('redirectToStore', () => {
    let locationMock: { href: string };

    beforeEach(() => {
      locationMock = { href: '' };
    });

    it('should redirect to Android Play Store when device is Android', () => {
      mockUserAgent('Mozilla/5.0 (Linux; Android 10)');
      redirectToStore('android-url', 'ios-url', 'fallback-url', locationMock);
      expect(locationMock.href).toBe('android-url');
    });

    it('should redirect to Apple App Store when device is iOS', () => {
      mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)');
      redirectToStore('android-url', 'ios-url', 'fallback-url', locationMock);
      expect(locationMock.href).toBe('ios-url');
    });

    it('should redirect to fallback URL when device is desktop', () => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
      redirectToStore('android-url', 'ios-url', 'fallback-url', locationMock);
      expect(locationMock.href).toBe('fallback-url');
    });
  });
});
