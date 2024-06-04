import type { JestConfigWithTsJest } from 'ts-jest';

// [FIXME]: not finding the correct path @src/(.*)
const jestConfig: JestConfigWithTsJest = {
  moduleNameMapper: {
    // '^@src/(.*)': '<rootDir>/src/$1',
    // '^@components/(.*)': '<rootDir>/src/components/$1',
    // '^@components/ui(.*)': '<rootDir>/src/components/ui/$1',
  },
};

export default jestConfig;
