module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ['**/*.test.ts?(x)'],
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy'
    }
  };