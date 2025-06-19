import { carrefourElements } from '../elements/carrefourElements';

export class CarrefourPage {

  // Método para fechar os cookies
  fecharBannerCookies() {
    cy.get(carrefourElements.bannerCookies, { timeout: 50000 }).click();
  }

  // Método para realizar a busca de um produto com o termo "Smart TV"
  pesquisarProduto() {
    cy.get(carrefourElements.campoPesquisa).filter(':visible').clear().type('Smart TV');
    cy.get(carrefourElements.botaoPesquisar).filter(':visible').click({ force: true });
  }

  // Método para aplicar filtro de preço usando parâmetros de URL
  filtrarPreco(termoBusca, precoMin, precoMax) {
    const termoFormatado = encodeURIComponent(termoBusca);
    const urlComFiltro = `https://www.carrefour.com.br/busca/${termoFormatado}?c_price=${precoMin}:${precoMax}`;
    cy.visit(urlComFiltro);
  }

  //Aumenta a quantidade de produtos exibidos na tela
  aumentarQtdProdutos(){
    cy.get(carrefourElements.selectQtd).select('60');
  }

  // Método para listar produtos caros (com preço maior que R$ 3.500) em todas as páginas
  listarProdutos() {
    const produtos = [];

    // Seletor da grid que contém os cards
    cy.get('div.grid.grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-4.xl\\:grid-cols-5.gap-\\[10px\\] > a')
    .each(($card) => {
        // Dentro de cada card, pegar nome e preço com seletores relativos
        const nome = $card.find(carrefourElements.nomeProduto).text().trim();
        const precoTexto = $card.find(carrefourElements.precoProduto).text().trim();

        // Converter preço para número (exemplo: "R$ 4.299,00" -> 4299.00)
        const precoNumerico = parseFloat(
            precoTexto.replace(/[^\d,]/g, '').replace(',', '.')
        );

        produtos.push({
            Produto: nome,
            Preço: `R$ ${precoNumerico.toFixed(2)}`
        });
    })
    .then(() => {
        console.log('Produtos na página atual:');
        cy.task('logProdutos', {
            origem: 'Carrefour',
            data: produtos
        });
        console.table(produtos);
        if (Cypress.env('gravarNoBanco')) {
            cy.task('salvarProdutosNoBanco', {
              origem: 'Carrefour',
              data: produtos
            });
        }
    });
  }
    
}