const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://example.cypress.io",
    specPattern: "cypress/e2e/**/*.cy.js",
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: true,
  retries: 1,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
});