import { AmericanasPage } from '../../e2e/pages/americanasPage';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const americanasPage = new AmericanasPage();

Given("que o usuário acessa a página inicial da americanas", () => {
  cy.visit('https://www.americanas.com.br/');
});

Then("fecha os avisos da tela, se presentes", () => {
  americanasPage.fecharBannerPromocionalSeExistir();
  americanasPage.fecharBannerCookies(); 
});

When("faço a pesquisa pelo produto", () => {
  americanasPage.pesquisarProduto();
});

When("filtro pelo preço", () => {
  americanasPage.filtrarPreco();
});

Then("listar produtos que atendem os critérios", () => {
  americanasPage.listarProdutos();
});
