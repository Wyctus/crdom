"use strict";

module.exports = {
  extension: ["test.ts"],
  package: "./package.json",
  reporter: "spec",
  slow: 75,
  timeout: 2000,
  ui: "bdd",
  "watch-files": ["test/**/*.test.ts"],
  require: ["ts-node/register"],
};
