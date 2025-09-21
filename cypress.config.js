const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    blockHosts: ["*mc.yandex.ru"]
    // используй baseUrl:"https://login.qa.studio" если все тесты на одном сайте. У тебя URL переменные в файле urls
  },
});

// Все параметры конфига: https://docs.cypress.io/guides/references/configuration
