module.exports = {
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/src/__tests__/e2e',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
  ],
  moduleNameMapper: {
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: [
    'js',
    'vue',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
};
