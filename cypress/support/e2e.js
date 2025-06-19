// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
//import '@badeball/cypress-cucumber-preprocessor/commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora apenas esse erro específico do React
  if (err.message.includes('Minified React error #418')) {
    return false;
  }

  // Ignora erros de promessas rejeitadas sem tratamento no app
  if (err.message.includes("Didn't find any matches after fetcher action")) {
    return false;
  }

  // Ignora erros conhecidos da aplicação que não afetam a automação
  if (
    err.message.includes("Cannot read properties of undefined") ||
    err.message.includes("reading 'result'")
  ) {
    return false; // Impede falha do teste
  }

  // Permite falha para outros erros
  return true;

});
