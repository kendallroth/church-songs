import {pathsToModuleNameMapper} from "ts-jest";

import {compilerOptions} from "./tsconfig.json";

import type {Config} from "@jest/types";

const jestConfig: Config.InitialOptions = {
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: "<rootDir>"}),
  rootDir: "./src",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  coverageDirectory: "../coverage",
  // Tests must live within a '__tests__' directory and end in '.test.ts'
  testMatch: ["**/__tests__/*\\.test\\.ts"],
  // Whether individual test results should be displayed
  verbose: false,
  preset: "ts-jest",
};

export default jestConfig;
