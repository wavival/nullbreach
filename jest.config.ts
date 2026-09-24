import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  clearMocks: true,
  collectCoverageFrom: ["lib/validation.ts", "app/api/health/route.ts"],
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: { branches: 70, functions: 70, lines: 70, statements: 70 },
  },
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["<rootDir>/__tests__/unit/**/*.test.ts"],
};

export default createJestConfig(config);
