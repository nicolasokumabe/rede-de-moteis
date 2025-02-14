const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config); 
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
  },
});
