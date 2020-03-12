const { defaults } = require('jest-config');

const jestConfig = {
  collectCoverageFrom: ['src/**/*.tsx'],
  coverageThreshold: {
    global: {
      // example: setting functions thershold to 50, and after test we reach
      // 30, the build will break
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  modulePaths: [
    'src',
    '/node_modules/'
  ],
  testMatch: '**/?(*.)+(spec|e2e).ts?(x)'
};

module.exports = jestConfig;
