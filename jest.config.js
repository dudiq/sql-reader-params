module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'node'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/**/*.spec.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  // setupFiles: ['<rootDir>/tests/setup'],
};
