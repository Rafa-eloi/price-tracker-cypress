const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const path = require("path");

// Importa a função que salva no banco
const { salvarProdutos } = require("./db");

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 10000,
  responseTimeout: 30000,
  e2e: {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    specPattern: "cypress/e2e/features/**/*.feature",

    async setupNodeEvents(on, config) {
      // Cucumber + Esbuild
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Consolidando as duas tasks em um único bloco
      on("task", {
        logProdutos({ origem, data }) {
          console.log(`\n🧾 Lista de produtos - ${origem}:`);
          console.table(data);
          return null;
        },

        salvarProdutosNoBanco({ origem, data }) {
          return salvarProdutos(origem, data)
            .then(() => {
              console.log(`🛢️ Dados salvos no MySQL (${origem})`);
              return null;
            })
            .catch((err) => {
              console.error("❌ Erro ao salvar no banco:", err);
              throw err;
            });
        },
      });

      return config;
    },
  },
});