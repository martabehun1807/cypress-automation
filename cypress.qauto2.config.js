const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config.js");

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://qauto2.forstudy.space",
  },
  env: {
    userEmail: "testtwo@gmail.com",
    passwordKey: "qauto2Password",
  },
});
