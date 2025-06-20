import { CarrefourPage } from '../../e2e/pages/carrefourPage';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const carrefourPage = new CarrefourPage();

Given("que o usuário acessa a página inicial do carrefour", () => {
  cy.visit('https://www.carrefour.com.br/', {
      failOnStatusCode: false,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
  });
});

Then("fecho os cookies", () => {
  carrefourPage.fecharBannerCookies(); 
});

When("faço a pesquisa pelo produto no carrefour", () => {
  carrefourPage.pesquisarProduto();
});

When("filtro a faixa de preço", () => {
  carrefourPage.filtrarPreco('smart tv', 3500, 5000);
});

When("aumento quantidade de produtos exibido da página", () => {
  carrefourPage.aumentarQtdProdutos();
});

Then("listo os produtos da primeira página que atendem os critérios", () => {
  carrefourPage.listarProdutos();
});
