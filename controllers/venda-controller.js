const models = require('../models');
const venda = models.venda;
const produto = models.produto;

function getAll(req, res) {
  venda.findAll({
  	include: [{
  		model: produto,
  		through: {
      		attributes: []
    	}
  	}]
  }).then(
    function(vendas) {
      res.status(200).json(vendas);
    },
    function(error) {
      res.status(500).json(error);
    }
  );
}

function find(req, res) {
	const id = req.params.id;
	venda.findById(id, {
	  	include: [{
	  		model: produto,
	  		through: {
	      		attributes: []
	    	}
	  	}]
  	}).then(
    function(venda) {
      res.status(200).json(venda);
    },
    function(error) {
      res.status(500).json(error);
    }
  );
}

function create(req, res) {
  venda.create( {data: req.body.data, vendedor: req.body.vendedor, clienteId: req.body.clienteId} ).then(
    function(venda) {
      res.status(200).json(venda);
    },
    function(error) {
      res.status(500).json(error);
    }
  );
}

function update(req, res) {
	venda.update( {data: req.body.data, vendedor: req.body.vendedor}, { where: {id: req.params.id} } ).then(
		function(venda) {
			res.status(200).json(venda);
		},
		function(error) {
			res.status(500).json(error);
		}
	);
}

function remove(req, res) {
	venda.destroy({ where: {id: req.params.id} }).then(
		function(venda) {
			res.status(200).json(venda);
		},
		function(error) {
			res.status(500).json(error);
		}
	);
}

function addProduto(req, res) {
	var idVenda = req.params.id;
	var idProduto = req.body.idProduto;
	venda.findById(idVenda).then(
		function(venda) {
			venda.addProduto(idProduto).then(
				function(success) {
					res.status(200).json(success);
				},
				function(erro) {
					res.status(500).json(erro);
				}
			);
		},
		function(erro) {
			res.status(500).json(erro);
		}
	);
}

module.exports = {
	getAll: getAll,
	find: find,
	create: create,
	update: update,
	remove: remove,
	addProduto: addProduto
};

