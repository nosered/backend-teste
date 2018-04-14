const models = require('../models');
const cliente = models.cliente;
const venda = models.venda;

function getAll(req, res) {
  cliente.findAll({
  	include: [{
  		model: venda
  	}]
  }).then(
    function(clientes) {
      res.status(200).json(clientes);
    },
    function(error) {
      res.status(500).json(error);
    }
  );
}

function find(req, res) {
	const id = req.params.id;
	cliente.findById(id, {
  		include: [{
  			model: venda
  		}]
  	}).then(
    function(cliente) {
      res.status(200).json(cliente);
    },
    function(error) {
      res.status(500).json(error);
    }
  );
}

function create(req, res) {
  cliente.create( {nome: req.body.nome} ).then(
    function(cliente) {
      res.status(200).json(cliente);
    },
    function(error) {
      res.status(500).json(error);
    }
  );
}

function update(req, res) {
	cliente.update( {nome: req.body.nome}, { where: {id: req.params.id} } ).then(
		function(cliente) {
			res.status(200).json(cliente);
		},
		function(error) {
			res.status(500).json(error);
		}
	);
}

function remove(req, res) {
	cliente.destroy({ where: {id: req.params.id} }).then(
		function(cliente) {
			res.status(200).json(cliente);
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

