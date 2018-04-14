const models = require('../models');
const sequelize = models.sequelize;

function rankClientes(req, res) {
	var sql = '';
	sql += 'SELECT clientes.nome, count(produtos_venda.produto_id) as qtd_comprada FROM clientes ';
  sql += 'JOIN vendas ON clientes.id = vendas.cliente_id ';
  sql += 'JOIN produtos_venda ON vendas.id = produtos_venda.venda_id ';
  if(req.query.produto) sql += 'WHERE produtos_venda.produto_id = '+req.query.produto+' ';
  sql += 'GROUP BY clientes.nome ';
  sql += 'ORDER BY qtd_comprada DESC;';

  sequelize.query(sql, { type: sequelize.QueryTypes.SELECT}).then(data => {
    res.json(data);
  })
}

function rankVendedores(req, res) {
	var sql = '';
	sql += 'SELECT vendas.vendedor, SUM(produtos.preco) AS total FROM vendas ';
  sql += 'JOIN produtos_venda ON vendas.id = produtos_venda.venda_id ';
  sql += 'JOIN produtos ON produtos.id = produtos_venda.produto_id ';
  if(req.query.mes)
  	sql += 'WHERE EXTRACT(MONTH FROM vendas.data) = '+req.query.mes+' ';
  if(req.query.ano)
  	sql += 'AND EXTRACT(YEAR FROM vendas.data) = '+req.query.ano+' ';
  sql += 'GROUP BY vendas.vendedor;';

  sequelize.query(sql, { type: sequelize.QueryTypes.SELECT}).then(data => {
    res.json(data);
  })
}

module.exports = {
  rankClientes: rankClientes,
  rankVendedores: rankVendedores
};