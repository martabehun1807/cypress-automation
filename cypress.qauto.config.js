const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config.js");

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://qauto.forstudy.space",
  },
  env: {
    userEmail: "testone@gmail.com",
    passwordKey: "qautoPassword",
  },
});
