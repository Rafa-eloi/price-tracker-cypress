# 🛒 Automação de Comparação de Preços com Cypress

Este projeto tem como objetivo automatizar a busca de produtos em sites de e-commerce, filtrando por faixa de preço e listando os produtos encontrados. Utilizando o Cypress como framework de testes, a automação acessa a página de vendas, realiza uma pesquisa por um item específico (ex: *Smart TV*), aplica filtros de preço e exibe, no console, uma tabela com os produtos que atendem aos critérios, incluindo nome e valor.

## ✅ Funcionalidades

- Acessa automaticamente o site de e-commerce.
- Fecha os pop-ups de promoções e cookies quando necessários.
- Realiza a busca por um produto específico.
- Aplica filtros de preço.
- Coleta os nomes, preços e avaliações dos produtos listados.
- Exibe os dados coletados em formato de tabela no console.
- Estrutura de testes organizada com **Page Object Model (POM)**.

## 🧰 Tecnologias utilizadas

- [Cypress](https://www.cypress.io/) — Automação de testes E2E
- JavaScript
- Node.js
- Cucumber
- Page Object Model

## 🚀 Como executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse o diretório do projeto
cd seu-repositorio

# Instale as dependências
npm install

# Execute os testes em modo headless
npx cypress run

# Ou execute os testes com interface
npx cypress open
