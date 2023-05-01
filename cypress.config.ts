import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    env: {
      'cypress-watch-and-reload': {
        watch: ['src/**/*'],
      },
      baseUrl: "http://localhost:3000",
      watchForFileChanges: false,
      setupNodeEvents(on, config) {
        // implement node event listeners here
        return require('cypress-watch-and-reload/plugins')(on, config)
      },
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    viewportHeight: 1000,
    viewportWidth: 1000,
  },
});
