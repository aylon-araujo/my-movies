  import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
    }],
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1',
    // CSS Modules
    '\\.module\\.scss$': 'identity-obj-proxy',
    '^.+\\.scss$': 'identity-obj-proxy',
    '^.+\\.css$': 'identity-obj-proxy',
    // Assets (images, etc)
    '\\.(css|scss|png|jpg|jpeg|gif|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
};

export default config;
