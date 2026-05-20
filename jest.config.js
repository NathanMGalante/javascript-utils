export default {
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/**/*.test.(js|ts)'],
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.d.ts',
    '!node_modules/**',
    '!tests/**',
    '!jest.config.js'
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
};