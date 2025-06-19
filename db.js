const mysql = require('mysql2');

// Configure com os dados do seu MySQL local
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'produtos_qa'
});

function salvarProdutos(origem, produtos) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO produtos (origem, nome, preco, rating) VALUES ?';
    const valores = produtos.map(p => [origem, p.Produto, p.Preço, p.Rating]);

    connection.query(sql, [valores], (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

module.exports = { salvarProdutos };
