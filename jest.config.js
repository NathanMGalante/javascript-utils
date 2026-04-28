export default {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['**/*.js', '!node_modules/**', '!tests/**'],
  transform: {},
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
}
