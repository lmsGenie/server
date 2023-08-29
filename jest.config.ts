/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "node",
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"], // To ignore tests from the dist/ directory
};
