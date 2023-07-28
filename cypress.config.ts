import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners her
    },
    video:false,
    screenshotOnRunFailure:false,
    supportFile:false,
  },

});
