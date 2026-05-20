import * as durations from '../src/duration-utils.js';

describe('duration-utils', () => {

  describe('Milliseconds Values Validation', () => {
    const expectedDurations: [string, number][] = [
      // Milliseconds & Sub-Seconds
      ['DURATION_10_MILLISECONDS', 10],
      ['DURATION_50_MILLISECONDS', 50],
      ['DURATION_100_MILLISECONDS', 100],
      ['DURATION_200_MILLISECONDS', 200],
      ['DURATION_300_MILLISECONDS', 300],
      ['DURATION_500_MILLISECONDS', 500],

      // Seconds
      ['DURATION_1_SECOND', 1000],
      ['DURATION_2_SECONDS', 2000],
      ['DURATION_3_SECONDS', 3000],
      ['DURATION_5_SECONDS', 5000],
      ['DURATION_10_SECONDS', 10000],
      ['DURATION_15_SECONDS', 15000],
      ['DURATION_30_SECONDS', 30000],
      ['DURATION_45_SECONDS', 45000],

      // Minutes
      ['DURATION_1_MINUTE', 60000],
      ['DURATION_2_MINUTES', 120000],
      ['DURATION_5_MINUTES', 300000],
      ['DURATION_10_MINUTES', 600000],
      ['DURATION_15_MINUTES', 900000],
      ['DURATION_30_MINUTES', 1800000],
      ['DURATION_45_MINUTES', 2700000],

      // Hours
      ['DURATION_1_HOUR', 3600000],
      ['DURATION_2_HOURS', 7200000],
      ['DURATION_6_HOURS', 21600000],
      ['DURATION_12_HOURS', 43200000],

      // Days
      ['DURATION_1_DAY', 86400000],
      ['DURATION_7_DAYS', 604800000],
      ['DURATION_30_DAYS', 2592000000],
    ];

    test.each(expectedDurations)('should verify %s equals %i ms', (constantName, expectedValue) => {
      expect(durations[constantName as keyof typeof durations]).toBe(expectedValue);
    });

    it('should ensure all exported constants are fully covered in tests', () => {
      const exportedKeys = Object.keys(durations);
      expect(exportedKeys.length).toBe(expectedDurations.length);
    });
  });

  describe('Integrity and Proportionality Rules', () => {
    it('should enforce that every exported duration is strictly a number', () => {
      Object.values(durations).forEach((value) => {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThan(0);
      });
    });

    it('should maintain mathematical proportionality between scaling units', () => {
      expect(durations.DURATION_2_SECONDS).toBe(durations.DURATION_1_SECOND * 2);
      expect(durations.DURATION_5_SECONDS).toBe(durations.DURATION_1_SECOND * 5);
      expect(durations.DURATION_2_MINUTES).toBe(durations.DURATION_1_MINUTE * 2);
      expect(durations.DURATION_1_MINUTE).toBe(durations.DURATION_1_SECOND * 60);
      expect(durations.DURATION_1_HOUR).toBe(durations.DURATION_1_MINUTE * 60);
      expect(durations.DURATION_1_DAY).toBe(durations.DURATION_1_HOUR * 24);
      expect(durations.DURATION_7_DAYS).toBe(durations.DURATION_1_DAY * 7);
    });
  });
});
