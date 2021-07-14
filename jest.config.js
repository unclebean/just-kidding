const {defaults} = require("jest-config");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  moduleDirectories: ["node_modules", "src"],
  collectCoverage: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/tests/__mocks__/styleMock.js",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
