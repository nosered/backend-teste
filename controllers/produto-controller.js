const models = require('../models');
const produto = models.produto;

function getAll(req, res) {
  produto.findAll().then(
    function(produtos) {
      res.status(200).json(produtos);
    },
    function(error) {
      res.status(500).json(error);
    }
  );
}

function find(req, res) {
	const id = req.params.id;
	produto.findById(id).then(
    function(produto) {
      res.status(200).json(produto);
    },
    function(error) {
      res.status(500).json(error);
    }
  );
}

function create(req, res) {
  produto.create( {descricao: req.body.descricao, preco: req.body.preco} ).then(
    function(produto) {
      res.status(200).json(produto);
    },
    function(error) {
      res.status(500).json(error);
    }
  );
}

function update(req, res) {
	produto.update( {descricao: req.body.descricao, preco: req.body.preco}, { where: {id: req.params.id} } ).then(
		function(produto) {
			res.status(200).json(produto);
		},
		function(error) {
			res.status(500).json(error);
		}
	);
}

function remove(req, res) {
	produto.destroy({ where: {id: req.params.id} }).then(
		function(produto) {
			res.status(200).json(produto);
		},
		function(error) {
			res.status(500).json(error);
		}
	);
}

module.exports = {
	getAll: getAll,
	find: find,
	create: create,
	update: update,
	remove: remove
};

