const chartController = require('../controllers/chart-controller.js');
const authController = require('../controllers/auth-controller.js');

module.exports = function (app) {
	app.use('/api/charts',authController.check);
	app.get('/api/charts/clientes', chartController.rankClientes);
	app.get('/api/charts/vendedores', chartController.rankVendedores);
}